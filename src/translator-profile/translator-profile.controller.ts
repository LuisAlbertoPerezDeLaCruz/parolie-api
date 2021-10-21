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
import { TranslatorProfileService } from './translator-profile.service';
import { CreateTranslatorProfileDto } from './dto/create-translator-profile.dto';
import { UpdateTranslatorProfileDto } from './dto/update-translator-profile.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('translator-profile')
export class TranslatorProfileController {
  constructor(
    private readonly translatorProfileService: TranslatorProfileService,
  ) {}

  @Post()
  create(
    @Body() createTranslatorProfileDto: CreateTranslatorProfileDto,
    @Req() req,
  ) {
    /**
     * The request returns an user because in the validate function of
     * the jwt.strategy.ts returns the validated user which is triggered
     * by the guard applied to this create function.
     */
    createTranslatorProfileDto.creator = req.user._id;
    return this.translatorProfileService.create(createTranslatorProfileDto);
  }

  @Get()
  findAll() {
    return this.translatorProfileService.findAll();
  }

  @Get('findByFilter')
  findByQuery(@Query() query) {
    return this.translatorProfileService.findByQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translatorProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslatorProfileDto: UpdateTranslatorProfileDto,
  ) {
    return this.translatorProfileService.update(id, updateTranslatorProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translatorProfileService.remove(id);
  }
}
