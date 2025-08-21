import { Module } from '@nestjs/common';
import { EmployeeService } from './services/Employee.service';
import { PrismaEmployeeRepository } from './repositories/prisma/PrismaEmployeeRepository';
import { PrismaService } from 'src/database/prisma.service';
import { EmployeeRepository } from './repositories/EmployeeRespository';
import { EmployeeController } from './controllers/EmployeeController';

@Module({
        imports: [],
        controllers: [EmployeeController],
        providers: [
            EmployeeService,
            PrismaEmployeeRepository,
            PrismaService,
            {
                provide: EmployeeRepository,
                useClass: PrismaEmployeeRepository,
            },
        ],
})
export class EmployeeModule {}