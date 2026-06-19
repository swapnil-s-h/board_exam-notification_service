import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('health')
@ApiTags('health')
@ApiBearerAuth()
export class HealthController {
  @Get()
  @Public()
  getHealth() {
    return {
      status: 'ok',
      service: 'notification-service',
      timestamp: new Date().toISOString(),
    };
  }
}
