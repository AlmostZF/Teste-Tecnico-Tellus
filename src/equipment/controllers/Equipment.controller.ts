import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EquipmentService } from '../services/Equipment.service';
import { Categories } from 'src/enums/Categories';
import { Status } from 'src/enums/Status';
import { UpdateEquipmentDto } from '../dtos/UpdateEquipmentDto';
import { CreateEquipmentDto } from '../dtos/CreateEquipmentDto';
import { ReturnEquipmentDto } from '../dtos/ReturnEquipmentDto';

@Controller('v1/equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get('category/:category')
  async findByCategory(@Param('category') category: Categories): Promise<ReturnEquipmentDto[]> {
    
    return await this.equipmentService.findByCategory(category);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: Status): Promise<ReturnEquipmentDto[]> {
    return await this.equipmentService.findByStatus(status);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<ReturnEquipmentDto> {
    return await this.equipmentService.findById(id);
  }

  @Put()
  async update(@Body() updateEquipmentDto: UpdateEquipmentDto): Promise<ReturnEquipmentDto> {
    return await this.equipmentService.update(updateEquipmentDto);
  }

  @Post()
  async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<ReturnEquipmentDto> {
    return await this.equipmentService.create(createEquipmentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.equipmentService.delete({ id });
  }
}
