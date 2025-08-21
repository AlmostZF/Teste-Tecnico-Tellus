
import { ReservationRepository } from "../ReservationRespoitory";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/prisma.service";
import { CreateReservationDto } from "src/reservation/dtos/CreateReservationDto";
import { ReservationWithEmployeeAndEquipment } from "src/reservation/mapper/ReservationMapper";
import { Status, statusToEquipmentMap } from "../../../enums/Status";


@Injectable()
export class PrismaReservationRepository implements ReservationRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async filterReservation(date?: Date, employeeId?: string, equipmentId?: string): Promise<ReservationWithEmployeeAndEquipment | null> {
        const whereClause: any = {};

        if (date instanceof Date && !isNaN(date.getTime())) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            whereClause.startDate = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }

        if (employeeId) {
            whereClause.employeeId = employeeId;
        }

        if (equipmentId) {
            whereClause.equipmentId = equipmentId;
        }

        const reservationFound = await this.prismaService.reservation.findFirst({
            where: {
                ...whereClause,
                endDate: null,
            },
            include: {
                employee: {
                    select: { name: true }
                },
                equipment: true
            }
        });

        return reservationFound ?? null;
    }


    async createReservation(reservation: CreateReservationDto): Promise<ReservationWithEmployeeAndEquipment> {
        return await this.prismaService.$transaction(async (tx) => {
            
            await tx.equipment.update({
                where: { id: reservation.equipmentId },
                data: { status: statusToEquipmentMap[Status.BORROWED] },
            });

            const reservationCreated = await tx.reservation.create({
                data: reservation,
                include: {
                    employee: { select: { name: true } },
                    equipment: true,
                },
            });

            return reservationCreated;
        });
    }

    async finishReservation(id: string): Promise<void> {
        await this.prismaService.$transaction(async (tx) => {
            const reservation = await tx.reservation.findUnique({ where: { id } });
            if (!reservation) {
                throw new Error(`Reservation with id ${id} not found`);
            }
            await tx.reservation.update({
                where: { id },
                data: { endDate: new Date() },
            });

            await tx.equipment.update({
                where: { id: reservation.equipmentId },
                data: {  status: statusToEquipmentMap[Status.AVAILABLE]}, 
            });
        });
    }

    async filterReservationByEmployeeId(employeeId: string): Promise<ReservationWithEmployeeAndEquipment | null> {
        const reservations = await this.prismaService.reservation.findFirst({
            where: { employeeId, endDate: null },
            include: {
                employee: {
                    select: {
                        name: true
                    }
                }, equipment: true
            }
        });
        return reservations ?? null;

    }

    async filterReservationByEquipmentId(equipmentId: string): Promise<ReservationWithEmployeeAndEquipment | null> {
        const reservations = await this.prismaService.reservation.findFirst({
            where: { equipmentId },
            include: {
                employee: {
                    select: {
                        name: true
                    }
                }, equipment: true
            }
        });

        return reservations??null ;
    }

    async getAllReservations(): Promise<ReservationWithEmployeeAndEquipment[]> {
        const reservations = await this.prismaService.reservation.findMany({
            where: {},
            include: {
                employee: {
                    select: {
                        name: true
                    }
                }, equipment: true
            }
        });
        return reservations ?? [];
    }
}