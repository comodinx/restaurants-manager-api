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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantTablesController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../../../dtos");
const helpers_1 = require("../../../helpers");
const service_1 = require("./service");
let RestaurantTablesController = class RestaurantTablesController {
    constructor(restaurantTablesService) {
        this.restaurantTablesService = restaurantTablesService;
    }
    async find(restaurantId, query) {
        if (!restaurantId || !(0, helpers_1.isInteger)(restaurantId)) {
            throw new common_1.HttpException("Invalid Restaurant ID", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.restaurantTablesService.find(Number(restaurantId), query);
    }
    async getById(restaurantId, id, query) {
        if (!restaurantId || !(0, helpers_1.isInteger)(restaurantId)) {
            throw new common_1.HttpException("Invalid Restaurant ID", common_1.HttpStatus.BAD_REQUEST);
        }
        if (!id || !(0, helpers_1.isInteger)(id)) {
            throw new common_1.HttpException("Invalid ID", common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.restaurantTablesService.getById(Number(restaurantId), Number(id), query);
        if (!result) {
            throw new common_1.HttpException("Restaurant Table not found", common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("restaurantId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.FinderDto]),
    __metadata("design:returntype", Promise)
], RestaurantTablesController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("restaurantId")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, dtos_1.GetterByIdDto]),
    __metadata("design:returntype", Promise)
], RestaurantTablesController.prototype, "getById", null);
RestaurantTablesController = __decorate([
    (0, common_1.Controller)("/restaurants/:restaurantId/tables"),
    __metadata("design:paramtypes", [service_1.RestaurantTablesService])
], RestaurantTablesController);
exports.RestaurantTablesController = RestaurantTablesController;
//# sourceMappingURL=controller.js.map