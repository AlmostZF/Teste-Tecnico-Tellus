import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../EquipmentRepository';
import { EquipmentCategory, EquipmentStatus } from '@prisma/client';
import { CreateEquipmentDto } from '../../../equipment/dtos/CreateEquipmentDto';
import { DeleteEquipmentDto } from '../../../equipment/dtos/DeleteEquipmentDto';

import { PrismaService } from '../../../database/prisma.service';
import { EquipmentMapper } from '../../../equipment/mapper/EquipmentMapper';
import { ReturnEquipmentDto } from '../../../equipment/dtos/ReturnEquipmentDto';
import { UpdateEquipmentDto } from '../../../equipment/dtos/UpdateEquipmentDto';


@Injectable()
export class PrismaEquipmentRepository implements EquipmentRepository {

    constructor(private readonly prisma: PrismaService) { }

    async findByCategory(category: EquipmentCategory): Promise<ReturnEquipmentDto[]> {
        const equipments = await this.prisma.equipment.findMany({ where: { category }, include: { reservations: true } });
        if(!equipments) {
            throw new Error(`No equipment found for category: ${category}`);
        }
        return EquipmentMapper.toReturnDtoList(equipments);
    }

    async findByStatus(status: EquipmentStatus): Promise<ReturnEquipmentDto[]> {
        const equipments = await this.prisma.equipment.findMany({ where: { status }, include: { reservations: true } });
        if(!equipments) {
            throw new Error(`No equipment found for status: ${status}`);
        }
        return EquipmentMapper.toReturnDtoList(equipments);
    }

    async findById(id: string): Promise<ReturnEquipmentDto> {
        const equipment = await this.prisma.equipment.findUnique({ where: { id }, include: { reservations: true }});
        if (!equipment) {
            throw new Error(`Equipment with id ${id} not found`);
        }
        return EquipmentMapper.toReturnDto(equipment);
    }

    async create(equipment: CreateEquipmentDto): Promise<ReturnEquipmentDto> {
        const data = EquipmentMapper.toCreateEntity(equipment);
        const equipmentCreated = await this.prisma.equipment.create({ data, include: { reservations: true } });
        return EquipmentMapper.toReturnDto(equipmentCreated);
    }

    async update(equipment: UpdateEquipmentDto): Promise<ReturnEquipmentDto> {
        const existingEquipment = await this.prisma.equipment.findUnique({ where: { id: equipment.id }});

        if (!existingEquipment) {
            throw new Error(`Equipment with id ${equipment.id} not found`);
        }

        const data = EquipmentMapper.toUpdateEntity(equipment);
        const updatedEquipment = await this.prisma.equipment.update({
            where: { id: existingEquipment.id},
            data,
            include: { reservations: true }
        });
        return EquipmentMapper.toReturnDto(updatedEquipment);
    }

    async delete(deleteEquipment: DeleteEquipmentDto): Promise<void> {
        const existingEquipment = await this.prisma.equipment.findUnique({ where: { id: deleteEquipment.id } });
        if (!existingEquipment) {
            throw new Error(`Equipment with id ${deleteEquipment.id} not found`);
        }
        await this.prisma.equipment.delete({ where: { id: existingEquipment.id } });
    }

}
