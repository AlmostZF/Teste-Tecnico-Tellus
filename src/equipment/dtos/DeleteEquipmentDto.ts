import { IsNotEmpty } from "class-validator";

export class DeleteEquipmentDto {
    @IsNotEmpty({ message: 'Equipment Id cannot be empty' })
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}
