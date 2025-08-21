import { Prisma, Reservation } from "@prisma/client";
import { CreateReservationDto } from "../dtos/CreateReservationDto";
import { FormattedReservationsDto, ReturnReservationDto } from "../dtos/ReturnReservationDto";
import { UpdateReservationDto } from "../dtos/UpdateReservationDto";
import { EquipmentMapper } from "../../equipment/mapper/EquipmentMapper";

export type ReservationWithEmployeeAndEquipment = Prisma.ReservationGetPayload<{
    include: {
        employee: { select: { name: true } }
        equipment: true;
    },

}>;

export class ReservationMapper {

    static toCreateEntity(dto: CreateReservationDto): Omit<Reservation, 'id' | 'endDate' | 'createdAt'> {
        return {
            equipmentId: dto.equipmentId,
            employeeId: dto.employeeId,
            startDate: dto.startDate,
            updatedAt: new Date()
        };
    }


    static toUpdateEntity(dto: UpdateReservationDto): Partial<Reservation> {
        return {
            id: dto.id,
            equipmentId: dto.equipmentId,
            employeeId: dto.employeeId,
            endDate: dto.endDate,
        };
    }


    static toReturnDto(entity: ReservationWithEmployeeAndEquipment): ReturnReservationDto {
        return new ReturnReservationDto(
            entity.id,
            entity.equipmentId,
            entity.employeeId,
            entity.startDate,
            entity.endDate!,
            entity.employee.name,
            EquipmentMapper.toReturnDto(entity.equipment),
        );
    }

    static toReturnDtoList(equipments: ReservationWithEmployeeAndEquipment[]): ReturnReservationDto[] {
        return equipments.map(this.toReturnDto);
    }

    static toReturnFormattedDto(
        closedReservation?: ReservationWithEmployeeAndEquipment | null,
        activeReservation?: ReservationWithEmployeeAndEquipment | null,
    ): FormattedReservationsDto {
        return new FormattedReservationsDto(
            activeReservation ? [ReservationMapper.toReturnDto(activeReservation)] : [],
            closedReservation ? [ReservationMapper.toReturnDto(closedReservation)] : [],
        );
    }

    static toReturnFormattedDtoList(
        closedReservations?: ReservationWithEmployeeAndEquipment[],
        activeReservations?: ReservationWithEmployeeAndEquipment[],
    ): FormattedReservationsDto {
        const closedDtos = (closedReservations ?? []).map(reservation => ReservationMapper.toReturnDto(reservation));
        const activeDtos = (activeReservations ?? []).map(reservation => ReservationMapper.toReturnDto(reservation));

        return new FormattedReservationsDto(activeDtos, closedDtos);
    }

}