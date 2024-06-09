import { Model } from "@app/database";
import Restaurant from "./restaurant";
export default class RestaurantTable extends Model<RestaurantTable> {
    id: number;
    restaurantId: number;
    capacity: number;
    observations?: string;
    createdAt: Date;
    updatedAt?: Date;
    restaurant?: Restaurant;
}
