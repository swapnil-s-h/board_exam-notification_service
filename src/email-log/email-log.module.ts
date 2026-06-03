import { Module } from '@nestjs/common';
import { EmailLogService } from './email-log.service';

@Module({
  providers: [EmailLogService]
})
export class EmailLogModule {}
