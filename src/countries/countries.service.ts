import { Injectable } from '@nestjs/common';

import { Country, CountryDocument } from './schemas/country.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private countryModel: Model<CountryDocument>,
  ) {}

  findAll() {
    return this.countryModel.find();
  }
}
