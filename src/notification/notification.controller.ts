import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailLogService } from 'src/email-log/email-log.service';
import { EmailService } from 'src/email/email.service';
import { UserClientService } from 'src/user-client/user-client.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly userClientService: UserClientService,
    private readonly emailService: EmailService,
    private readonly emailLogService: EmailLogService,
  ) {}

  @EventPattern('result.viewed')
  async handleResultViewed(@Payload() payload: any) {
    const user = await this.userClientService.getUserById(payload.studentId);

    try {
      await this.emailService.sendResultViewedEmail(user.email, user.name);
      await this.emailLogService.create({
        studentId: payload.studentId,
        resultId: payload.resultId,
        email: user.email,
        status: 'SUCCESS',
      });
    } catch (error) {
      await this.emailLogService.create({
        studentId: payload.studentId,
        resultId: payload.resultId,
        email: user.email,
        status: 'FAILED',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
