export class CreateAvailabilityDto {
  creator?: string;
  allDay: boolean;
  endTime: Date;
  endTimeStr: string;
  location?: string;
  startTime: Date;
  startTimeStr: string;
  title: string;
}
