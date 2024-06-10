import moment from "moment";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Reservation, Customer, RestaurantTable } from "@app/entities";
import { CreateReservationDto } from "@app/dtos";
import constants from "@app/constants";
import { logger } from "@app/helpers";

//
// class
//
export class CreateReservationStrategy {
  //
  // public
  //

  /**
   * Create reservation
   *
   * @param data {CreateReservationDto} Creation data
   *
   * @return {Promise<Reservation>} Result of created reservation
   */
  async create(data: CreateReservationDto) {
    const context: any = { ...data };

    // 01 - Validamos todos los datos necesarios resolver la creación
    await this.validate(context);

    // 02 - Populamos todos los datos necesarios resolver la creación
    await this.populate(context);

    // 03 - Resolvemos la creación de la reserva
    return await this.createReservation(context);
  }

  //
  // private
  //

  /**
   * Validate all necesary data
   *
   * @param context {object} Current context
   *
   * @return {Promise<object>} Current context
   */
  private async validate(context: any) {
    await this.validateDate(context);
    await this.validateTable(context);
    await this.validateReservation(context);
    return context;
  }

  /**
   * Validate reservation date
   *
   * @param context {object} Current context
   *
   * @return {Promise<object>} Current context
   */
  private async validateDate(context: any) {
    const now = moment().startOf("day");
    const reservationDate = moment(
      context.reservationDate,
      constants.dates.formatReservationDate
    ).startOf("day");

    if (reservationDate.isBefore(now)) {
      throw new HttpException(
        {
          message: "La fecha de reserva no puede ser menor a la fecha de hoy",
          statusCode: HttpStatus.BAD_REQUEST,
          extra: {
            code: "INVALID_RESERVATION_DATE",
          },
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return context;
  }

  /**
   * Validate restaurant table
   *
   * @param context {object} Current context
   *
   * @return {Promise<object>} Current context
   */
  private async validateTable(context: any) {
    const opts: any = {
      where: {
        id: context.tableId,
        restaurantId: context.restaurantId,
      },
    };

    const table = await RestaurantTable.findOne(opts);

    if (!table) {
      throw new HttpException(
        {
          message: "La mesa solicitada no existe",
          statusCode: HttpStatus.NOT_FOUND,
          extra: {
            code: "RESTAURANT_TABLE_NOT_FOUND",
            tableId: context.tableId,
            restaurantId: context.restaurantId,
          },
        },
        HttpStatus.NOT_FOUND
      );
    }

    if (table.capacity < context.numGuests) {
      throw new HttpException(
        {
          message: `El número de invitados supera el máximo permitido (${table.capacity}).`,
          statusCode: HttpStatus.PRECONDITION_FAILED,
          extra: {
            code: "INVALID_NUM_GUESTS",
            tableId: context.tableId,
            restaurantId: context.restaurantId,
            capacity: table.capacity,
            numGuests: context.numGuests,
          },
        },
        HttpStatus.PRECONDITION_FAILED
      );
    }
    context.table = table;
    return context;
  }

  /**
   * Validate reservation collision
   *
   * @param context {object} Current context
   *
   * @return {Promise<object>} Current context
   */
  private async validateReservation(context: any) {
    const opts: any = {
      attributes: ["id", "customerId", "statusId"],
      where: {
        tableId: context.tableId,
        reservationDate: context.reservationDate,
      },
    };

    const reservation = await Reservation.findOne(opts);

    if (reservation && reservation.statusId !== constants.reservations.statuses.cancelled) {
      await this.validateCustomer(context, reservation);

      throw new HttpException(
        {
          message: "Ya existe una reserva para la fecha seleccionada",
          statusCode: HttpStatus.CONFLICT,
          extra: {
            code: "DATE_ALREADY_RESERVED",
            reservationId: reservation.id,
            customerId: reservation.customerId,
            statusId: reservation.statusId,
          },
        },
        HttpStatus.CONFLICT
      );
    }
    return context;
  }

  /**
   * Validate customer
   *
   * @param context {object} Current context
   * @param reservation {Reservation} Current Reservation
   *
   * @return {Promise<object>} Current context
   */
  private async validateCustomer(context: any, reservation: Reservation) {
    await this.populateCustomer(context, /* prevent customer creation if not exists */ false);

    if (context.customer?.id === reservation.customerId) {
      throw new HttpException(
        {
          message: "La reserva ya se encuentra registrada para el cliente",
          statusCode: HttpStatus.CONFLICT,
          extra: {
            code: "RESERVATION_ALREADY_EXISTS",
            customer: {
              id: context.customer?.id,
              name: context.customer?.description,
              email: context.customer?.email,
              phone: context.customer?.phone,
            },
            reservation,
          },
        },
        HttpStatus.CONFLICT
      );
    }
    return context;
  }

  /**
   * Populate all necesary data
   *
   * @param context {object} Current context
   *
   * @return {object} Current context
   */
  private async populate(context: any) {
    await this.populateCustomer(context);
    return context;
  }

  /**
   * Find or create customer
   *
   * @param context {object} Current context
   * @param createIfNotExists {boolean} Flag for indicate if is necesary create customer if not exists. Default `true`
   *
   * @return {Promise<object>} Current context
   */
  private async populateCustomer(context: any, createIfNotExists = true) {
    const opts: any = {
      where: {},
    };

    // Check which field we should use to search for customer
    if (context.customerId) {
      opts.where.id = context.customerId;
    } else if (context.email) {
      opts.where.email = context.email;
    } else if (context.phone) {
      opts.where.phone = context.phone;
    }

    let customer: any = await Customer.findOne(opts);

    if (customer && !customer.active) {
      throw new HttpException(
        {
          message: "El cliente no se encuentra habilitado",
          statusCode: HttpStatus.UNAUTHORIZED,
          extra: {
            code: "INVALID_CUSTOMER",
            status: "inactive",
          },
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    if (!customer && createIfNotExists) {
      customer = await this.createCustomer(context);
    }

    context.customer = customer;

    if (customer) {
      await this.updateCustomer(context);
    }
    return context;
  }

  /**
   * Create customer
   *
   * @param context {object} Current context
   *
   * @return {Promise<Customer>}
   */
  private async createCustomer(context: any) {
    const data: any = {
      active: 1,
      description:
        context.name || (context.email ? context.email.split("@")[0] : null) || "anonymous",
      email: context.email || null,
      phone: context.phone || null,
    };

    return await Customer.create(data);
  }

  /**
   * Update customer
   *
   * @param context {object} Current context
   *
   * @return {Promise<Customer>}
   */
  private async updateCustomer(context: any) {
    if (!context.customer) {
      return context;
    }

    try {
      let isNecesarySave = false;

      if (context.customer) {
        context.customer.set("description", context.name);
        isNecesarySave = true;
      }
      if (context.phone) {
        context.customer.set("phone", context.phone);
        isNecesarySave = true;
      }

      if (isNecesarySave) {
        await context.customer.save();
      }
    } catch (e) {
      logger.warn(`An error occurred while trying to update the client. ${e}`);
    }
    return context;
  }

  /**
   * Create reservation
   *
   * @param context {object} Current context
   *
   * @return {Promise<Reservation>}
   */
  private async createReservation(context: any) {
    const data: any = {
      statusId: constants.reservations.statuses.reserved,
      tableId: context.tableId,
      customerId: context.customer.id,
      reservationDate: context.reservationDate,
      numGuests: context.numGuests,
    };

    return await Reservation.create(data);
  }
}
