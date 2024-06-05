import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { Model } from "@app/database";

@Table({ tableName: "customers", timestamps: false })
export default class Customer extends Model<Customer> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  active: number;

  @Column
  email?: string;

  @Column
  phone?: string;

  @Column
  password?: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt?: Date;
}
