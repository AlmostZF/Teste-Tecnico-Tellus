import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ReservationService } from "../services/Reservation.service";
import { FormattedReservationsDto, ReturnReservationDto } from "../dtos/ReturnReservationDto";
import { CreateReservationDto } from "../dtos/CreateReservationDto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiBody } from "@nestjs/swagger";
import { ReturnData } from "src/utils/ResponseReturn";
import { parse } from "path";

@ApiTags('reservations')
@Controller('v1/reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    // @Get('employee/:id')

    // @ApiOperation({ summary: 'Get reservations by employee ID' })
    // @ApiParam({ name: 'id', description: 'Employee ID' })
    // @ApiResponse({ status: 200, description: 'Reservations found successfully.', type: ReturnReservationDto })
    // @ApiResponse({ status: 404, description: 'No reservations found for this employee.' })
    // async filterReservationByEmployeeId(@Param('id') id: string): Promise<ReturnData<ReturnReservationDto>> {
    //     return await this.reservationService.filterReservationByEmployeeId(id);
    // }

    // @Get('equipment/:id')

    // @ApiOperation({ summary: 'Get reservations by equipment ID' })
    // @ApiParam({ name: 'id', description: 'Equipment ID' })
    // @ApiResponse({ status: 200, description: 'Reservations found successfully.', type: ReturnReservationDto })
    // @ApiResponse({ status: 404, description: 'No reservations found for this equipment.' })
    // async filterReservationByEquipmentId(@Param('id') id: string): Promise<ReturnData<ReturnReservationDto>> {
    //     return await this.reservationService.filterReservationByEquipmentId(id);
    // }

    @Get('filter')

    @ApiOperation({ summary: 'Filter reservations by date, employee or equipment' })
    @ApiQuery({ name: 'date', required: false, description: 'Reservation date (YYYY-MM-DD)' })
    @ApiQuery({ name: 'employeeId', required: false, description: 'Employee ID' })
    @ApiQuery({ name: 'equipmentId', required: false, description: 'Equipment ID' })
    @ApiResponse({ status: 200, description: 'Filtered reservations successfully returned.', type: ReturnReservationDto })
    async filterReservation(
        @Query('date') date: string,
        @Query('employeeId') employeeId: string,
        @Query('equipmentId') equipmentId: string
    ): Promise<ReturnData<ReturnReservationDto>> {
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);

        return await this.reservationService.filterReservation(parsedDate, employeeId, equipmentId);
    }

    @Get()

    @ApiOperation({ summary: 'Get all reservations' })
    @ApiResponse({ status: 200, description: 'List of reservations.', type: [FormattedReservationsDto] })
    async getAllReservations(): Promise<FormattedReservationsDto> {
        return await this.reservationService.getAllReservations();
    }

    @Put("id/:id")

    @ApiOperation({ summary: 'Finish a reservation' })
    @ApiParam({ name: 'id', description: 'Reservation ID' })
    @ApiResponse({ status: 200, description: 'Reservation successfully finished.' })
    @ApiResponse({ status: 404, description: 'Reservation not found.' })
    async finishReservation(@Param('id') id: string): Promise<{ success: boolean }> {
        return await this.reservationService.finishReservation(id);
    }

    @Post()

    @ApiOperation({ summary: 'Create a new reservation' })
    @ApiBody({ type: CreateReservationDto })
    @ApiResponse({ status: 201, description: 'Reservation successfully created.', type: ReturnReservationDto })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    async createReservation(@Body() createReservation: CreateReservationDto): Promise<ReturnData<ReturnReservationDto>> {
        return await this.reservationService.createReservation(createReservation);
    }
}
