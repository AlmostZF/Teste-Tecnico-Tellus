import { Reservation } from "@prisma/client";
import { Categories } from "src/enums/Categories";
import { Status } from "src/enums/Status";

export class ReturnEquipmentDto {
    id: string;
    name: string;
    category: Categories;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    reservations: Reservation[];

    constructor(id: string, name: string, category: Categories, status: Status, createdAt: Date, updatedAt: Date, reservations: Reservation[] = []) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.reservations = [];
    }
}