import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'result_notifications',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();
  await app.listen(process.env.PORT!);
}
bootstrap();
