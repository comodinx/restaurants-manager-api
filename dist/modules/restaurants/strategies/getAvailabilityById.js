"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailabilityByIdStrategy = void 0;
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../../entities");
const constants_1 = __importDefault(require("../../../constants"));
const maxDaysDiff = 30;
class GetAvailabilityByIdStrategy {
    async get(id, options) {
        const context = { id, ...options };
        await this.validate(context);
        await this.populate(context);
        return await this.resolve(context);
    }
    async validate(context) {
        await this.validateDate(context);
        return context;
    }
    async validateDate(context) {
        context.endDate = context.endDate || context.startDate;
        const startDate = (0, moment_1.default)(context.startDate, constants_1.default.dates.formatReservationDate).startOf("day");
        const endDate = (0, moment_1.default)(context.endDate, constants_1.default.dates.formatReservationDate).startOf("day");
        if (startDate.isAfter(endDate)) {
            throw new common_1.HttpException({
                message: "La fecha de inicio es mayor a la fecha de fin",
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                extra: {
                    code: "INVALID_START_DATE",
                    startDate: context.startDate,
                    endDate: context.endDate,
                },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const dayDiff = endDate.diff(startDate, "days") + 1;
        if (dayDiff > maxDaysDiff) {
            throw new common_1.HttpException({
                message: `La fecha de inicio esta a más de ${maxDaysDiff} días de la fecha de finalización. Excede el límite permitido para la consulta`,
                statusCode: common_1.HttpStatus.CONFLICT,
                extra: {
                    code: "DAYS_DIFFERENCE_EXCEEDED",
                    startDate: context.startDate,
                    endDate: context.endDate,
                    maxDaysDiff,
                },
            }, common_1.HttpStatus.CONFLICT);
        }
        context.startDateMoment = startDate;
        context.endDateMoment = endDate;
        context.dayDiff = dayDiff;
        return context;
    }
    async populate(context) {
        await this.populateRestaurant(context);
        return context;
    }
    async populateRestaurant(context) {
        const opts = {
            include: ["tables"],
            where: {
                id: context.id,
            },
        };
        const restaurant = await entities_1.Restaurant.findOne(opts);
        if (!restaurant || !restaurant.active) {
            throw new common_1.HttpException({
                message: "El restaurant solicitado no existe",
                statusCode: common_1.HttpStatus.NOT_FOUND,
                extra: {
                    code: "NOT_FOUND",
                    restaurantId: context.id,
                    status: restaurant?.active,
                },
            }, common_1.HttpStatus.NOT_FOUND);
        }
        context.restaurant = restaurant;
        return context;
    }
    async resolve(context) {
        const reservations = await this.findReservations(context);
        const timelines = await this.generateTimelines(context, reservations);
        const result = { timelines };
        if (context.includeRestaurant) {
            result.restaurant = context.restaurant;
        }
        return result;
    }
    async findReservations(context) {
        const opts = {
            where: {
                tableId: context.restaurant.tables.map((table) => table.id),
                statusId: [
                    constants_1.default.reservations.statuses.reserved,
                    constants_1.default.reservations.statuses.confirmed,
                ],
            },
        };
        if (context.startDate === context.endDate) {
            opts.where.reservationDate = context.startDate;
        }
        else {
            opts.where.reservationDate = {
                [sequelize_1.Op.gte]: context.startDate,
                [sequelize_1.Op.lte]: context.endDate,
            };
        }
        return await entities_1.Reservation.findAll(opts);
    }
    async generateTimelines(context, reservations) {
        const timeline = {
            [context.startDate]: [],
        };
        timeline[context.startDate] = this.generateTimelineEntries(context, context.startDateMoment, reservations);
        for (let i = 1; i < context.dayDiff; i++) {
            const nextDate = (0, moment_1.default)(context.startDateMoment).add(i, "day").startOf("day");
            timeline[nextDate.format(constants_1.default.dates.formatReservationDate)] =
                this.generateTimelineEntries(context, nextDate, reservations);
        }
        return timeline;
    }
    generateTimelineEntries(context, date, reservations) {
        const entries = [];
        const reservationDate = date.format(constants_1.default.dates.formatReservationDate);
        context.restaurant.tables.forEach((table) => {
            const reservation = reservations.find((reservation) => reservation.isSameReservationDate(reservationDate) && reservation.tableId === table.id);
            if (!reservation) {
                entries.push({
                    tableId: table.id,
                    available: true,
                });
            }
            else if (context.includeNotAvailables) {
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
exports.GetAvailabilityByIdStrategy = GetAvailabilityByIdStrategy;
//# sourceMappingURL=getAvailabilityById.js.map