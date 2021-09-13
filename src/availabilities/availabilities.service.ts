import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

import {
  Availability,
  AvailabilityDocument,
} from './schemas/availability.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectModel(Availability.name)
    private availabilityModel: Model<AvailabilityDocument>,
  ) {}

  create(createAvailabilityDto: CreateAvailabilityDto) {
    const newAvailability = new this.availabilityModel(createAvailabilityDto);
    return newAvailability.save();
  }

  findAll() {
    return this.availabilityModel.find();
  }

  async findLatest() {
    const result = await this.availabilityModel
      .find()
      .sort({ startTime: -1 })
      .limit(1);
    return result;
  }

  async findByQuery(query: any) {
    let result = null;
    try {
      result = await this.availabilityModel.find(query);
    } catch (error) {
      result = [];
    }
    return result;
  }

  findOne(id: string) {
    return this.availabilityModel.findOne({ _id: id });
  }

  update(id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.availabilityModel.findByIdAndUpdate(id, updateAvailabilityDto, {
      new: true,
    });
  }

  async removeByQuery(query: any) {
    const result = await this.availabilityModel.find();
    let promises = [];
    result.forEach((element) => {
      console.log({ element });
      promises.push(this.remove(element._id));
    });
    return Promise.all(promises);
  }

  remove(id: string) {
    return this.availabilityModel.findByIdAndRemove(id);
  }
}
