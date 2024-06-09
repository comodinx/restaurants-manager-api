import { Model } from "@app/database";
import Customer from "./customer";
import RestaurantTable from "./restaurantTable";
import ReservationStatus from "./reservationStatus";
export default class Reservation extends Model<Reservation> {
    id: number;
    tableId: number;
    customerId: number;
    statusId: number;
    reservationDate: Date;
    numGuests: number;
    createdAt: Date;
    updatedAt?: Date;
    table?: RestaurantTable;
    customer?: Customer;
    status?: ReservationStatus;
    isSameReservationDate(reservationDate: string): boolean;
}
