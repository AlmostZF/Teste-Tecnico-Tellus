import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteEquipmentDto {
    @IsNotEmpty({ message: 'Equipment Id cannot be empty' })
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique identifier of the equipment' })
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}
