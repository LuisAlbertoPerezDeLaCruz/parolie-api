/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TranslatorProfileService } from './translator-profile.service';
import { TranslatorProfileController } from './translator-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TranslatorProfile,
  TranslatorProfileSchema,
} from './schemas/translator-profile.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TranslatorProfile.name,
        useFactory: () => {
          const schema = TranslatorProfileSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [TranslatorProfileController],
  providers: [TranslatorProfileService],
  exports: [TranslatorProfileService],
})
export class TranslatorProfileModule {}
