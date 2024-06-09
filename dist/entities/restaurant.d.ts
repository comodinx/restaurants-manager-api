import { Model } from "@app/database";
import RestaurantTable from "./restaurantTable";
export default class Restaurant extends Model<Restaurant> {
    id: number;
    active: number;
    description: string;
    email?: string;
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt?: Date;
    tables?: RestaurantTable[];
}
