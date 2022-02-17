import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, _id: false })
export class Rating {
  @Prop()
  rate: number;

  @Prop()
  comments: string;

  @Prop()
  accounted: boolean;

  @Prop()
  createdAt: Date;
}
