import { Reservation } from "@prisma/client";
import { CreateReservationDto } from "../dtos/CreateReservationDto";
import { ReservationWithEmployeeAndEquipment } from "../mapper/ReservationMapper";

export abstract class ReservationRepository {
    abstract createReservation(reservation: CreateReservationDto): Promise<ReservationWithEmployeeAndEquipment>;
    abstract finishReservation(id: string): Promise<void>;
    abstract filterReservationByEmployeeId(employeeId: string): Promise<ReservationWithEmployeeAndEquipment | null>;
    abstract filterReservationByEquipmentId(equipmentId: string): Promise<ReservationWithEmployeeAndEquipment | null>;
    abstract filterReservation(date?:Date, employeeId?: string, equipmentId?: string): Promise<ReservationWithEmployeeAndEquipment | null>;
    abstract getAllReservations(): Promise<ReservationWithEmployeeAndEquipment[]| null>;
}