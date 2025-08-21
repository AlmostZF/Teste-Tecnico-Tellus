import { Module } from '@nestjs/common';

import { EquipmentService } from './services/Equipment.service';

import { PrismaService } from 'src/database/prisma.service';
import { EquipmentController } from './controllers/Equipment.controller';
import { PrismaEquipmentRepository } from './repositories/prisma/PrismaEquipmentRepository';
import { EquipmentRepository } from './repositories/EquipmentRepository';

@Module({
    imports: [],
    controllers: [EquipmentController],
    providers: [
        EquipmentService,
        PrismaEquipmentRepository,
        PrismaService,
        {
            provide: EquipmentRepository,
            useClass: PrismaEquipmentRepository,
        },
    ],
})
export class EquipmentModule { }
