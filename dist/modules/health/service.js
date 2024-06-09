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
exports.HealthService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const constants_1 = __importDefault(require("../../constants"));
let HealthService = class HealthService {
    constructor(database, health) {
        this.database = database;
        this.health = health;
    }
    async check(include = "") {
        const res = {
            alive: true,
            name: constants_1.default.app.name,
            version: constants_1.default.app.version,
            environment: constants_1.default.env,
        };
        try {
            const indicators = [];
            await this.resolveDatabase(include, indicators);
            await this.normalizeIndicators(res, indicators);
        }
        catch (e) {
            await this.normalizeError(res, e);
        }
        return res;
    }
    async resolveDatabase(include, indicators) {
        if (!include.includes("database")) {
            return;
        }
        indicators.push(() => this.database.pingCheck("database", {
            timeout: 2000,
        }));
    }
    async normalizeIndicators(res, indicators) {
        if (indicators && indicators.length) {
            const checks = await this.health.check(indicators);
            res.info = checks.info;
            await this.normalizeDetails(res, checks.details);
            if (checks.error && Object.keys(checks.error).length) {
                res.error = checks.error;
            }
        }
    }
    async normalizeError(res, e) {
        const checksError = (e && e.response) || null;
        if (checksError) {
            res.alive = false;
            res.info = checksError.info;
            await this.normalizeDetails(res, checksError.details);
            if (checksError.error && Object.keys(checksError.error).length) {
                res.error = checksError.error;
            }
        }
        else {
            res.alive = false;
            res.status = "error";
            res.error = `${e}`;
        }
    }
    async normalizeDetails(res, details) {
        if (!details) {
            return;
        }
        const normalizedDetails = Object.keys(details).reduce((acc, key) => {
            const detail = details[key];
            if (((0, lodash_1.isString)(detail.status) && detail.status !== "up" && detail.status !== "ok") ||
                (detail.alive != null && !detail.alive)) {
                acc[key] = detail;
            }
            return acc;
        }, {});
        if (Object.keys(normalizedDetails).length) {
            res.details = normalizedDetails;
            res.alive = false;
        }
    }
};
HealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [terminus_1.SequelizeHealthIndicator,
        terminus_1.HealthCheckService])
], HealthService);
exports.HealthService = HealthService;
//# sourceMappingURL=service.js.map