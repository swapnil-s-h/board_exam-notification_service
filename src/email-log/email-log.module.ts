import { Module } from '@nestjs/common';
import { EmailLogService } from './email-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLog, EmailLogSchema } from './schemas/email-log.schema';
import { EmailLogController } from './email-log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmailLog.name,
        schema: EmailLogSchema,
      },
    ]),
  ],
  providers: [EmailLogService],
  exports: [EmailLogService],
  controllers: [EmailLogController],
})
export class EmailLogModule {}
