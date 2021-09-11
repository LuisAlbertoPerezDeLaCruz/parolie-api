import { Controller, Get, Query } from '@nestjs/common';
import { TranslatorsService } from './translators.service';

@Controller('translators')
export class TranslatorsController {
  constructor(private readonly translatorsService: TranslatorsService) {}

  @Get()
  findAll() {
    return this.translatorsService.findAll();
  }

  @Get('findBySearch')
  findBySearch(@Query() criteria) {
    return this.translatorsService.findBySearch(criteria);
  }
}
