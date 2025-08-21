import { ApiProperty } from "@nestjs/swagger";
import { Reservation } from "@prisma/client";
import { Categories } from "../../enums/Categories";
import { Status } from "../../enums/Status";
import { ReturnReservationDto } from "../../reservation/dtos/ReturnReservationDto";

export class ReturnEquipmentDto {
    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000", description: "Unique identifier of the equipment" })
    id: string;

    @ApiProperty({ example: "Martelo", description: "Name of the equipment" })
    name: string;

    @ApiProperty({
        enum: Categories,
        example: Categories.TOOL,
        description: "Category of the equipment",
    })
    category: Categories;

    @ApiProperty({
        enum: Status, example: Status.AVAILABLE,
        description: "Current status of the equipment",
    })
    status: Status;

    @ApiProperty({ example: new Date(), description: "Date when the equipment was created" })
    createdAt: Date;

    @ApiProperty({ example: new Date(), description: "Date when the equipment was last updated" })
    updatedAt: Date;

    @ApiProperty({
        type: () => [ReturnReservationDto], description: "List of reservations associated with this equipment",
        required: false,
    })
    reservations: Reservation[];

    constructor(
        id: string,
        name: string,
        category: Categories,
        status: Status,
        createdAt: Date,
        updatedAt: Date,
        reservations: Reservation[] = []
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.reservations = reservations;
    }
}
