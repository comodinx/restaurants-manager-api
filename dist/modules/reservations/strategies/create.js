"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationStrategy = void 0;
const moment_1 = __importDefault(require("moment"));
const common_1 = require("@nestjs/common");
const entities_1 = require("../../../entities");
const constants_1 = __importDefault(require("../../../constants"));
const helpers_1 = require("../../../helpers");
class CreateReservationStrategy {
    async create(data) {
        const context = { ...data };
        await this.validate(context);
        await this.populate(context);
        return await this.createReservation(context);
    }
    async validate(context) {
        await this.validateDate(context);
        await this.validateTable(context);
        await this.validateReservation(context);
        return context;
    }
    async validateDate(context) {
        const now = (0, moment_1.default)().startOf("day");
        const reservationDate = (0, moment_1.default)(context.reservationDate, constants_1.default.dates.formatReservationDate).startOf("day");
        if (reservationDate.isBefore(now)) {
            throw new common_1.HttpException({
                message: "La fecha de reserva no puede ser menor a la fecha de hoy",
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                extra: {
                    code: "INVALID_RESERVATION_DATE",
                },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return context;
    }
    async validateTable(context) {
        const opts = {
            where: {
                id: context.tableId,
                restaurantId: context.restaurantId,
            },
        };
        const table = await entities_1.RestaurantTable.findOne(opts);
        if (!table) {
            throw new common_1.HttpException({
                message: "La mesa solicitada no existe",
                statusCode: common_1.HttpStatus.NOT_FOUND,
                extra: {
                    code: "RESTAURANT_TABLE_NOT_FOUND",
                    tableId: context.tableId,
                    restaurantId: context.restaurantId,
                },
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (table.capacity < context.numGuests) {
            throw new common_1.HttpException({
                message: `El número de invitados supera el máximo permitido (${table.capacity}).`,
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                extra: {
                    code: "INVALID_NUM_GUESTS",
                    tableId: context.tableId,
                    restaurantId: context.restaurantId,
                    capacity: table.capacity,
                    numGuests: context.numGuests,
                },
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        context.table = table;
        return context;
    }
    async validateReservation(context) {
        const opts = {
            attributes: ["id", "customerId", "statusId"],
            where: {
                tableId: context.tableId,
                reservationDate: context.reservationDate,
            },
        };
        const reservation = await entities_1.Reservation.findOne(opts);
        if (reservation && reservation.statusId !== constants_1.default.reservations.statuses.cancelled) {
            await this.validateCustomer(context, reservation);
            throw new common_1.HttpException({
                message: "Ya existe una reserva para la fecha seleccionada",
                statusCode: common_1.HttpStatus.CONFLICT,
                extra: {
                    code: "DATE_ALREADY_RESERVED",
                    reservationId: reservation.id,
                    customerId: reservation.customerId,
                    statusId: reservation.statusId,
                },
            }, common_1.HttpStatus.CONFLICT);
        }
        return context;
    }
    async validateCustomer(context, reservation) {
        await this.populateCustomer(context, false);
        if (context.customer?.id === reservation.customerId) {
            throw new common_1.HttpException({
                message: "La reserva ya se encuentra registrada para el cliente",
                statusCode: common_1.HttpStatus.CONFLICT,
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
            }, common_1.HttpStatus.CONFLICT);
        }
        return context;
    }
    async populate(context) {
        await this.populateCustomer(context);
        return context;
    }
    async populateCustomer(context, createIfNotExists = true) {
        const opts = {
            where: {},
        };
        if (context.customerId) {
            opts.where.id = context.customerId;
        }
        else if (context.email) {
            opts.where.email = context.email;
        }
        else if (context.phone) {
            opts.where.phone = context.phone;
        }
        let customer = await entities_1.Customer.findOne(opts);
        if (customer && !customer.active) {
            throw new common_1.HttpException({
                message: "El cliente no se encuentra habilitado",
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                extra: {
                    code: "INVALID_CUSTOMER",
                    status: "inactive",
                },
            }, common_1.HttpStatus.UNAUTHORIZED);
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
    async createCustomer(context) {
        const data = {
            active: 1,
            description: context.name || (context.email ? context.email.split("@")[0] : null) || "anonymous",
            email: context.email || null,
            phone: context.phone || null,
        };
        return await entities_1.Customer.create(data);
    }
    async updateCustomer(context) {
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
        }
        catch (e) {
            helpers_1.logger.warn(`An error occurred while trying to update the client. ${e}`);
        }
        return context;
    }
    async createReservation(context) {
        const data = {
            statusId: constants_1.default.reservations.statuses.reserved,
            tableId: context.tableId,
            customerId: context.customer.id,
            reservationDate: context.reservationDate,
            numGuests: context.numGuests,
        };
        return await entities_1.Reservation.create(data);
    }
}
exports.CreateReservationStrategy = CreateReservationStrategy;
//# sourceMappingURL=create.js.map