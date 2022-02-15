import { IsEnum, NotEquals } from 'class-validator';
import { ReservationStatus } from '../../enums/reservation-status.enum';
import { Rating } from '../schemas/rating.schema';

export class CreateReservationDto {
  creator?: string;
  translator?: string;
  start: Date;
  end: Date;
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
  requirements: string;
  rated?: boolean;
  rating?: Rating;
}
