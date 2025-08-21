import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) { }

  async getHealth(): Promise<string> {
    try {
      await this.prisma.$connect();
      return 'OK';
    } catch (error) {
      throw new Error('Database connection failed');
    }
  }
}