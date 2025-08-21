import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Categories } from "src/enums/Categories";
import { Status } from "src/enums/Status";

export class CreateEquipmentDto{
    @IsString()
    @IsNotEmpty({ message: 'Equipment name cannot be empty' })
    name: string;

    @IsString()
    @IsEnum(Categories, { message: 'Invalid equipment category' })
    category: Categories;

    @IsOptional()
    @IsEnum(Status, { message: 'Invalid equipment status' })
    status: Status = Status.AVAILABLE;
    
    constructor(name: string, category: Categories, status?: Status) {
        this.name = name;
        this.category = category;
        this.status = status !== undefined ? status : Status.AVAILABLE;
    }
}

