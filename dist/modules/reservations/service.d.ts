import { Reservation } from "@app/entities";
import { CreateReservationDto, FinderDto, GetterByIdDto } from "@app/dtos";
import { CreateReservationStrategy } from "./strategies";
export declare class ReservationsService {
    private readonly createReservationStrategy;
    constructor(createReservationStrategy: CreateReservationStrategy);
    find(options: FinderDto): Promise<Reservation[]>;
    getById(id: number, options?: GetterByIdDto): Promise<Reservation | undefined | null>;
    create(data: CreateReservationDto): Promise<Reservation>;
}
