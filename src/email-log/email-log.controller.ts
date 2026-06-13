import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmailLogService } from './email-log.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('email-log')
export class EmailLogController {
  constructor(private readonly emailLogService: EmailLogService) {}
  @Get(':id')
  @Roles(Role.moderator)
  getLogs(@Param('id', ParseIntPipe) id: number) {
    return this.emailLogService.findByStudentId(id);
  }
}
