import { Controller, Query, Get, Param, HttpException, HttpStatus } from "@nestjs/common";
import { FinderDto, GetterByIdDto } from "@app/dtos";
import { isInteger } from "@app/helpers";
import { RestaurantTablesService } from "./service";

//
// class
//

@Controller("/restaurants/:restaurantId/tables")
export class RestaurantTablesController {
  constructor(private readonly restaurantTablesService: RestaurantTablesService) {}

  //
  // endpoints
  //

  /**
   * Find all or filtered
   */
  @Get()
  async find(@Param("restaurantId") restaurantId: string, @Query() query: FinderDto) {
    if (!restaurantId || !isInteger(restaurantId)) {
      throw new HttpException("Invalid Restaurant ID", HttpStatus.BAD_REQUEST);
    }

    return await this.restaurantTablesService.find(Number(restaurantId), query);
  }

  /**
   * Get by ID
   */
  @Get(":id")
  async getById(
    @Param("restaurantId") restaurantId: string,
    @Param("id") id: string,
    @Query() query: GetterByIdDto
  ) {
    if (!restaurantId || !isInteger(restaurantId)) {
      throw new HttpException("Invalid Restaurant ID", HttpStatus.BAD_REQUEST);
    }
    if (!id || !isInteger(id)) {
      throw new HttpException("Invalid ID", HttpStatus.BAD_REQUEST);
    }

    const result = await this.restaurantTablesService.getById(
      Number(restaurantId),
      Number(id),
      query
    );

    if (!result) {
      throw new HttpException("Restaurant Table not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
