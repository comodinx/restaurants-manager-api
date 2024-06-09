"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantTablesService = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../../entities");
let RestaurantTablesService = class RestaurantTablesService {
    async find(restaurantId, options) {
        const opts = await entities_1.RestaurantTable.queryToFindOptions(options);
        opts.where = opts.where || {};
        opts.where.restaurantId = opts.where.restaurantId || {};
        opts.where.restaurantId[sequelize_1.Op.eq] = restaurantId;
        return entities_1.RestaurantTable.findByQueryFilters(entities_1.RestaurantTable, options);
    }
    async getById(restaurantId, id, options = {}) {
        const opts = await entities_1.RestaurantTable.queryToFindOptions(options);
        opts.where = opts.where || {};
        opts.where.id = opts.where.id || {};
        opts.where.id[sequelize_1.Op.eq] = id;
        opts.where.restaurantId = opts.where.restaurantId || {};
        opts.where.restaurantId[sequelize_1.Op.eq] = restaurantId;
        return entities_1.RestaurantTable.findOne(opts);
    }
};
RestaurantTablesService = __decorate([
    (0, common_1.Injectable)()
], RestaurantTablesService);
exports.RestaurantTablesService = RestaurantTablesService;
//# sourceMappingURL=service.js.map