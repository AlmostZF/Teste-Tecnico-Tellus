import { Employee } from "@prisma/client";
import { ReturnEmployeeDto } from "../dtos/ReturnEmployeeDto";
import { CreateEmployeeDto } from "../dtos/CreateEmployeeDto";
import { UpdateEmployeeDto } from "../dtos/UpdateEmployeeDto";
import { DeleteEmployeeDto } from "../dtos/DeleteEmployeeDto";

export abstract class EmployeeRepository {
    abstract findByName(name: string): Promise<ReturnEmployeeDto[]>;
    abstract findById(id: string): Promise<ReturnEmployeeDto>;
    abstract create(employee: CreateEmployeeDto): Promise<ReturnEmployeeDto>;
    abstract update(employee: UpdateEmployeeDto): Promise<ReturnEmployeeDto>;
    abstract delete(employee: DeleteEmployeeDto): Promise<void>;
}