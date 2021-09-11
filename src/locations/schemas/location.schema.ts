import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  creator: User | string;

  @Prop({
    type: String,
  })
  address: string;

  @Prop()
  locality: string;

  @Prop({ type: String })
  keywords: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  name: string;

  @Prop()
  primary: boolean;

  @Prop({
    type: String,
  })
  color: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location).index({
  '$**': 'text',
});
