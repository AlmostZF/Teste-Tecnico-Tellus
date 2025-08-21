import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('v1/health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealth(): Promise<string> {
    try {
      return await this.appService.getHealth();
    } catch (error) {
      throw new HttpException('Database connection failed', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
