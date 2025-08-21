import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEmployeeDto{
    @IsNotEmpty({ message: 'Employee id cannot be empty' })
    id: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Employee name cannot be empty' })
    name: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Employee department cannot be empty' })
    department: string;

    
    
    constructor(id:string, name: string, department: string) {
        this.id = id;
        this.name = name;
        this.department = department;
    }
}