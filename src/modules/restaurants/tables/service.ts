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
   * @param options {FinderDto} Query options
   *
   * @return {Promise<RestaurantTable[]>} Result of find restaurant tables
   */
  async find(restaurantId: number, options: FinderDto): Promise<RestaurantTable[]> {
    const opts: any = await RestaurantTable.queryToFindOptions(options);

    opts.where = opts.where || {};
    opts.where.restaurantId = opts.where.restaurantId || {};
    opts.where.restaurantId[Op.eq] = restaurantId;

    return RestaurantTable.findByQueryFilters(RestaurantTable, options);
  }

  /**
   * Get by ID
   *
   * @param restaurantId {number} Unique Restaurant Identifier
   * @param id {number} Unique Restaurant Table Identifier
   * @param options {GetterByIdDto} Query options
   *
   * @return {Promise<RestaurantTable | undefined | null>} Result of get restaurant table by ID
   */
  async getById(
    restaurantId: number,
    id: number,
    options: GetterByIdDto = {}
  ): Promise<RestaurantTable | undefined | null> {
    const opts: any = await RestaurantTable.queryToFindOptions(options);

    opts.where = opts.where || {};
    opts.where.id = opts.where.id || {};
    opts.where.id[Op.eq] = id;
    opts.where.restaurantId = opts.where.restaurantId || {};
    opts.where.restaurantId[Op.eq] = restaurantId;

    return RestaurantTable.findOne(opts);
  }
}
