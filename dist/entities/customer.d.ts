import { Model } from "@app/database";
export default class Customer extends Model<Customer> {
    id: number;
    active: number;
    description: string;
    email?: string;
    phone?: string;
    password?: string;
    createdAt: Date;
    updatedAt?: Date;
}
