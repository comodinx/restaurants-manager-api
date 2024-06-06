import moment from "moment";
import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Model } from "@app/database";
import constants from "@app/constants";
import Customer from "./customer";
import RestaurantTable from "./restaurantTable";
import ReservationStatus from "./reservationStatus";

@Table({ tableName: "reservations", timestamps: false })
export default class Reservation extends Model<Reservation> {
  //
  // properties
  //

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({ field: "table_id" })
  @ForeignKey(() => RestaurantTable)
  tableId: number;

  @Column({ field: "customer_id" })
  @ForeignKey(() => Customer)
  customerId: number;

  @Column({ field: "reservation_status_id" })
  @ForeignKey(() => ReservationStatus)
  statusId: number;

  @Column({ field: "reservation_date", type: DataType.DATEONLY })
  reservationDate: Date;

  @Column({ field: "num_guests" })
  numGuests: number;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt?: Date;

  //
  // relationships
  //

  @BelongsTo(() => RestaurantTable)
  table?: RestaurantTable;

  @BelongsTo(() => Customer)
  customer?: Customer;

  @BelongsTo(() => ReservationStatus)
  status?: ReservationStatus;

  //
  // helpers
  //
  isSameReservationDate(reservationDate: string): boolean {
    return (
      moment(this.reservationDate).format(constants.dates.formatReservationDate) === reservationDate
    );
  }
}
