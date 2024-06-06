import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { Model } from "@app/database";
import RestaurantTable from "./restaurantTable";

@Table({ tableName: "restaurants", timestamps: false })
export default class Restaurant extends Model<Restaurant> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  active: number;

  @Column
  description: string;

  @Column
  email?: string;

  @Column
  phone?: string;

  @Column
  address?: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt?: Date;

  //
  // relationships
  //

  @HasMany(() => RestaurantTable)
  tables?: RestaurantTable[];
}
