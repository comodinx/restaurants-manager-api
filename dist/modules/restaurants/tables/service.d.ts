import { RestaurantTable } from "@app/entities";
import { FinderDto, GetterByIdDto } from "@app/dtos";
export declare class RestaurantTablesService {
    find(restaurantId: number, options: FinderDto): Promise<RestaurantTable[]>;
    getById(restaurantId: number, id: number, options?: GetterByIdDto): Promise<RestaurantTable | undefined | null>;
}
