import { Injectable } from '@nestjs/common';
import { CreateTranslatorProfileDto } from './dto/create-translator-profile.dto';
import { UpdateTranslatorProfileDto } from './dto/update-translator-profile.dto';
import {
  TranslatorProfile,
  TranslatorProfileDocument,
} from './schemas/translator-profile.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TranslatorProfileService {
  constructor(
    @InjectModel(TranslatorProfile.name)
    private translatorProfileModel: Model<TranslatorProfileDocument>,
  ) {}
  create(createTranslatorProfileDto: CreateTranslatorProfileDto) {
    const newTranslatorProfile = new this.translatorProfileModel(
      createTranslatorProfileDto,
    );
    return newTranslatorProfile.save();
  }

  findAll() {
    return this.translatorProfileModel.find();
  }

  async findByQuery(query: any) {
    const result = await this.translatorProfileModel.find(query);
    return result;
  }

  findOne(id: string) {
    return this.translatorProfileModel.findById(id);
  }

  update(id: string, updateTranslatorProfileDto: UpdateTranslatorProfileDto) {
    return this.translatorProfileModel.findByIdAndUpdate(
      id,
      updateTranslatorProfileDto,
      { new: true },
    );
  }

  remove(id: string) {
    return this.translatorProfileModel.findByIdAndDelete(id);
  }
}
