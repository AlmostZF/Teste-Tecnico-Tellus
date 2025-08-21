import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth(): Promise<string> {
    await this.prisma.$queryRaw`SELECT 1`;
    return 'OK';
  }
}
