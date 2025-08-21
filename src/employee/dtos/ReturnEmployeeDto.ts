import { ApiProperty } from "@nestjs/swagger";
import { Reservation } from "@prisma/client";
import { ReturnReservationDto } from "src/reservation/dtos/ReturnReservationDto";

export class ReturnEmployeeDto{
    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000", description: "Unique identifier of the employee" })
    id: string;

    @ApiProperty({ example: 'José', description: 'Name of the employee' })
    name: string;
    
    @ApiProperty({ example: 'RH', description: 'Name of the department' })
    department: string;
    
    @ApiProperty({
        type: () => [ReturnReservationDto], description: "List of reservations associated with this equipment",
        required: false,
    })
    reservations: Reservation[];

    @ApiProperty({ example: new Date(), description: "Date when the employee was created" })
    createdAt: Date;

    @ApiProperty({ example: new Date(), description: "Date when the employee was last updated" })
    updatedAt: Date;
    
    constructor(id:string, name: string, department: string, createdAt: Date, updatedAt: Date, reservations: Reservation[] = []) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.reservations = reservations;
    }
}