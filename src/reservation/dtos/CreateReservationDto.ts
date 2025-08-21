import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsBeforeNow } from "src/utils/IsBeforeNow.validador";

export class CreateReservationDto {
    
    @IsString()
    @IsNotEmpty({ message: 'Equipment id cannot be empty' })
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique identifier of the equipment' })
    equipmentId: string;

    @IsString()
    @IsNotEmpty({ message: 'Employee id cannot be empty' })
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique identifier of the employee' })
    employeeId: string;

    // @IsBeforeNow()
    @IsOptional()
    @ApiProperty({ example: new Date().toISOString(), description: 'Reservation start date' })
    startDate: Date;

    constructor(equipmentId: string, employeeId: string, startDate: Date) {
        this.equipmentId = equipmentId;
        this.employeeId = employeeId;
        this.startDate = startDate;
    }
}

