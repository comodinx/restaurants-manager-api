import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreateReservationDto, FinderDto, GetterByIdDto } from "@app/dtos";
import { isInteger } from "@app/helpers";
import { ReservationsService } from "./service";

//
// class
//

@Controller("/reservations")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  //
  // endpoints
  //

  /**
   * Find all or filtered
   */
  @Get()
  async find(@Query() query: FinderDto) {
    return await this.reservationsService.find(query);
  }

  /**
   * Get by ID
   */
  @Get(":id")
  async getById(@Param("id") id: string, @Query() query: GetterByIdDto) {
    if (!id || !isInteger(id)) {
      throw new HttpException("Invalid ID", HttpStatus.BAD_REQUEST);
    }

    const result = await this.reservationsService.getById(Number(id), query);

    if (!result) {
      throw new HttpException("Reservation not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }

  /**
   * Create
   */
  @Post()
  async create(@Body() body: CreateReservationDto) {
    return await this.reservationsService.create(body);
  }
}
