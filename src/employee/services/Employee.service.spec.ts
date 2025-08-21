import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeRepository } from "../repositories/EmployeeRespository";
import { EmployeeService } from "./Employee.service";
import { UpdateEmployeeDto } from "../dtos/UpdateEmployeeDto";
import { ReturnEmployeeDto } from "../dtos/ReturnEmployeeDto";

describe('EmployeeService', () => {
    let service: EmployeeService;
    let repository: jest.Mocked<EmployeeRepository>;

    let MockDto: ReturnEmployeeDto = {
        id: '1',
        name: 'José',
        department: 'Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
        reservations: [],
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmployeeService,
                {
                    provide: EmployeeRepository,
                    useValue: {
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        findById: jest.fn(),
                        findByName: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EmployeeService>(EmployeeService);
        repository = module.get(EmployeeRepository);
    });

    describe('create', () => {
        it('should create a valid employee', async () => {
            const employee = { name: 'José', department: 'Engineering' };
            repository.create.mockResolvedValue({
                id: '1',
                ...employee,
                createdAt: new Date(),
                updatedAt: new Date(),
                reservations: [],
            });

            const result = await service.create(employee);
            expect(result).toMatchObject({ id: '1', ...employee, createdAt: expect.any(Date), updatedAt: expect.any(Date) });
        });

        it('should throw an error if name or department is missing', async () => {
            await expect(service.create({ name: '', department: '' } as any))
                .rejects
                .toThrow('Name and department are required');
        });
    });

    describe('update', () => {
        it('should update a valid employee', async () => {
        const employeeData: UpdateEmployeeDto = {
            id: '123',
            name: 'Updated Name',
            department: 'Updated Department',
        };

        const existingEmployee = { id: '123', name: 'Old Name' };
        const updatedEmployee = { id: '123', name: 'Updated Name' };

        repository.findById = jest.fn().mockResolvedValue(existingEmployee);
        repository.update = jest.fn().mockResolvedValue(updatedEmployee);

        const result = await service.update(employeeData);

        expect(result).toEqual(updatedEmployee);
        });

        const updateDto = { id: '1', name: 'John Updated', department: 'Eng' } as ReturnEmployeeDto;

        it('should update employee successfully', async () => {
            repository.findById.mockResolvedValue(updateDto);
            const updatedEmployee = { ...updateDto, updatedAt: new Date(), createdAt: new Date(), reservations: [] };
            repository.update.mockResolvedValue(updatedEmployee);

            const result = await service.update(updateDto);
            expect(repository.findById).toHaveBeenCalledWith(updateDto.id);
            expect(repository.update).toHaveBeenCalledWith(updateDto);
            expect(result).toEqual(updatedEmployee);
        });

        it('should throw error if id missing', async () => {
            await expect(service.update({} as any)).rejects.toThrow('Id cannot be empty');
        });
    });
    describe('delete', () => {
        const deleteDto = { id: '1' };

        it('should delete employee successfully', async () => {
            repository.findById.mockResolvedValue(MockDto);
            repository.delete.mockResolvedValue(undefined);

            await service.delete(deleteDto);

            expect(repository.findById).toHaveBeenCalledWith(deleteDto.id);
            expect(repository.delete).toHaveBeenCalledWith(deleteDto);
        });

        it('should throw error if id missing', async () => {
            await expect(service.delete({} as any)).rejects.toThrow('Id cannot be empty');
        });

    });

    describe('findByName', () => {
        it('should return employees by name', async () => {
            repository.findByName.mockResolvedValue([MockDto]);

            const result = await service.findByName('José');
            expect(repository.findByName).toHaveBeenCalledWith('José');
            expect(result).toEqual([MockDto]);
        });

        it('should throw error if name undefined', async () => {
            await expect(service.findByName(undefined as any)).rejects.toThrow('Name is required');
        });

    });
    describe('findById', () => {
        it('should return employees by name', async () => {
            repository.findById.mockResolvedValue(MockDto);

            const result = await service.findById('1');
            expect(repository.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(MockDto);
        });

        it('should throw an error if the ID is empty in findById', async () => {
            await expect(service.findById('')).rejects.toThrow('Id is required');
        });

    });
})