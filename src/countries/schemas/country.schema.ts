import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ timestamps: true })
export class Country {
  @Prop()
  flag: string;

  @Prop()
  name: string;

  @Prop()
  alpha3Code: string;

  @Prop()
  callingCodes: string[];

  @Prop()
  capital: string;

  @Prop()
  region: string;

  @Prop()
  timezones: string[];
}

export const CountrySchema = SchemaFactory.createForClass(Country);
