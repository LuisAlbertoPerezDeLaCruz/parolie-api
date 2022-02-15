import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Rating } from './rating.schema';

export type TranslatorProfileDocument = TranslatorProfile & Document;

@Schema({ timestamps: true })
export class TranslatorProfile {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  creator: User | string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  middle_name: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  gender: string;

  @Prop()
  nationality: string;

  @Prop(
    raw({
      type: Map,
      of: String,
    }),
  )
  nationality_obj: string;

  @Prop()
  country_of_residence: string;

  @Prop(
    raw({
      type: Map,
      of: String,
    }),
  )
  country_of_residence_obj: string;

  @Prop()
  city: string;

  @Prop()
  zip_code: string;

  @Prop()
  address: string;

  @Prop()
  picture: string;

  @Prop()
  phone_number: string;

  @Prop()
  occupation: string;

  @Prop()
  languages: string[];

  @Prop()
  types_of_services: string[];

  @Prop()
  description: string;

  @Prop()
  photo: string;

  @Prop()
  ratings: Rating[];
}

export const TranslatorProfileSchema = SchemaFactory.createForClass(
  TranslatorProfile,
);
