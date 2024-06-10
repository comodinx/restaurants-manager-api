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
exports.CreateReservationDto = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = __importDefault(require("../constants"));
class CreateReservationDto {
}
__decorate([
    (0, class_validator_1.IsDefined)({ message: "El restaurante es requerido." }),
    (0, class_validator_1.IsInt)({ message: "El restaurante no es válido." }),
    (0, class_validator_1.Min)(1, { message: "El ID del restaurante debe ser mayor a 0." }),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "restaurantId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: "La mesa es requerida." }),
    (0, class_validator_1.IsInt)({ message: "La mesa no es válida." }),
    (0, class_validator_1.Min)(1, { message: "El ID de la mesa debe ser mayor a 0." }),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "tableId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: "La fecha de reservación es requerida." }),
    (0, class_validator_1.IsString)({ message: "La fecha de reservación no es válida." }),
    (0, class_validator_1.Matches)(/\d\d\d\d-\d\d-\d\d/, {
        message: `La fecha de reservación no es válida (${constants_1.default.dates.formatReservationDate}).`,
    }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "reservationDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: "El ro de invitados es requerido." }),
    (0, class_validator_1.IsInt)({ message: "El número de invitados no es válido." }),
    (0, class_validator_1.Min)(1, { message: "El número de invitados debe ser mayor a 0." }),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "numGuests", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((self) => !self.email),
    (0, class_validator_1.IsInt)({ message: "El cliente no es válido." }),
    (0, class_validator_1.Min)(1, { message: "El ID del cliente debe ser mayor a 0." }),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((self) => !self.customerId),
    (0, class_validator_1.IsEmail)({}, { message: "El correo electrónico no es válido." }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2, { message: "El nombre del cliente no es válido (min. 2 caracteres)." }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)({}, { message: "El número de telefono no es válido." }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "phone", void 0);
exports.CreateReservationDto = CreateReservationDto;
//# sourceMappingURL=createReservation.js.map