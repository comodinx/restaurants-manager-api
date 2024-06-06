import { Op } from "sequelize";
import { Injectable } from "@nestjs/common";
import { RestaurantTable } from "@app/entities";
import { FinderDto, GetterByIdDto } from "@app/dtos";

@Injectable()
export class RestaurantTablesService {
  //
  // public
  //

  /**
   * Find all or filtered
   *
   * @param restaurantId {number} Unique Restaurant Identifier
   * @param query {FinderDto} Query options
   *
   * @return {Promise<RestaurantTable[]>} Result of find restaurant tables
   */
  async find(restaurantId: number, query: FinderDto): Promise<RestaurantTable[]> {
    const opts: any = await RestaurantTable.queryToFindOptions(query);

    opts.where = opts.where || {};
    opts.where.restaurantId = opts.where.restaurantId || {};
    opts.where.restaurantId[Op.eq] = restaurantId;

    return RestaurantTable.findByQueryFilters(RestaurantTable, query);
  }

  /**
   * Get by ID
   *
   * @param restaurantId {number} Unique Restaurant Identifier
   * @param id {number} Unique Restaurant Table Identifier
   * @param query {GetterByIdDto} Query options
   *
   * @return {Promise<RestaurantTable | undefined | null>} Result of get restaurant table by ID
   */
  async getById(
    restaurantId: number,
    id: number,
    query: GetterByIdDto = {}
  ): Promise<RestaurantTable | undefined | null> {
    const opts: any = await RestaurantTable.queryToFindOptions(query);

    opts.where = opts.where || {};
    opts.where.id = opts.where.id || {};
    opts.where.id[Op.eq] = id;
    opts.where.restaurantId = opts.where.restaurantId || {};
    opts.where.restaurantId[Op.eq] = restaurantId;

    return RestaurantTable.findOne(opts);
  }
}
