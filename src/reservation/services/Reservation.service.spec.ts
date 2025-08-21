import { Test, TestingModule } from '@nestjs/testing';

import { ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';

import { Status, equipmentToStatusMap, statusToEquipmentMap } from '../../enums/Status';
import { ReservationService } from '../../reservation/services/Reservation.service';
import { ReservationRepository } from '../../reservation/repositories/ReservationRespoitory';
import { ReservationMapper, ReservationWithEmployeeAndEquipment } from '../../reservation/mapper/ReservationMapper';
import { CreateReservationDto } from '../../reservation/dtos/CreateReservationDto';


describe('ReservationService', () => {
    let service: ReservationService;
    let repository: jest.Mocked<ReservationRepository>;

    const mockReservation: ReservationWithEmployeeAndEquipment = {
        id: 'res1',
        employeeId: 'emp1',
        equipmentId: 'eq1',
        startDate: new Date('2025-08-21T00:00:00Z'),
        endDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        employee: {
            name: 'José',
        },
        equipment: {
            name: 'Notebook Dell',
            id: 'eq1',
            createdAt: new Date(),
            updatedAt: new Date(),
            status: statusToEquipmentMap[Status.AVAILABLE],
            category: 'NOTEBOOK',
        },
    };

    const mockMapper = {
        toReturnDto: jest.fn().mockImplementation((reservation) => reservation),
        toCreateEntity: jest.fn().mockImplementation((dto) => ({ ...dto, id: 'res1' })),
        toReturnFormattedDtoList: jest.fn().mockImplementation((closed, active) => ({
            closedReservations: closed,
            activeReservations: active
        }))
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReservationService,
                {
                    provide: ReservationRepository,
                    useValue: {
                        filterReservationByEmployeeId: jest.fn(),
                        filterReservationByEquipmentId: jest.fn(),
                        filterReservation: jest.fn(),
                        createReservation: jest.fn(),
                        finishReservation: jest.fn(),
                        getAllReservations: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ReservationService>(ReservationService);
        repository = module.get(ReservationRepository);

        // Injetar manualmente o mock do mapper (já que ele é importado diretamente)
        Object.assign(ReservationMapper, mockMapper);
    });

    describe('createReservation', () => {
        const dto: CreateReservationDto = {
            employeeId: 'emp1',
            equipmentId: 'eq1',
            startDate: new Date(),
        };

        it('deve lançar erro se funcionário já tiver reserva', async () => {
            repository.filterReservationByEmployeeId.mockResolvedValue(mockReservation);
            await expect(service.createReservation(dto)).rejects.toThrow(ConflictException);
        });

        it('deve lançar erro se equipamento estiver em manutenção', async () => {
            repository.filterReservationByEmployeeId.mockResolvedValue(null);
            repository.filterReservationByEquipmentId.mockResolvedValue(mockReservation);

            await expect(service.createReservation(dto)).rejects.toThrow(ConflictException);
        });

        it('deve lançar erro se equipamento já estiver reservado', async () => {
            repository.filterReservationByEmployeeId.mockResolvedValue(null);
            repository.filterReservationByEquipmentId.mockResolvedValue(mockReservation);

            await expect(service.createReservation(dto)).rejects.toThrow(ConflictException);
        });

        it('deve lançar erro se já existir reserva nessa data', async () => {
            repository.filterReservationByEmployeeId.mockResolvedValue(null);
            repository.filterReservationByEquipmentId.mockResolvedValue(null);
            repository.filterReservation.mockResolvedValue(mockReservation);

            await expect(service.createReservation(dto)).rejects.toThrow(ConflictException);
        });

        it('deve criar reserva com sucesso', async () => {
            repository.filterReservationByEmployeeId.mockResolvedValue(null);
            repository.filterReservationByEquipmentId.mockResolvedValue(null);
            repository.filterReservation.mockResolvedValue(null);
            repository.createReservation.mockResolvedValue(mockReservation);

            const result = await service.createReservation(dto);
            expect(result.data[0].id).toBe('res1');
        });

        it('deve lançar erro interno ao criar reserva', async () => {
            repository.filterReservationByEmployeeId.mockResolvedValue(null);
            repository.filterReservationByEquipmentId.mockResolvedValue(null);
            repository.filterReservation.mockResolvedValue(null);
            repository.createReservation.mockRejectedValue(new Error());

            await expect(service.createReservation(dto)).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('finishReservation', () => {
        it('deve lançar erro se id estiver vazio', async () => {
            await expect(service.finishReservation('')).rejects.toThrow(BadRequestException);
        });

        it('deve finalizar reserva com sucesso', async () => {
            repository.finishReservation.mockResolvedValue(undefined);
            const result = await service.finishReservation('res1');
            expect(result).toEqual({ success: true });
        });

        it('deve lançar erro interno ao finalizar reserva', async () => {
            repository.finishReservation.mockRejectedValue(new Error());
            await expect(service.finishReservation('res1')).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('filterReservationByEmployeeId', () => {
        it('deve lançar erro se employeeId for vazio', async () => {
            await expect(service.filterReservationByEmployeeId('')).rejects.toThrow(BadRequestException);
        });

        it('deve retornar a reserva do funcionário', async () => {
            repository.filterReservationByEmployeeId.mockResolvedValue(mockReservation);
            const result = await service.filterReservationByEmployeeId('emp1');
            expect(result.data[0].id).toBe('res1');
        });

        it('deve lançar erro interno ao buscar por funcionário', async () => {
            repository.filterReservationByEmployeeId.mockRejectedValue(new Error());
            await expect(service.filterReservationByEmployeeId('emp1')).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('filterReservationByEquipmentId', () => {
        it('deve lançar erro se equipmentId for vazio', async () => {
            await expect(service.filterReservationByEquipmentId('')).rejects.toThrow(BadRequestException);
        });

        it('deve retornar reserva do equipamento', async () => {
            repository.filterReservationByEquipmentId.mockResolvedValue(mockReservation);
            const result = await service.filterReservationByEquipmentId('eq1');
            expect(result.data[0].id).toBe('res1');
        });

        it('deve lançar erro interno ao buscar por equipamento', async () => {
            repository.filterReservationByEquipmentId.mockRejectedValue(new Error());
            await expect(service.filterReservationByEquipmentId('eq1')).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('filterReservation', () => {
        it('deve retornar reserva filtrada', async () => {
            repository.filterReservation.mockResolvedValue(mockReservation);
            const result = await service.filterReservation(new Date(), 'emp1', 'eq1');
            expect(result.data[0].id).toBe('res1');
        });

        it('deve lançar erro interno ao filtrar reserva', async () => {
            repository.filterReservation.mockRejectedValue(new Error());
            await expect(service.filterReservation(new Date(), 'emp1', 'eq1')).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('getAllReservations', () => {
        it('deve retornar reservas formatadas', async () => {
            const reservations = [
                { ...mockReservation, endDate: null },
                { ...mockReservation, id: 'res2', endDate: new Date() },
            ];

            repository.getAllReservations.mockResolvedValue(reservations);

            const result = await service.getAllReservations();
            expect(result.activeReservations.length).toBe(1);
            expect(result.closedReservations.length).toBe(1);
        });

        it('deve lançar erro interno ao buscar todas as reservas', async () => {
            repository.getAllReservations.mockRejectedValue(new Error());
            await expect(service.getAllReservations()).rejects.toThrow(InternalServerErrorException);
        });
    });
});
