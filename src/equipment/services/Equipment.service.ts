import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EquipmentRepository } from '../repositories/EquipmentRepository';

import { Categories, categoriesToEquipmentMap } from '../../enums/Categories';
import { Status, statusToEquipmentMap } from '../../enums/Status';
import { CreateEquipmentDto } from '../dtos/CreateEquipmentDto';
import { DeleteEquipmentDto } from '../dtos/DeleteEquipmentDto';
import { UpdateEquipmentDto } from '../dtos/UpdateEquipmentDto';
import { ReturnEquipmentDto } from '../dtos/ReturnEquipmentDto';



@Injectable()
export class EquipmentService {

    constructor(private readonly equipmentRepository: EquipmentRepository) { }

    async findByCategory(category: Categories): Promise<ReturnEquipmentDto[]> {

        if (!categoriesToEquipmentMap[category]) {
            throw new BadRequestException('Invalid equipment category');
        }

        if (!category) {
            throw new BadRequestException('Category is required');
        }

        try {

            const categorymapper = categoriesToEquipmentMap[category]
            return await this.equipmentRepository.findByCategory(categorymapper);

        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch equipments by category');
        }

    }

    async findByStatus(status: Status): Promise<ReturnEquipmentDto[]> {

        if (!status) {
            throw new BadRequestException('Status is required');
        }
        
        if (!statusToEquipmentMap[status]) {
            throw new BadRequestException('Invalid equipment status');
        }

        try {
            const statusMapper = statusToEquipmentMap[status];
            return await this.equipmentRepository.findByStatus(statusMapper);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch equipments by status');

        }

    }

    async findById(id: string): Promise<ReturnEquipmentDto> {
        if (!id) {
            throw new BadRequestException('Equipment Id cannot be empty');
        }

        try {
            return await this.equipmentRepository.findById(id);

        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch equipment with id ${id}`);

        }
    }

    async create(equipment: CreateEquipmentDto): Promise<ReturnEquipmentDto> {

        if (!equipment.name || !equipment.category) {
            throw new BadRequestException('Equipment name and category are required');
        }

        try {

            return await this.equipmentRepository.create(equipment);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create equipment');
        }
    }

    async update(equipment: UpdateEquipmentDto): Promise<ReturnEquipmentDto> {

        const { id, name, category, status } = equipment;
        if (!id || !name || !category) {
            throw new BadRequestException('Equipment Id, name, and category are required');
        }

        const existingEmployee = await this.equipmentRepository.findById(id);
        if (!existingEmployee) {
            throw new BadRequestException(`equipment with id ${id} not found`);
        }

        if (existingEmployee.reservations && existingEmployee.reservations.length > 0 && existingEmployee.reservations.some(reservation => reservation.endDate === null)) {
            throw new ConflictException(`Cannot update equipment with id ${id} because it has associated reservations`);
        }

        try {
            return await this.equipmentRepository.update(equipment);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to update equipment with id ${equipment.id}`);
        }


    }

    async delete(deleteEquipment: DeleteEquipmentDto): Promise<void> {

        const { id } = deleteEquipment;
        if (!deleteEquipment || !id) {
            throw new BadRequestException('Equipment Id cannot be empty');
        }

        const verifyEquipment = await this.equipmentRepository.findById(id);

        if (verifyEquipment.reservations && verifyEquipment.reservations.length > 0) {

            throw new ConflictException(`Cannot delete equipment with id ${id} because it has associated reservations`);
        }

        try {

            await this.equipmentRepository.delete(deleteEquipment);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to delete equipment with id ${id}`);
        }

    }
}
