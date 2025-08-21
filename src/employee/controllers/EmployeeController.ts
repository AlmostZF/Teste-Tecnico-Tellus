import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { EmployeeService } from "../services/Employee.service";
import { UpdateEmployeeDto } from '../dtos/UpdateEmployeeDto';
import { ReturnEmployeeDto } from '../dtos/ReturnEmployeeDto';
import { CreateEmployeeDto } from '../dtos/CreateEmployeeDto';


@Controller('v1/Employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Get('name/:name')
    async findByName(@Param('name') name: string): Promise<ReturnEmployeeDto[]> {
        return await this.employeeService.findByName(name);
    }

    @Get('id/:id')
    async findById(@Param('id') id: string): Promise<ReturnEmployeeDto> {
        return await this.employeeService.findById(id);
    }

    @Put()
    async update(@Body() updateEmployeeDto: UpdateEmployeeDto): Promise<ReturnEmployeeDto> {
        return await this.employeeService.update(updateEmployeeDto);
    }

    @Post()
    async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<ReturnEmployeeDto> {
        return await this.employeeService.create(createEmployeeDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.employeeService.delete({ id });
    }


}
