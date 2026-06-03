import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  @EventPattern('result.viewed')
  handleResultViewed(@Payload() payload: any) {
    console.log('Received:', payload);
  }
}
