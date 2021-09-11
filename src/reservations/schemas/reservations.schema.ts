import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Location } from '../../locations/schemas/location.schema';

export type ReservationDocument = Reservation & Document;

mongoose.set('useFindAndModify', false);

@Schema({ timestamps: true })
export class Reservation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  creator: User | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  translator: User | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    autopopulate: true,
  })
  location: Location | string;

  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop()
  status: String;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
