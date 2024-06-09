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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
const strategies_1 = require("./strategies");
let RestaurantsService = class RestaurantsService {
    constructor(getAvailabilityByIdStrategy) {
        this.getAvailabilityByIdStrategy = getAvailabilityByIdStrategy;
    }
    async find(options) {
        return entities_1.Restaurant.findByQueryFilters(entities_1.Restaurant, options);
    }
    async getById(id, options = {}) {
        return entities_1.Restaurant.getByIdAndQueryFilters(entities_1.Restaurant, id, options);
    }
    async getAvailabilityById(id, options) {
        return this.getAvailabilityByIdStrategy.get(id, options);
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [strategies_1.GetAvailabilityByIdStrategy])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=service.js.map