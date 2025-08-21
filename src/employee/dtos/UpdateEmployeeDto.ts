import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEmployeeDto{
    @IsNotEmpty({ message: 'Employee id cannot be empty' })
    id: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Employee name cannot be empty' })
    @ApiProperty({ example: 'José', description: 'Name of the Employee' })
    name: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Employee department cannot be empty' })
    @ApiProperty({ example: 'RH', description: 'Name of the Department' })
    department: string;

    
    
    constructor(id:string, name: string, department: string) {
        this.id = id;
        this.name = name;
        this.department = department;
    }
}