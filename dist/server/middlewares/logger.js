"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("../../helpers/logger");
const constants_1 = __importDefault(require("../../constants"));
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const { method, originalUrl, url } = req;
        const startAt = process.hrtime();
        res.on("close", () => {
            const responseTime = this.getResponseTime(startAt);
            const time = responseTime ? ` ${responseTime} ms` : "";
            const status = res.statusCode ? ` ${res.statusCode}` : "";
            const realContentLength = res.getHeader("content-length");
            const contentLength = this.headersSent(res) && realContentLength ? ` - ${realContentLength}` : "";
            if (req.path === constants_1.default.server.healthPath) {
                return;
            }
            logger_1.logger.info(`${method} ${originalUrl || url}${status}${time}${contentLength || ""}`);
        });
        next();
    }
    getResponseTime(startAt) {
        const elapsed = process.hrtime(startAt);
        const ms = elapsed[0] * 1e3 + elapsed[1] * 1e-6;
        return ms.toFixed(3);
    }
    headersSent(res) {
        return typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent;
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.js.map