import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ReservationRepository } from "../repositories/ReservationRespoitory";
import { CreateReservationDto } from "../dtos/CreateReservationDto";
import { ReservationMapper } from "../mapper/ReservationMapper";
import { FormattedReservationsDto, ReturnReservationDto } from "../dtos/ReturnReservationDto";
import { equipmentToStatusMap, Status, statusToEquipmentMap } from "../../enums/Status";
import { ReturnData } from "../../utils/ResponseReturn";

@Injectable()
export class ReservationService {
    constructor(private readonly reservationRepository: ReservationRepository,) { }

    async createReservation(reservation: CreateReservationDto): Promise<ReturnData<ReturnReservationDto>> {
        const existingReservationByEmployee = await this.reservationRepository.filterReservationByEmployeeId(reservation.employeeId);
        if (existingReservationByEmployee) {
            throw new ConflictException("This employee already has a reservation and cannot reserve another equipment at the same time.");
        }

        const existingReservationByEquipment = await this.reservationRepository.filterReservationByEquipmentId(reservation.equipmentId);
        if (existingReservationByEquipment) {
            if (existingReservationByEquipment.equipment.status == statusToEquipmentMap[Status.IN_MAINTENANCE]) {
                throw new ConflictException("The equipment is currently under maintenance.");
            }
            if(existingReservationByEquipment.equipment.status == statusToEquipmentMap[Status.BORROWED]){
                throw new ConflictException("This equipment is currently borrowed.");
            }
            throw new ConflictException("This equipment is already reserved by another employee.");
        }

        const existingReservationByDate = await this.reservationRepository.filterReservation(reservation.startDate, reservation.employeeId, reservation.equipmentId);
        if (existingReservationByDate) {
            throw new ConflictException("This equipment is already reserved");
        }

        try {
            reservation.startDate = new Date(reservation.startDate);
            reservation.startDate.setUTCHours(0, 0, 0, 0);
            const reservationEntity = ReservationMapper.toCreateEntity(reservation)
            const reservationCreated = await this.reservationRepository.createReservation(reservationEntity);
            return new ReturnData([ReservationMapper.toReturnDto(reservationCreated)]);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create Reservation');
        }

    }

    async finishReservation(id: string): Promise<{ success: boolean }> {
        if (!id) {
            throw new BadRequestException('Reservation Id cannot be empty');
        }


        try {
            await this.reservationRepository.finishReservation(id);
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException('Failed to finish Reservation');
        }

    }

    async filterReservationByEmployeeId(employeeId: string): Promise<ReturnData<ReturnReservationDto>> {
        if (!employeeId) {
            throw new BadRequestException('Employee Id cannot be empty');
        }

        try {
            const reservation = await this.reservationRepository.filterReservationByEmployeeId(employeeId);
            if (!reservation) {
                throw new ReturnData()
            }
            return new ReturnData([ReservationMapper.toReturnDto(reservation)]);

        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch Reservations by employee id');
        }
    }

    async filterReservationByEquipmentId(equipmentId: string): Promise<ReturnData<ReturnReservationDto>> {

        if (!equipmentId) {
            throw new BadRequestException('Employee Id cannot be empty');
        }

        try {
            const reservation = await this.reservationRepository.filterReservationByEquipmentId(equipmentId);
            if (!reservation) {
                throw new ReturnData()
            }
            return new ReturnData([ReservationMapper.toReturnDto(reservation)]) ?? [];

        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch Reservations by equipment id');
        }
    }

    async filterReservation(date?: Date, employeeId?: string, equipmentId?: string): Promise<ReturnData<ReturnReservationDto>> {

        try {
            const reservation = await this.reservationRepository.filterReservation(date, employeeId, equipmentId);

            if (!reservation) {
                return new ReturnData
            }

            return new ReturnData([ReservationMapper.toReturnDto(reservation)]);

        } catch (error) {
            throw new InternalServerErrorException('Failed to filter reservations by date, employee, and equipment');
        }
    }
    async getAllReservations(): Promise<FormattedReservationsDto> {
        try {
            const reservation = await this.reservationRepository.getAllReservations() ?? [];
            const closedReservations = reservation.filter(r => r.endDate !== null);
            const activeReservations = reservation.filter(r => r.endDate === null);

            return ReservationMapper.toReturnFormattedDtoList(closedReservations, activeReservations);

        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch reservations');
        }
    }

}