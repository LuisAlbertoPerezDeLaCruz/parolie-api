import { Controller, Get, Query, Param, Req, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*   @Get()
  getHello(@Query('name') name) {
    return this.appService.getHello(name);
  } */

  /*  @Get(':name')
  getHello(@Param('name') name) {
    return [123, 456, 'Luis', true, { name: name, id: 123 }];
  } */

  @Get()
  getHello(@Req() request: Request) {
    const name = request.query['name'].toString();
    console.log({ name });
    const msg = this.appService.getHello(name);
    return { status: HttpStatus.OK, mgs: msg };
  }
}
