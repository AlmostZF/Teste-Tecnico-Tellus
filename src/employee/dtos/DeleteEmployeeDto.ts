import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteEmployeeDto{
    @IsNotEmpty({ message: 'Employee Id cannot be empty' })
    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000", description: "Unique identifier of the employee" })
    id: string;
    
    constructor(id:string) {
        this.id = id;
    }
}