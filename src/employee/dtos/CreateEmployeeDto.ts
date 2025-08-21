import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto{
    @IsString()
    @IsNotEmpty({ message: 'Employee name cannot be empty' })
    @ApiProperty({ example: 'José', description: 'Name of the Employee' })
    name: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Employee department cannot be empty' })
    @ApiProperty({ example: 'RH', description: 'Name of the Department' })
    department: string;
    
    constructor(name: string, department: string) {
        this.name = name;
        this.department = department;
    }
}