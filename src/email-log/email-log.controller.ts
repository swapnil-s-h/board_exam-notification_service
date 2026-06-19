import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmailLogService } from './email-log.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EmailLogDto } from './dto/email-log.dto';

@Controller('email-log')
@ApiTags('email-log')
@ApiBearerAuth()
export class EmailLogController {
  constructor(private readonly emailLogService: EmailLogService) {}
  @Get(':id')
  @Roles(Role.moderator)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The id of the student whose email logs are to be fetched',
    example: 1,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - only MODERATOR can view email logs',
  })
  @ApiOkResponse({
    description: 'Email logs fetched successfully',
    type: EmailLogDto,
  })
  getLogs(@Param('id', ParseIntPipe) id: number) {
    return this.emailLogService.findByStudentId(id);
  }
}
