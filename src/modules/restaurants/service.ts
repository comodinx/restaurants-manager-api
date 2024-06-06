import { Injectable } from "@nestjs/common";
import { Restaurant } from "@app/entities";
import { FinderDto, GetterByIdDto, RestaurantAvailabilityDto } from "@app/dtos";
import { GetAvailabilityByIdStrategy } from "./strategies";

@Injectable()
export class RestaurantsService {
  constructor(private readonly getAvailabilityByIdStrategy: GetAvailabilityByIdStrategy) {}

  //
  // public
  //

  /**
   * Find all or filtered
   *
   * @param options {FinderDto} Query options
   *
   * @return {Promise<Restaurant[]>} Result of find restaurants
   */
  async find(options: FinderDto): Promise<Restaurant[]> {
    return Restaurant.findByQueryFilters(Restaurant, options);
  }

  /**
   * Get by ID
   *
   * @param id {number} Unique Restaurant Identifier
   * @param options {GetterByIdDto} Query options
   *
   * @return {Promise<Restaurant | undefined | null>} Result of get restaurant by ID
   */
  async getById(id: number, options: GetterByIdDto = {}): Promise<Restaurant | undefined | null> {
    return Restaurant.getByIdAndQueryFilters(Restaurant, id, options);
  }

  /**
   * Get restaurant availability by ID
   *
   * @param id {number} Unique Restaurant Identifier
   * @param options {RestaurantAvailabilityDto} Query options
   *
   * @return {Promise<object>} Result of get restaurant availability by ID
   */
  async getAvailabilityById(id: number, options: RestaurantAvailabilityDto): Promise<any> {
    return this.getAvailabilityByIdStrategy.get(id, options);
  }
}
