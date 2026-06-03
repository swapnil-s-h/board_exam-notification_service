import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { EmailLogModule } from './email-log/email-log.module';
import { EmailModule } from './email/email.module';
import { UserClientModule } from './user-client/user-client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        USER_SERVICE_URL: Joi.string().required(),
        INTERNAL_API_KEY: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        MONGODB_URL: Joi.string().required(),
      }),
    }),
    NotificationModule,
    EmailLogModule,
    UserClientModule,
    EmailModule,
    MongooseModule.forRoot(process.env.MONGODB_URL!),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
