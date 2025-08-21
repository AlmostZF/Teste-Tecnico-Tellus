import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto{
    @IsString()
    @IsNotEmpty({ message: 'Employee name cannot be empty' })
    name: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Employee department cannot be empty' })
    department: string;
    
    constructor(name: string, department: string) {
        this.name = name;
        this.department = department;
    }
}