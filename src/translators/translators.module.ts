import { Module } from '@nestjs/common';
import { TranslatorsService } from './translators.service';
import { TranslatorsController } from './translators.controller';
import { LocationsModule } from '../locations/locations.module';
import { TranslatorProfileModule } from '../translator-profile/translator-profile.module';
import { AvailabilitiesModule } from '../availabilities/availabilities.module';

@Module({
  imports: [LocationsModule, TranslatorProfileModule, AvailabilitiesModule],
  controllers: [TranslatorsController],
  providers: [TranslatorsService],
})
export class TranslatorsModule {}
