import { FinderDto, GetterByIdDto } from "@app/dtos";
import { RestaurantTablesService } from "./service";
export declare class RestaurantTablesController {
    private readonly restaurantTablesService;
    constructor(restaurantTablesService: RestaurantTablesService);
    find(restaurantId: string, query: FinderDto): Promise<import("../../../entities").RestaurantTable[]>;
    getById(restaurantId: string, id: string, query: GetterByIdDto): Promise<import("../../../entities").RestaurantTable>;
}
