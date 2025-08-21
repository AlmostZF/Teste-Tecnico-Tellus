import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EquipmentService } from '../services/Equipment.service';
import { Categories } from 'src/enums/Categories';
import { Status } from 'src/enums/Status';
import { UpdateEquipmentDto } from '../dtos/UpdateEquipmentDto';
import { CreateEquipmentDto } from '../dtos/CreateEquipmentDto';
import { ReturnEquipmentDto } from '../dtos/ReturnEquipmentDto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('equipments')
@Controller('v1/equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }

  @Get('category/:category')

  @ApiOperation({ summary: 'Find equipment by category' })
  @ApiParam({ name: 'category', enum: Categories, description: 'Equipment category' })
  @ApiResponse({ status: 200, description: 'List of equipment by category.', type: [ReturnEquipmentDto] })
  async findByCategory(@Param('category') category: Categories): Promise<ReturnEquipmentDto[]> {
    return await this.equipmentService.findByCategory(category);
  }

  @Get('status/:status')

  @ApiOperation({ summary: 'Find equipment by status' })
  @ApiParam({ name: 'status', enum: Status, description: 'Equipment status' })
  @ApiResponse({ status: 200, description: 'List of equipment by status.', type: [ReturnEquipmentDto] })
  async findByStatus(@Param('status') status: Status): Promise<ReturnEquipmentDto[]> {
    return await this.equipmentService.findByStatus(status);
  }

  @Get('id/:id')

  @ApiOperation({ summary: 'Find equipment by ID' })
  @ApiParam({ name: 'id', description: 'Equipment UUID' })
  @ApiResponse({ status: 200, description: 'Equipment found.', type: ReturnEquipmentDto })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  async findById(@Param('id') id: string): Promise<ReturnEquipmentDto> {
    return await this.equipmentService.findById(id);
  }

  @Put()

  @ApiOperation({ summary: 'Update equipment' })
  @ApiBody({ type: UpdateEquipmentDto })
  @ApiResponse({ status: 200, description: 'Equipment successfully updated.', type: ReturnEquipmentDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(@Body() updateEquipmentDto: UpdateEquipmentDto): Promise<ReturnEquipmentDto> {
    return await this.equipmentService.update(updateEquipmentDto);
  }

  @Post()

  @ApiOperation({ summary: 'Create new equipment' })
  @ApiBody({ type: CreateEquipmentDto })
  @ApiResponse({ status: 201, description: 'Equipment successfully created.', type: ReturnEquipmentDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<ReturnEquipmentDto> {
    return await this.equipmentService.create(createEquipmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete equipment by ID' })
  @ApiParam({ name: 'id', description: 'Equipment UUID' })
  @ApiResponse({ status: 200, description: 'Equipment successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.equipmentService.delete({ id });
  }
}
