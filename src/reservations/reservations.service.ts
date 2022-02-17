import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { differenceInHours } from 'date-fns';
import { ChangeGateway } from '../changes/changes.gateway';

import {
  Reservation,
  ReservationDocument,
} from './schemas/reservations.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TranslatorProfileService } from '../translator-profile/translator-profile.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private changeGateway: ChangeGateway,
    private translatorProfileService: TranslatorProfileService,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    createReservationDto['rated'] = false;
    const newReservation = new this.reservationModel(createReservationDto);
    this.changeGateway.sendChangeNotification({
      collection: 'reservation',
      action: 'create',
      id: newReservation._id,
    });
    return newReservation.save();
  }

  findAll() {
    return this.reservationModel.find();
  }

  async findByQuery(query: any) {
    if ('status' in query) {
      if (query.status.indexOf('{') >= 0) {
        query.status = JSON.parse(query.status);
      }
    }
    let result = null;
    try {
      result = await this.reservationModel.find(query);
    } catch (error) {
      result = [];
    }
    return result;
  }

  findOne(id: string) {
    return this.reservationModel.findById(id);
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    this.changeGateway.sendChangeNotification({
      collection: 'reservation',
      action: 'update',
      id: id,
    });
    return this.reservationModel.findByIdAndUpdate(id, updateReservationDto, {
      new: true,
    });
  }

  async accountRatings(query: any) {
    const result = await this.reservationModel.find({
      rated: true,
      'rating.accounted': false,
    });
    var total_accounted = 0;
    result.forEach(async (element: any) => {
      total_accounted++;
      const profile_rating = {
        rate: element.rating.rate,
        comments: element.rating?.comments,
        createdAt: element.rating.createdAt,
        createdBy: element.creator,
        fromReservation: element._id,
      };
      const profiles: any = await this.translatorProfileService.findByQuery({
        creator: element.translator._id,
      });
      const profile = profiles[0];
      let ratings = profile?.ratings;
      if (!ratings) {
        ratings = [];
      }
      ratings.push(profile_rating);
      let average_rate = 0;
      ratings.forEach((element) => {
        average_rate = average_rate + element.rate;
      });
      average_rate = average_rate / ratings.length;
      await this.translatorProfileService.update(profile._id, {
        ratings: ratings,
        average_rate: average_rate,
      });
      let rating = element.rating;
      rating.accounted = true;
      await this.update(element._id, { rating: rating });
    });

    /**
     * Hay que incluir en loa ratings del translator-profile
     * los ratings que se encuentran en cada reservacion
     * y actualizar la reservacion con el valur en true
     * para rating.accounted
     */

    return { total_accounted: total_accounted };
  }

  async updateStatuses(query: any) {
    const reservations = await this.reservationModel.find({
      status: 'BLOCKED',
    });
    const today = new Date();
    const limit = Number(query.limit);
    let records_updated = 0;
    let promises = [];
    reservations.forEach((reservation: any) => {
      const hours_past = differenceInHours(today, reservation.createdAt);
      if (hours_past >= limit) {
        promises.push(
          this.reservationModel.findByIdAndUpdate(reservation._id, {
            status: 'EXPIRED',
          }),
        );
      }
    });
    await Promise.all(promises).then((res) => {
      records_updated = promises.length;
    });
    return records_updated;
  }

  remove(id: string) {
    this.changeGateway.sendChangeNotification({
      collection: 'reservation',
      action: 'delete',
      id: id,
    });
    return this.reservationModel.findByIdAndDelete(id);
  }
}
