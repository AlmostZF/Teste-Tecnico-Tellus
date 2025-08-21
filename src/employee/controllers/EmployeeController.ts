import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from "../services/Employee.service";
import { UpdateEmployeeDto } from '../dtos/UpdateEmployeeDto';
import { ReturnEmployeeDto } from '../dtos/ReturnEmployeeDto';
import { CreateEmployeeDto } from '../dtos/CreateEmployeeDto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('v1/employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Get('name/:name')

    @ApiOperation({ summary: 'Find employees by name' })
    @ApiParam({ name: 'name', description: 'Employee full or partial name' })
    @ApiResponse({ status: 200, description: 'List of employees matching the name', type: [ReturnEmployeeDto] })
    async findByName(@Param('name') name: string): Promise<ReturnEmployeeDto[]> {
        return await this.employeeService.findByName(name);
    }

    @Get('id/:id')
    @ApiOperation({ summary: 'Find employee by ID' })

    @ApiParam({ name: 'id', description: 'Employee UUID' })
    @ApiResponse({ status: 200, description: 'Employee found', type: ReturnEmployeeDto })
    @ApiResponse({ status: 404, description: 'Employee not found' })
    async findById(@Param('id') id: string): Promise<ReturnEmployeeDto> {
        return await this.employeeService.findById(id);
    }

    @Put()

    @ApiOperation({ summary: 'Update employee' })
    @ApiBody({ type: UpdateEmployeeDto })
    @ApiResponse({ status: 200, description: 'Employee successfully updated', type: ReturnEmployeeDto })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async update(@Body() updateEmployeeDto: UpdateEmployeeDto): Promise<ReturnEmployeeDto> {
        return await this.employeeService.update(updateEmployeeDto);
    }

    @Post()

    @ApiOperation({ summary: 'Create new employee' })
    @ApiBody({ type: CreateEmployeeDto })
    @ApiResponse({ status: 201, description: 'Employee successfully created', type: ReturnEmployeeDto })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<ReturnEmployeeDto> {
        return await this.employeeService.create(createEmployeeDto);
    }

    @Delete(':id')
    
    @ApiOperation({ summary: 'Delete employee by ID' })
    @ApiParam({ name: 'id', description: 'Employee UUID' })
    @ApiResponse({ status: 200, description: 'Employee successfully deleted' })
    @ApiResponse({ status: 404, description: 'Employee not found' })
    async delete(@Param('id') id: string): Promise<void> {
        return this.employeeService.delete({ id });
    }
}
