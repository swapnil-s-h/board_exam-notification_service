import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

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
  await app.listen(process.env.PORT!);
}
bootstrap();
