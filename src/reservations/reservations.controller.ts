import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { Cron } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';

@Controller('reservations')
export class ReservationsController {
  private readonly logger = new Logger(ReservationsController.name);
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @Req() req) {
    createReservationDto.creator = req.user._id;
    return this.reservationsService.create(createReservationDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  // @Cron('45 * * * * *')
  @Get('account-ratings')
  async accountRatings(@Query() query) {
    const result = await this.reservationsService.accountRatings(query);
    this.logger.debug(
      `accountRatings run and accounted ${result.total_accounted} reservations.`,
    );
    return result;
  }

  @Get('updateReservationStatus')
  async updateReservationStatus(@Query() query) {
    const result = await this.reservationsService.updateStatuses(query);
    return { updated: result };
  }

  @UseGuards(AuthGuard())
  @Get('findByQuery')
  findByQuery(@Query() query) {
    return this.reservationsService.findByQuery(query);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
