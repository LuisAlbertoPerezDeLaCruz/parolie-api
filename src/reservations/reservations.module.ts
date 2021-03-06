import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservations.schema';
import { PassportModule } from '@nestjs/passport';
import { ChangeGateway } from '../changes/changes.gateway';
import { TranslatorProfileModule } from '../translator-profile/translator-profile.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Reservation.name,
        useFactory: () => {
          const schema = ReservationSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    TranslatorProfileModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ChangeGateway],
})
export class ReservationsModule {}
