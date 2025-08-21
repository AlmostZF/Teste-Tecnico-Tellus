import { EquipmentCategory, EquipmentStatus } from "@prisma/client";
import { CreateEquipmentDto } from "../dtos/CreateEquipmentDto";
import { DeleteEquipmentDto } from "../dtos/DeleteEquipmentDto";
import { ReturnEquipmentDto } from "../dtos/ReturnEquipmentDto";
import { UpdateEquipmentDto } from "../dtos/UpdateEquipmentDto";


export abstract class EquipmentRepository {
    abstract findByCategory(category: EquipmentCategory): Promise<ReturnEquipmentDto[]>;
    abstract findByStatus(status: EquipmentStatus): Promise<ReturnEquipmentDto[]>;
    abstract findById(id: string): Promise<ReturnEquipmentDto>;
    abstract create(equipment: CreateEquipmentDto): Promise<ReturnEquipmentDto>;
    abstract update(equipment: UpdateEquipmentDto): Promise<ReturnEquipmentDto>;
    abstract delete(deleteEquipment: DeleteEquipmentDto): Promise<void>;
}