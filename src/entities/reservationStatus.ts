import { Table, Column, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Model } from "@app/database";

@Table({ tableName: "reservation_statuses", timestamps: false })
export default class ReservationStatus extends Model<ReservationStatus> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  description: string;
}
