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
exports.Model = void 0;
require("reflect-metadata");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const helpers_1 = require("../helpers");
class Model extends sequelize_typescript_1.Model {
    static async afterFindHook(models, options) {
        if (!models) {
            return;
        }
        models = Array.isArray(models) ? models : [models];
        for (const model of models) {
            if (!model) {
                continue;
            }
            if (options.include && options.include.length) {
                await Model.resolveIncludes(model, options);
            }
        }
    }
    static async resolveIncludes(model, findOptions) {
        const relations = findOptions.relations || {};
        for (const includeOptions of findOptions.include) {
            const include = includeOptions.as;
            const related = model[include];
            if (related && includeOptions.model.afterFindHook) {
                await includeOptions.model.afterFindHook(related, relations[include] || {});
            }
        }
    }
    static async findByQueryFilters(entityClass, query = {}) {
        const opts = await this.queryToFindOptions(query);
        return entityClass.findAll(opts);
    }
    static async getByIdAndQueryFilters(entityClass, id, query = {}, field = "id") {
        const opts = await this.queryToFindOptions(query);
        opts.where = opts.where || {};
        opts.where[field] = opts.where[field] || {};
        opts.where[field][sequelize_1.Op.eq] = id;
        return entityClass.findOne(opts);
    }
    static async queryToFindOptions(query = {}) {
        return (0, helpers_1.queryParse)(query);
    }
}
__decorate([
    sequelize_typescript_1.AfterFind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Model, "afterFindHook", null);
exports.Model = Model;
//# sourceMappingURL=model.js.map