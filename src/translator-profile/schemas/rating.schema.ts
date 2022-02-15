import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: false, _id: false })
export class Rating {
  @Prop()
  rate: number;

  @Prop()
  comments: string;

  @Prop()
  createdAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  fromReservation: string;
}
