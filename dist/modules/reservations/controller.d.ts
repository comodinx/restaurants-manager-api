import { CreateReservationDto, FinderDto, GetterByIdDto } from "@app/dtos";
import { ReservationsService } from "./service";
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    find(query: FinderDto): Promise<import("../../entities").Reservation[]>;
    getById(id: string, query: GetterByIdDto): Promise<import("../../entities").Reservation>;
    create(body: CreateReservationDto): Promise<import("../../entities").Reservation>;
}
