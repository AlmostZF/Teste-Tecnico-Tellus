import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipmentModule } from './equipment/equipment.module';
import { EmployeeModule } from './employee/employee.module';
import { ReservationModule } from './reservation/reservation.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [EquipmentModule, EmployeeModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
