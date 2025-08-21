import { IsNotEmpty } from "class-validator";

export class DeleteEmployeeDto{
    @IsNotEmpty({ message: 'Employee Id cannot be empty' })
    id: string;
    
    constructor(id:string) {
        this.id = id;
    }
}