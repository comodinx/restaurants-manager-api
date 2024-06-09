import moment from "moment";
import { Op } from "sequelize";
import { HttpException, HttpStatus } from "@nestjs/common";
import { RestaurantAvailabilityDto } from "@app/dtos";
import { Reservation, Restaurant, RestaurantTable } from "@app/entities";
import constants from "@app/constants";

//
// constants
//
const maxDaysDiff = 30;

//
// class
//
export class GetAvailabilityByIdStrategy {
  //
  // public
  //

  /**
   * Get restaurant availability by ID
   *
   * @param id {number} Unique Restaurant Identifier
   * @param options {RestaurantAvailabilityDto} Find options
   *
   * @return {Promise<object>} Result of get restaurant availability by ID
   */
  async get(id: number, options: RestaurantAvailabilityDto): Promise<any> {
    const context: any = { id, ...options };

    // 01 - Validamos todos los datos necesarios resolver la busqueda
    await this.validate(context);

    // 02 - Populamos todos los datos necesarios resolver la busqueda
    await this.populate(context);

    // 03 - Resolvemos la busqueda de disponibilidad para el restaurante solicitado
    return await this.resolve(context);
  }

  //
  // private
  //

  /**
   * Prepare all necesary data
   *
   * @param context {object} Current context
   *
   * @returns {Promise<object>} Current context
   */
  private async validate(context) {
    await this.validateDate(context);
    return context;
  }

  /**
   * Prepare context
   *
   * @param context {object} Current context
   *
   * @returns {Promise<object>} Current context
   */
  private async validateDate(context) {
    context.endDate = context.endDate || context.startDate;

    const startDate = moment(context.startDate, constants.dates.formatReservationDate).startOf(
      "day"
    );
    const endDate = moment(context.endDate, constants.dates.formatReservationDate).startOf("day");

    if (startDate.isAfter(endDate)) {
      throw new HttpException(
        {
          message: "La fecha de inicio es mayor a la fecha de fin",
          statusCode: HttpStatus.BAD_REQUEST,
          extra: {
            code: "INVALID_START_DATE",
            startDate: context.startDate,
            endDate: context.endDate,
          },
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const dayDiff = endDate.diff(startDate, "days") + 1;

    if (dayDiff > maxDaysDiff) {
      throw new HttpException(
        {
          message: `La fecha de inicio esta a más de ${maxDaysDiff} días de la fecha de finalización. Excede el límite permitido para la consulta`,
          statusCode: HttpStatus.CONFLICT,
          extra: {
            code: "DAYS_DIFFERENCE_EXCEEDED",
            startDate: context.startDate,
            endDate: context.endDate,
            maxDaysDiff,
          },
        },
        HttpStatus.CONFLICT
      );
    }

    context.startDateMoment = startDate;
    context.endDateMoment = endDate;
    context.dayDiff = dayDiff;
    return context;
  }

  /**
   * Populate all necesary data
   *
   * @param context {object} Current context
   *
   * @returns {Promise<object>} Current context
   */
  private async populate(context) {
    await this.populateRestaurant(context);
    return context;
  }

  /**
   * Get restaurant by id, with your tables
   *
   * @param context {object} Current context
   *
   * @returns {Promise<object>} Current context
   */
  private async populateRestaurant(context) {
    const opts: any = {
      include: ["tables"],
      where: {
        id: context.id,
      },
    };

    const restaurant = await Restaurant.findOne(opts);

    if (!restaurant || !restaurant.active) {
      throw new HttpException(
        {
          message: "El restaurant solicitado no existe",
          statusCode: HttpStatus.NOT_FOUND,
          extra: {
            code: "NOT_FOUND",
            restaurantId: context.id,
            status: restaurant?.active,
          },
        },
        HttpStatus.NOT_FOUND
      );
    }

    context.restaurant = restaurant;
    return context;
  }

  /**
   * Resolve availability for the requested restaurant
   *
   * @param context {object} Current context
   *
   * @returns {Promise<object>} Current context
   */
  private async resolve(context) {
    const reservations = await this.findReservations(context);
    const timelines = await this.generateTimelines(context, reservations);
    const result: any = { timelines };

    if (context.includeRestaurant) {
      result.restaurant = context.restaurant;
    }

    return result;
  }

  /**
   * Search for reservations for restaurant tables, in the requested date range
   *
   * @param context {object} Current context
   *
   * @returns {Promise<object>} Current context
   */
  private async findReservations(context) {
    const opts: any = {
      where: {
        tableId: context.restaurant.tables.map((table: RestaurantTable) => table.id),
        statusId: [
          constants.reservations.statuses.reserved,
          constants.reservations.statuses.confirmed,
        ],
      },
    };

    if (context.startDate === context.endDate) {
      opts.where.reservationDate = context.startDate;
    } else {
      opts.where.reservationDate = {
        [Op.gte]: context.startDate,
        [Op.lte]: context.endDate,
      };
    }

    return await Reservation.findAll(opts);
  }

  /**
   * Generate timeline (availability), base on reservations and restaurant tables.
   *
   * @param context {object} Current context
   * @param reservations {Reservation[]} List of reservations for restaurant tables, in the requested date range
   *
   * @returns {Promise<object>} List of restaurant tables availables in the requested date range, grouped by date
   */
  private async generateTimelines(context, reservations: Reservation[]) {
    const timeline: any = {
      [context.startDate]: [],
    };

    timeline[context.startDate] = this.generateTimelineEntries(
      context,
      context.startDateMoment,
      reservations
    );

    for (let i = 1; i < context.dayDiff; i++) {
      const nextDate = moment(context.startDateMoment).add(i, "day").startOf("day");

      timeline[nextDate.format(constants.dates.formatReservationDate)] =
        this.generateTimelineEntries(context, nextDate, reservations);
    }

    return timeline;
  }

  /**
   * Generate timeline entries for selected date
   *
   * @param context {object} Current context
   * @param date {Moment} Selected date
   * @param reservations {Reservation[]} List of reservations for restaurant tables, in the requested date range
   *
   * @returns {Promise<object>} List of restaurant tables availables for the selected date
   */
  private generateTimelineEntries(context, date: moment.Moment, reservations: Reservation[]) {
    const entries: any = [];
    const reservationDate = date.format(constants.dates.formatReservationDate);

    context.restaurant.tables.forEach((table: RestaurantTable) => {
      const reservation = reservations.find(
        (reservation: Reservation) =>
          reservation.isSameReservationDate(reservationDate) && reservation.tableId === table.id
      );

      if (!reservation) {
        entries.push({
          tableId: table.id,
          available: true,
        });
      } else if (context.includeNotAvailables) {
        entries.push({
          tableId: table.id,
          available: false,
          reservation: {
            id: reservation.id,
            customerId: reservation.customerId,
          },
        });
      }
    });
    return entries;
  }
}
