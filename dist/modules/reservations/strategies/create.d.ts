import { Reservation } from "@app/entities";
import { CreateReservationDto } from "@app/dtos";
export declare class CreateReservationStrategy {
    create(data: CreateReservationDto): Promise<Reservation>;
    private validate;
    private validateDate;
    private validateTable;
    private validateReservation;
    private validateCustomer;
    private populate;
    private populateCustomer;
    private createCustomer;
    private updateCustomer;
    private createReservation;
}
