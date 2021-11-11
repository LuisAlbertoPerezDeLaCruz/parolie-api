import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: false, _id: false })
export class MetaData {
  @Prop()
  title: string;

  @Prop()
  subtype: string;

  @Prop()
  action: string;

  @Prop()
  requirements: string;

  @Prop()
  _id: string;
}
