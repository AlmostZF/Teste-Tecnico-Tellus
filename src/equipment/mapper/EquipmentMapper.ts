import { Equipment, Prisma } from "@prisma/client";
import { ReturnEquipmentDto } from "../dtos/ReturnEquipmentDto";
import { categoriesToEquipmentMap, equipmentToCategoriesMap } from "src/enums/Categories";
import { equipmentToStatusMap, statusToEquipmentMap } from "src/enums/Status";
import { CreateEquipmentDto } from "../dtos/CreateEquipmentDto";
import { UpdateEquipmentDto } from "../dtos/UpdateEquipmentDto";

type EquipmentWithReservations = Prisma.EquipmentGetPayload<{
  include: { reservations: true };
}>;

export class EquipmentMapper {

  static toCreateEntity(dto: CreateEquipmentDto): Omit<Equipment, 'id'> {
    return {
      name: dto.name,
      category: categoriesToEquipmentMap[dto.category],
      status: statusToEquipmentMap[dto.status],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toUpdateEntity(dto: UpdateEquipmentDto):Omit<Equipment, 'createdAt'> {
    return {
      id: dto.id,
      name: dto.name,
      category: categoriesToEquipmentMap[dto.category],
      status: statusToEquipmentMap[dto.status],
      updatedAt: new Date(),
    };
  }

  static toReturnDto(equipment: EquipmentWithReservations): ReturnEquipmentDto {
    return new ReturnEquipmentDto(
      equipment.id,
      equipment.name,
      equipmentToCategoriesMap[equipment.category],
      equipmentToStatusMap[equipment.status],
      equipment.createdAt,
      equipment.updatedAt,
      equipment.reservations ?? []
    );
  }

  static toReturnDtoList(equipments: Equipment[]): ReturnEquipmentDto[] {
    return equipments.map(this.toReturnDto);
  }
}
