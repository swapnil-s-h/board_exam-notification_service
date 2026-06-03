import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from 'src/email/email.service';
import { UserClientService } from 'src/user-client/user-client.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly userClientService: UserClientService,
    private readonly emailService: EmailService,
  ) {}

  @EventPattern('result.viewed')
  async handleResultViewed(@Payload() payload: any) {
    const user = await this.userClientService.getUserById(payload.studentId);
    await this.emailService.sendResultViewedEmail(user.email, user.name);
  }
}
