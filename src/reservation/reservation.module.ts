import { Module } from '@nestjs/common';
import { PrismaReservationRepository } from './repositories/prisma/PrismaReservationRepository';
import { PrismaService } from 'src/database/prisma.service';
import { ReservationRepository } from './repositories/ReservationRespoitory';
import { ReservationService } from './services/Reservation.service';
import { ReservationController } from './controllers/Reservation.controller';

@Module({
    imports: [],
    controllers: [ReservationController],
    providers: [
        PrismaReservationRepository,
        PrismaService,
        ReservationService,
        {
            provide: ReservationRepository,
            useClass: PrismaReservationRepository,
        },
    ],
})
export class ReservationModule { }
