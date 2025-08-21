import { ApiProperty } from "@nestjs/swagger";

import { ReturnEquipmentDto } from "../../equipment/dtos/ReturnEquipmentDto";

export class ReturnReservationDto {
    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000", description: "Reservation UUID" })
    id: string;

    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440001", description: "Equipment UUID" })
    equipmentId: string;

    @ApiProperty({ type: () => ReturnEquipmentDto, description: "Equipment details" })
    equipment: ReturnEquipmentDto;

    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440002", description: "Employee UUID" })
    employeeId: string;

    @ApiProperty({ example: "José", description: "Employee name" })
    employeeName: string;

    @ApiProperty({ example: new Date(), description: "Reservation start date" })
    startDate: Date;

    @ApiProperty({ example: new Date(), description: "Reservation end date" })
    endDate: Date;


    constructor(id: string, equipmentId: string, employeeId: string, startDate: Date, endDate: Date, employeeName: string, equipment: ReturnEquipmentDto) {
        this.id = id;
        this.equipmentId = equipmentId;
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeName = employeeName;
        this.equipment = equipment;
    }
}

export class FormattedReservationsDto {
    activeReservations: ReturnReservationDto[];
    closedReservations: ReturnReservationDto[];

    constructor(
        activeReservations: ReturnReservationDto[] = [],
        closedReservations: ReturnReservationDto[] = []
    ) {
        this.activeReservations = activeReservations;
        this.closedReservations = closedReservations;
    }
}