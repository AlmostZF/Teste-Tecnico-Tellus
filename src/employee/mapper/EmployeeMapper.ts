import { CreateEmployeeDto } from "../dtos/CreateEmployeeDto";
import { ReturnEmployeeDto } from "../dtos/ReturnEmployeeDto";

import { Employee, Prisma } from '@prisma/client';
import { UpdateEmployeeDto } from "../dtos/UpdateEmployeeDto";

type EmployeeWithReservations = Prisma.EmployeeGetPayload<{
  include: { reservations: true };
}>;

export class EmployeeMapper {
    static toReturnDto(employee: Partial<EmployeeWithReservations>): ReturnEmployeeDto {
        return new ReturnEmployeeDto(
            employee.id!,
            employee.name!,
            employee.department!,
            employee.createdAt!,
            employee.updatedAt!,
            employee.reservations || [],
        );
    }

    static toDtoList(employees: EmployeeWithReservations[]): ReturnEmployeeDto[] {
        return employees.map(this.toReturnDto);
    }

    static toEntity(dto: ReturnEmployeeDto): EmployeeWithReservations {
        return {
            id: dto.id,
            name: dto.name,
            department: dto.department,
            reservations: dto.reservations,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

      static toCreateEntity(employee: CreateEmployeeDto): Omit<Employee, 'id'> {
        return {
            name: employee.name,
            department: employee.department,
            createdAt: new Date(),
            updatedAt: new Date()
        };
      }
    
      static toUpdateEntity(employee: UpdateEmployeeDto):Omit<Employee, 'createdAt'> {
        return {
            id: employee.id,
            name: employee.name,
            department: employee.department,
            updatedAt: new Date()
        };
      }


}