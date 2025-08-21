import { IsEnum } from "class-validator";
import { Status } from "src/enums/Status";

export class FilterStatusDto {

    @IsEnum(Status, { message: 'Invalid equipment status' })
    status: Status = Status.AVAILABLE;
    
    constructor(status: Status) {
        this.status = status;
    }
}