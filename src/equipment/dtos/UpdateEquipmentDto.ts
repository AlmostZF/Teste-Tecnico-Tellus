import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Categories } from "../../enums/Categories";
import { Status } from "../../enums/Status";


export class UpdateEquipmentDto {
    @IsNotEmpty({ message: 'Equipment Id cannot be empty' })
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique identifier of the equipment' })
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'Equipment name cannot be empty' })
    @ApiProperty({ example: 'Martelo', description: 'Name of the equipment' })
    name: string;

    @IsEnum(Categories, { message: 'Invalid equipment category' })
    @ApiProperty({
        enum: Categories,
        example: Categories.TOOL,
        description: 'Equipment category'
    })
    category: Categories;

    @IsOptional()
    @IsEnum(Status, { message: 'Invalid equipment status' })
    @ApiProperty({
        enum: Status,
        example: Status.AVAILABLE,
        description: 'Current status of the equipment',
        default: Status.AVAILABLE,
        required: false
    })
    status: Status = Status.AVAILABLE;

    constructor(name: string, category: Categories, status?: Status) {
        this.name = name;
        this.category = category;
        this.status = status !== undefined ? status : Status.AVAILABLE;
    }
}