import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../EmployeeRespository";
import { PrismaService } from "../../../database/prisma.service";
import { CreateEmployeeDto } from "../../dtos/CreateEmployeeDto";
import { DeleteEmployeeDto } from "../../dtos/DeleteEmployeeDto";
import { ReturnEmployeeDto } from "../../dtos/ReturnEmployeeDto";
import { UpdateEmployeeDto } from "../../dtos/UpdateEmployeeDto";
import { EmployeeMapper } from "../../mapper/EmployeeMapper";


@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByName(name: string): Promise<ReturnEmployeeDto[]> {

        const existingEmployee = await this.prisma.employee.findMany({ where: { name: name }, include: { reservations: true } });

        if (!existingEmployee) {
            throw new Error(`Employee with name ${name} not found`);
        }
        return EmployeeMapper.toDtoList(existingEmployee);

    }

    async findById(id: string): Promise<ReturnEmployeeDto> {
        const existingEmployee = await this.prisma.employee.findUnique({ where: { id }, include: { reservations: true } });

        if (!existingEmployee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        return EmployeeMapper.toReturnDto(existingEmployee);

    }

    async create(employee: CreateEmployeeDto): Promise<ReturnEmployeeDto> {
        const data = EmployeeMapper.toCreateEntity(employee);
        const employeeCreated = await this.prisma.employee.create({ data, include: { reservations: true } });
        return EmployeeMapper.toReturnDto(employeeCreated);
    }

    async update(employee: UpdateEmployeeDto): Promise<ReturnEmployeeDto> {
        const existingEmployee = await this.prisma.employee.findUnique({ where: { id: employee.id }});
        if (!existingEmployee) {
            throw new Error(`Employee with id ${employee.id} not found`);
        }
        const data = EmployeeMapper.toUpdateEntity(employee);
        const updatedEmployee = await this.prisma.employee.update({
            where: { id: existingEmployee.id },
            data,
            include: { reservations: true }
        });

        return EmployeeMapper.toReturnDto(updatedEmployee);
    }

    async delete(employee: DeleteEmployeeDto): Promise<void> {
        const existingEmployee = await this.prisma.employee.findUnique({ where: { id: employee.id }});
        if (!existingEmployee) {
            throw new Error(`Employee with id ${employee.id} not found`);
        }
        await this.prisma.employee.delete({ where: { id: existingEmployee.id } });
    }


}