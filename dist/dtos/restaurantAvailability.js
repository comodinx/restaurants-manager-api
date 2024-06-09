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
exports.RestaurantAvailabilityDto = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = __importDefault(require("../constants"));
class RestaurantAvailabilityDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ message: "La fecha de inicio no es válida." }),
    (0, class_validator_1.Matches)(/\d\d\d\d-\d\d-\d\d/, {
        message: `La fecha de inicio no es válida (${constants_1.default.dates.formatReservationDate}).`,
    }),
    __metadata("design:type", String)
], RestaurantAvailabilityDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La fecha de fin no es válida." }),
    (0, class_validator_1.Matches)(/\d\d\d\d-\d\d-\d\d/, {
        message: `La fecha de fin no es válida (${constants_1.default.dates.formatReservationDate}).`,
    }),
    __metadata("design:type", String)
], RestaurantAvailabilityDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)({}, { message: "El número de invitados no es válido." }),
    __metadata("design:type", String)
], RestaurantAvailabilityDto.prototype, "numGuests", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(constants_1.default.booleans),
    __metadata("design:type", String)
], RestaurantAvailabilityDto.prototype, "includeRestaurant", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(constants_1.default.booleans),
    __metadata("design:type", String)
], RestaurantAvailabilityDto.prototype, "includeNotAvailables", void 0);
exports.RestaurantAvailabilityDto = RestaurantAvailabilityDto;
//# sourceMappingURL=restaurantAvailability.js.map