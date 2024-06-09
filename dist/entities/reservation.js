"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = require("../database");
const constants_1 = __importDefault(require("../constants"));
const customer_1 = __importDefault(require("./customer"));
const restaurantTable_1 = __importDefault(require("./restaurantTable"));
const reservationStatus_1 = __importDefault(require("./reservationStatus"));
let Reservation = class Reservation extends database_1.Model {
    isSameReservationDate(reservationDate) {
        return ((0, moment_1.default)(this.reservationDate).format(constants_1.default.dates.formatReservationDate) === reservationDate);
    }
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "table_id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => restaurantTable_1.default),
    __metadata("design:type", Number)
], Reservation.prototype, "tableId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "customer_id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => customer_1.default),
    __metadata("design:type", Number)
], Reservation.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "reservation_status_id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => reservationStatus_1.default),
    __metadata("design:type", Number)
], Reservation.prototype, "statusId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "reservation_date", type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", Date)
], Reservation.prototype, "reservationDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "num_guests" }),
    __metadata("design:type", Number)
], Reservation.prototype, "numGuests", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ field: "created_at" }),
    __metadata("design:type", Date)
], Reservation.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
    __metadata("design:type", Date)
], Reservation.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => restaurantTable_1.default),
    __metadata("design:type", restaurantTable_1.default)
], Reservation.prototype, "table", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_1.default),
    __metadata("design:type", customer_1.default)
], Reservation.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => reservationStatus_1.default),
    __metadata("design:type", reservationStatus_1.default)
], Reservation.prototype, "status", void 0);
Reservation = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "reservations", timestamps: false })
], Reservation);
exports.default = Reservation;
//# sourceMappingURL=reservation.js.map