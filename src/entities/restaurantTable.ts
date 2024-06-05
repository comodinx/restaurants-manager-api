import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Model } from "@app/database";
import Restaurant from "./restaurant";

@Table({ tableName: "restaurant_tables", timestamps: false })
export default class RestaurantTable extends Model<RestaurantTable> {
  //
  // properties
  //

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({ field: "restaurant_id" })
  @ForeignKey(() => Restaurant)
  restaurantId: number;

  @Column
  capacity: number;

  @Column
  observations?: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt?: Date;

  //
  // relationships
  //

  @BelongsTo(() => Restaurant)
  restaurant?: Restaurant;
}
