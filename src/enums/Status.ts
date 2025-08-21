import { EquipmentStatus } from "@prisma/client";

export enum Status {
    AVAILABLE = 'disponivel',
    IN_MAINTENANCE = 'manutencao',
    BORROWED = 'emprestado',
}

export const equipmentToStatusMap: Record<EquipmentStatus, Status> = {
  AVAILABLE: Status.AVAILABLE,
  IN_MAINTENANCE: Status.IN_MAINTENANCE,
  BORROWED: Status.BORROWED,
};

export const statusToEquipmentMap: Record<Status, EquipmentStatus> = {
  [Status.AVAILABLE]: EquipmentStatus.AVAILABLE,
  [Status.IN_MAINTENANCE]: EquipmentStatus.IN_MAINTENANCE,
  [Status.BORROWED]: EquipmentStatus.BORROWED,
};