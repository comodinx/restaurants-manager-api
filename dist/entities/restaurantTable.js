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
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = require("../database");
const restaurant_1 = __importDefault(require("./restaurant"));
let RestaurantTable = class RestaurantTable extends database_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RestaurantTable.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "restaurant_id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => restaurant_1.default),
    __metadata("design:type", Number)
], RestaurantTable.prototype, "restaurantId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RestaurantTable.prototype, "capacity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RestaurantTable.prototype, "observations", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ field: "created_at" }),
    __metadata("design:type", Date)
], RestaurantTable.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
    __metadata("design:type", Date)
], RestaurantTable.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => restaurant_1.default),
    __metadata("design:type", restaurant_1.default)
], RestaurantTable.prototype, "restaurant", void 0);
RestaurantTable = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "restaurant_tables", timestamps: false })
], RestaurantTable);
exports.default = RestaurantTable;
//# sourceMappingURL=restaurantTable.js.map