import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ReturnEmployeeDto } from "../dtos/ReturnEmployeeDto";
import { EmployeeRepository } from "../repositories/EmployeeRespository";
import { CreateEmployeeDto } from "../dtos/CreateEmployeeDto";
import { UpdateEmployeeDto } from "../dtos/UpdateEmployeeDto";
import { DeleteEmployeeDto } from "../dtos/DeleteEmployeeDto";

@Injectable()
export class EmployeeService{
    constructor(private readonly employeeRepository: EmployeeRepository){}


    async findByName(name: string): Promise<ReturnEmployeeDto[]> {
        if(name === undefined){
            throw new BadRequestException("Name is required");
        }

        try {
            return await this.employeeRepository.findByName(name);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch Employee by name');
        }
    }

    async findById(id: string): Promise<ReturnEmployeeDto> {
        if(!id){
            throw new BadRequestException("Id is required");
        }

        try {
            return await this.employeeRepository.findById(id);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch Employee by Id');
        }
    }

    async create(employee: CreateEmployeeDto): Promise<ReturnEmployeeDto> {
        if(!employee.name || !employee.department){
            throw new BadRequestException("Name and department are required");
        }

        try {
            return await this.employeeRepository.create(employee);
            
        } catch (error) {
            console.error('Erro no update:', error);
            throw new InternalServerErrorException('Failed to create Employee');
        }
    }

    async update(employee: UpdateEmployeeDto): Promise<ReturnEmployeeDto> {
        if(!employee.id){
            throw new BadRequestException(" Id cannot be empty");
        }
        
        const existingEmployee = await this.employeeRepository.findById(employee.id);
        if(!existingEmployee){
            throw new BadRequestException(`Employee with id ${employee.id} not found`);
        }
        
        if (existingEmployee.reservations && existingEmployee.reservations.length > 0 && existingEmployee.reservations.some(reservation => reservation.endDate === null)) {
            throw new ConflictException(`Cannot update Employee with id ${existingEmployee.id} because it has associated reservations`);
        }

        try {
            return await this.employeeRepository.update(employee);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update Employee');
        }
    }


    async delete(employee: DeleteEmployeeDto): Promise<void> {
        if(!employee.id){
            throw new BadRequestException(" Id cannot be empty");
        }
        
        const existingEmployee = await this.employeeRepository.findById(employee.id);
        if(!existingEmployee){
            throw new BadRequestException(`Employee with id ${employee.id} not found`);
        }
        if (existingEmployee.reservations && existingEmployee.reservations.length > 0) {
            throw new ConflictException(`Cannot delete Employee with id ${existingEmployee.id} because it has associated reservations`);
        }

        try {
            await this.employeeRepository.delete(employee);

        } catch (error) {
            throw new InternalServerErrorException('Failed to delete Employee');
        }
    }
}