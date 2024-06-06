import { Injectable } from "@nestjs/common";
import { Restaurant } from "@app/entities";
import { FinderDto, GetterByIdDto } from "@app/dtos";

@Injectable()
export class RestaurantsService {
  //
  // public
  //

  /**
   * Find all or filtered
   *
   * @param query {FinderDto} Query options
   *
   * @return {Promise<Restaurant[]>} Result of find restaurants
   */
  async find(query: FinderDto): Promise<Restaurant[]> {
    return Restaurant.findByQueryFilters(Restaurant, query);
  }

  /**
   * Get by ID
   *
   * @param id {number} Unique Restaurant Identifier
   * @param query {GetterByIdDto} Query options
   *
   * @return {Promise<Restaurant | undefined | null>} Result of get restaurant by ID
   */
  async getById(id: number, query: GetterByIdDto = {}): Promise<Restaurant | undefined | null> {
    return Restaurant.getByIdAndQueryFilters(Restaurant, id, query);
  }
}
