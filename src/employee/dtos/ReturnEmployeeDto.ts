import { Reservation } from "@prisma/client";

export class ReturnEmployeeDto{
    id: string;
    name: string;
    department: string;
    reservations: Reservation[];
    createdAt: Date;
    updatedAt: Date;
    
    constructor(id:string, name: string, department: string, createdAt: Date, updatedAt: Date, reservations: Reservation[] = []) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.reservations = reservations;
    }
}