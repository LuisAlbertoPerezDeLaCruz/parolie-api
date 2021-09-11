import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { SmsDto } from './dto/sms.dto';

@Injectable()
export class SmsService {
  constructor() {}
  async sendSMS(smsDto: SmsDto) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);
    return client.messages.create({
      body: smsDto.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: smsDto.number,
    });
  }
}
