import { FinderDto, GetterByIdDto, RestaurantAvailabilityDto } from "@app/dtos";
import { RestaurantsService } from "./service";
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    find(query: FinderDto): Promise<import("../../entities").Restaurant[]>;
    getAvailabilityById(id: string, query: RestaurantAvailabilityDto): Promise<any>;
    getById(id: string, query: GetterByIdDto): Promise<import("../../entities").Restaurant>;
}
