import { Module } from '@nestjs/common';
import { ChangeGateway } from './changes.gateway';
@Module({
  providers: [ChangeGateway],
})
export class ChangesModule {}
