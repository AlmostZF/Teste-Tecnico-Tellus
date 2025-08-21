import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EquipmentRepository } from '../repositories/EquipmentRepository';

import { Categories, categoriesToEquipmentMap } from '../../enums/Categories';
import { Status, statusToEquipmentMap } from '../../enums/Status';
import { CreateEquipmentDto } from '../dtos/CreateEquipmentDto';
import { DeleteEquipmentDto } from '../dtos/DeleteEquipmentDto';
import { UpdateEquipmentDto } from '../dtos/UpdateEquipmentDto';



@Injectable()
export class EquipmentService {

    constructor(private readonly equipmentRepository: EquipmentRepository) { }

    async findByCategory(category: Categories) {

        if (!categoriesToEquipmentMap[category]) {
            throw new Error('Invalid equipment category');
        }

        if (!category) {
            throw new Error('Category is required');
        }
        try {

            const categorymapper = categoriesToEquipmentMap[category]
            return await this.equipmentRepository.findByCategory(categorymapper);

        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch equipments by category');
        }

    }

    async findByStatus(status: Status) {

        if (!status) {
            throw new Error('Status is required');
        }
        if (!statusToEquipmentMap[status]) {
            throw new Error('Invalid equipment status');
        }
        try {
            const statusMapper = statusToEquipmentMap[status];
            return await this.equipmentRepository.findByStatus(statusMapper);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch equipments by status');

        }

    }

    async findById(id: string) {
        if (!id) {
            throw new Error('Equipment Id cannot be empty');
        }
        try {
            return await this.equipmentRepository.findById(id);

        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch equipment with id ${id}`);

        }
    }

    async create(equipment: CreateEquipmentDto) {

        if (!equipment.name || !equipment.category) {
            throw new Error('Equipment name and category are required');
        }
        try {

            return await this.equipmentRepository.create(equipment);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create equipment');
        }
    }

    async update(equipment: UpdateEquipmentDto) {

          const { id, name, category, status } = equipment;
        if (!id || !name || !category) {
            throw new Error('Equipment Id, name, and category are required');
        }
        const existingEmployee = await this.equipmentRepository.findById(id);
        
        if (!existingEmployee) {
            throw new Error(`equipment with id ${id} not found`);
        }

        try {
            return await this.equipmentRepository.update(equipment);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to update equipment with id ${equipment.id}`);
        }


    }

    async delete(deleteEquipment: DeleteEquipmentDto) {

        const { id } = deleteEquipment;
        if (!deleteEquipment || !id) {
            throw new Error('Equipment Id cannot be empty');
        }

        try {
            const verifyEquipment = await this.equipmentRepository.findById(id);

            if (verifyEquipment.reservations && verifyEquipment.reservations.length > 0) {
                throw new Error(`Cannot delete equipment with id ${id} because it has associated reservations`);
            }

            return this.equipmentRepository.delete(deleteEquipment);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to delete equipment with id ${id}`);
        }

    }
}
