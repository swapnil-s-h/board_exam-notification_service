import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { EmailLogModule } from './email-log/email-log.module';
import { EmailModule } from './email/email.module';
import { UserClientModule } from './user-client/user-client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

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
        PORT: Joi.number().default(3003),
        JWT_SECRET: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        RESULT_QUEUE: Joi.string().required(),
      }),
    }),
    NotificationModule,
    EmailLogModule,
    UserClientModule,
    EmailModule,
    MongooseModule.forRoot(process.env.MONGODB_URL!),
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    JwtStrategy,
  ],
})
export class AppModule {}
