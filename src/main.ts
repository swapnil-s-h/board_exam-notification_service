import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RESULT_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();
  const config = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription(
      'Notification Service is a background worker. Only required public facing API endpoints are exposed',
    )
    .setVersion('1.0')
    .addTag(
      'health',
      'A health check API that checks if notification service is up',
    )
    .addTag(
      'email-log',
      'A MODERATOR-only API that returns email logs. Email logs show attempts made by a student to fetch his/her result',
    )
    .addBearerAuth()
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(process.env.PORT!);
}
bootstrap();
