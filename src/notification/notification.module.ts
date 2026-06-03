import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserClientModule } from 'src/user-client/user-client.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [UserClientModule, EmailModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
