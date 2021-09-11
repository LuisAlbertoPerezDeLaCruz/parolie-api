import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TranslatorProfileModule } from './translator-profile/translator-profile.module';
import { LocationsModule } from './locations/locations.module';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TranslatorsModule } from './translators/translators.module';
import { ChangesModule } from './changes/changes.module';
import { SmsModule } from './sms/sms.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TranslatorProfileModule,
    LocationsModule,
    AvailabilitiesModule,
    ReservationsModule,
    TranslatorsModule,
    ChangesModule,
    SmsModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
