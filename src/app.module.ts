import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { EmailLogModule } from './email-log/email-log.module';
import { UserClientModule } from './user-client/user-client.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NotificationModule,
    EmailLogModule,
    UserClientModule,
    MongooseModule.forRoot('mongodb://localhost:27017/notification_service'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
