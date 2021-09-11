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
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('availabilities')
export class AvailabilitiesController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @Post()
  create(@Body() createAvailabilityDto: CreateAvailabilityDto, @Req() req) {
    createAvailabilityDto.creator = req.user._id;
    return this.availabilitiesService.create(createAvailabilityDto);
  }

  @Get()
  findAll() {
    return this.availabilitiesService.findAll();
  }

  @Get('findLatest')
  findLatest() {
    return this.availabilitiesService.findLatest();
  }

  @Get('findByQuery')
  findByQuery(@Query() query) {
    return this.availabilitiesService.findByQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availabilitiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ) {
    return this.availabilitiesService.update(id, updateAvailabilityDto);
  }

  @Delete('removeByFilter')
  removeByQuery(@Query() query) {
    return this.availabilitiesService.removeByQuery(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilitiesService.remove(id);
  }
}
