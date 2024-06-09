import { Restaurant } from "@app/entities";
import { FinderDto, GetterByIdDto, RestaurantAvailabilityDto } from "@app/dtos";
import { GetAvailabilityByIdStrategy } from "./strategies";
export declare class RestaurantsService {
    private readonly getAvailabilityByIdStrategy;
    constructor(getAvailabilityByIdStrategy: GetAvailabilityByIdStrategy);
    find(options: FinderDto): Promise<Restaurant[]>;
    getById(id: number, options?: GetterByIdDto): Promise<Restaurant | undefined | null>;
    getAvailabilityById(id: number, options: RestaurantAvailabilityDto): Promise<any>;
}
