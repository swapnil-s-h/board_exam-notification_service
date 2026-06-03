import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserClientModule } from 'src/user-client/user-client.module';
import { EmailModule } from 'src/email/email.module';
import { EmailLogModule } from 'src/email-log/email-log.module';

@Module({
  imports: [UserClientModule, EmailModule, EmailLogModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
