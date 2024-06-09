"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const tables_1 = require("./tables");
const strategies_1 = require("./strategies");
let RestaurantsModule = class RestaurantsModule {
};
RestaurantsModule = __decorate([
    (0, common_1.Module)({
        imports: [tables_1.RestaurantTablesModule],
        controllers: [controller_1.RestaurantsController],
        providers: [
            service_1.RestaurantsService,
            strategies_1.GetAvailabilityByIdStrategy,
        ],
        exports: [service_1.RestaurantsService],
    })
], RestaurantsModule);
exports.RestaurantsModule = RestaurantsModule;
//# sourceMappingURL=module.js.map