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

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private changeGateway: ChangeGateway,
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
    return result;
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
