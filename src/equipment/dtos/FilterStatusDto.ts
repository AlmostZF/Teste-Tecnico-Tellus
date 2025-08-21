import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Status } from "../../enums/Status";

export class FilterStatusDto {

    @IsEnum(Status, { message: 'Invalid equipment status' })
    @ApiProperty({
        enum: Status,
        example: Status.AVAILABLE,
        description: 'Current status of the equipment',
        default: Status.AVAILABLE,
        required: false
    })
    status: Status = Status.AVAILABLE;

    constructor(status: Status) {
        this.status = status;
    }
}