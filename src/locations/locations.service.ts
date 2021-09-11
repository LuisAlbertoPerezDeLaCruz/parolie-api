import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

import { Location, LocationDocument } from './schemas/location.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    const newLocation = new this.locationModel(createLocationDto);
    return newLocation.save();
  }

  findAll() {
    return this.locationModel.find();
  }

  async findByQuery(query: any) {
    const result = await this.locationModel.find(query);
    return result;
  }

  async findBySearch(value: any) {
    const searchString = `${value.searchString}`;
    const searchJson = { $text: { $search: searchString } };
    const result = await this.locationModel.find(searchJson).catch((err) => {
      console.log({ err });
    });
    return result;
  }

  findOne(id: string) {
    return this.locationModel.findById(id);
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationModel.findByIdAndUpdate(id, updateLocationDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.locationModel.findByIdAndDelete(id);
  }
}
