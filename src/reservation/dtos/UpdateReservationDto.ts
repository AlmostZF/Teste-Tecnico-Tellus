import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateReservationDto {

    @IsString()
    @IsNotEmpty({ message: 'Id cannot be empty' })
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique identifier of the reservation' })
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'Equipment id cannot be empty' })
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique identifier of the equipment' })
    equipmentId: string;

    @IsString()
    @IsNotEmpty({ message: 'Employee id cannot be empty' })
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique identifier of the employee' })
    employeeId: string;
    
    @ApiProperty({ example: new Date().toISOString(), description: 'Reservation end date' })
    endDate: Date;

    constructor(equipmentId: string, employeeId: string,  endDate: Date = new Date(),) {
        this.equipmentId = equipmentId;
        this.employeeId = employeeId;
        this.endDate = endDate;
    }
}