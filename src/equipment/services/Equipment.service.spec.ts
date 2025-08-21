import { Test, TestingModule } from '@nestjs/testing';

import { EquipmentRepository } from '../repositories/EquipmentRepository';
import { Categories } from '../../enums/Categories';
import { Status } from '../../enums//Status';
import { EquipmentService } from './Equipment.service';
import { UpdateEquipmentDto } from '../dtos/UpdateEquipmentDto';

describe('EquipmentService', () => {
    let service: EquipmentService;
    let repository: jest.Mocked<EquipmentRepository>;

    let MockDto = {
        id: '1',
        name: 'Furadeira',
        category: Categories.TOOL,
        status: Status.AVAILABLE,
        createdAt: new Date(),
        updatedAt: new Date(),
        reservations: []
    }
    let mockReservation = {
        id: 'r1',
        equipmentId: '1',
        employeeId: 'emp1',
        startDate: new Date('2025-08-20T10:00:00Z'),
        endDate: new Date('2025-08-20T12:00:00Z'),
        createdAt: new Date('2025-08-19T10:00:00Z'),
        updatedAt: new Date('2025-08-19T11:00:00Z'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EquipmentService,
                {
                    provide: EquipmentRepository,
                    useValue: {
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        findById: jest.fn(),
                        findByCategory: jest.fn(),
                        findByStatus: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EquipmentService>(EquipmentService);
        repository = module.get(EquipmentRepository);
    });


    describe('create', () => {


        it('should create a valid equipment', async () => {
            const equipment = { name: 'Furadeira', category: Categories.TOOL, status: Status.AVAILABLE };
            repository.create.mockResolvedValue({
                id: '1',
                ...equipment,
                createdAt: new Date(),
                updatedAt: new Date(),
                reservations: [],
            });

            const result = await service.create(equipment);

            expect(repository.create).toHaveBeenCalledWith(equipment);
            expect(result).toMatchObject({ id: '1', ...equipment, });
        });

        it('should throw an error if name or category is missing when creating', async () => {
            await expect(service.create({ name: '', category: null } as any))
                .rejects
                .toThrow('Equipment name and category are required');
        });

    })

    describe('update', () => {
        it('should update a valid equipment', async () => {
        const updateDto:UpdateEquipmentDto = {
            id: 'eq1',
            name: 'Updated Equipment',
            category: Categories.TOOL,
            status: Status.AVAILABLE,
        };

        const existing = { id: 'eq1', name: 'Old Name', category: 'Old Category' };

        repository.findById = jest.fn().mockResolvedValue(existing);
        repository.update = jest.fn().mockResolvedValue(updateDto);

        const result = await service.update(updateDto);
        expect(result).toEqual(updateDto);
        });

    })

    describe('delete', () => {

        it('should delete a valid piece of equipment', async () => {
            repository.findById.mockResolvedValue({
                id: '1',
                name: 'Furadeira',
                category: Categories.CAMERA,
                status: Status.BORROWED,
                createdAt: new Date(),
                updatedAt: new Date(),
                reservations: [], // importante: vazio
            });

            repository.delete.mockResolvedValue();

            const result = await service.delete({ id: '1' });

            expect(repository.findById).toHaveBeenCalledWith('1');
            expect(repository.delete).toHaveBeenCalledWith({ id: '1' });
            expect(result).toEqual(undefined);
        });

        it('should throw an error if id is not provided on delete', async () => {
            await expect(service.delete({ id: '' } as any))
                .rejects
                .toThrow('Equipment Id cannot be empty');
        });

        it('should not delete equipment with reservations', async () => {

            repository.findById.mockResolvedValue({
                id: '1',
                name: 'Furadeira',
                category: Categories.CAMERA,
                status: Status.BORROWED,
                createdAt: new Date(),
                updatedAt: new Date(),
                reservations: [mockReservation],
            });

            await expect(service.delete({ id: '1' })).rejects.toThrow(
                `Failed to delete equipment with id 1`,
            );
        });
    })

    describe('findById', () => {

        it('should get equipment by ID', async () => {
            repository.findById.mockResolvedValue(MockDto);
            repository.delete.mockResolvedValue();

            const result = await service.findById('1');
            expect(repository.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(MockDto);
        });

        it('should throw an error if the ID is empty in findById', async () => {
            await expect(service.findById(''))
                .rejects
                .toThrow('Equipment Id cannot be empty');
        });
    })
    describe('findByCaterogy', () => {

        it('should retrieve equipment by valid category.', async () => {
            repository.findByCategory.mockResolvedValue([MockDto]);

            const result = await service.findByCategory(Categories.TOOL);

            expect(repository.findByCategory).toHaveBeenCalled();
            expect(result).toEqual([MockDto]);
        });

        it('should throw an error if the category is invalid', async () => {
            await expect(service.findByCategory('INVALID' as any))
                .rejects
                .toThrow('Invalid equipment category');
        });
    })


    describe('findByStatus', () => {

        it('should fetch equipment by valid status', async () => {
            repository.findByStatus.mockResolvedValue([MockDto]);

            const result = await service.findByStatus(Status.AVAILABLE);

            expect(repository.findByStatus).toHaveBeenCalled();
            expect(result).toEqual([MockDto]);
        });

        it('should throw an error if the status is invalid', async () => {
            await expect(service.findByStatus('INVALID' as any))
                .rejects
                .toThrow('Invalid equipment status');
        });
    })
});
