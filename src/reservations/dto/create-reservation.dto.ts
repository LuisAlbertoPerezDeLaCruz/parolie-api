import { IsEnum, NotEquals } from 'class-validator';
import { ReservationStatus } from '../../enums/reservation-status.enum';

export class CreateReservationDto {
  creator?: string;
  translator?: string;
  start: Date;
  end: Date;
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
