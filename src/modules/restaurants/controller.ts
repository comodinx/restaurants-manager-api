import { Controller, Query, Get, Param, HttpException, HttpStatus } from "@nestjs/common";
import { FinderDto, GetterByIdDto } from "@app/dtos";
import { isInteger } from "@app/helpers";
import { RestaurantsService } from "./service";

//
// class
//

@Controller("/restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  //
  // endpoints
  //

  /**
   * Find all or filtered
   */
  @Get()
  async find(@Query() query: FinderDto) {
    return await this.restaurantsService.find(query);
  }

  /**
   * Get by ID
   */
  @Get(":id")
  async getById(@Param("id") id: string, @Query() query: GetterByIdDto) {
    if (!id || !isInteger(id)) {
      throw new HttpException("Invalid ID", HttpStatus.BAD_REQUEST);
    }

    const result = await this.restaurantsService.getById(Number(id), query);

    if (!result) {
      throw new HttpException("Restaurant not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
