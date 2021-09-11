import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/schemas/user.schema';
import { Location } from '../../locations/schemas/location.schema';

export type AvailabilityDocument = Availability & Document;

@Schema({ timestamps: true })
export class Availability {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  creator: User | string;

  @Prop()
  allDay: boolean;

  @Prop()
  endTime: Date;

  @Prop()
  endTimeStr: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    autopopulate: true,
  })
  location: Location | string;

  @Prop()
  startTime: Date;

  @Prop()
  startTimeStr: string;

  @Prop()
  title: string;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
