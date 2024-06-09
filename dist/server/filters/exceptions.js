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
exports.ExceptionsFilter = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logger_1 = require("../../helpers/logger");
const constants_1 = __importDefault(require("../../constants"));
const INTERNAL_SERVER_ERROR = constants_1.default.http.codes.INTERNAL_SERVER_ERROR;
const defaultOptions = {
    error: "InternalServerError",
    message: "Internal Server Error",
    code: INTERNAL_SERVER_ERROR,
};
const httpValidCodes = Object.values(constants_1.default.http.codes);
let ExceptionsFilter = class ExceptionsFilter extends core_1.BaseExceptionFilter {
    async catch(error, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const context = {
            options: defaultOptions,
            error,
            res,
        };
        let exception;
        if (error instanceof common_1.HttpException) {
            logger_1.logger.error(error, constants_1.default.isProd ? "" : error.stack || "");
            exception = error;
            if (exception.response && !(0, lodash_1.isString)(exception.response)) {
                exception.response.extra = {
                    ...(exception.response.extra || exception.response),
                };
            }
        }
        else if (this.isErrorInError(error)) {
            exception = this.transformErrorInError(context);
        }
        else if (this.isAxiosError(error)) {
            exception = this.transformAxiosError(context);
        }
        else {
            const message = (error && error.message) || context.options.message;
            const status = (error && (error.code || error.statusCode)) ||
                context.options.code ||
                INTERNAL_SERVER_ERROR;
            const extra = (0, lodash_1.merge)({}, (error && error.extra) || {}, context.options.extra || {});
            logger_1.logger.error(message, status, constants_1.default.isProd ? "" : error.stack || "");
            exception = new common_1.HttpException({ message, extra }, status);
        }
        const responseStatusCode = httpValidCodes.includes(exception.getStatus())
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(responseStatusCode).json({
            path: req.url,
            statusCode: responseStatusCode,
            rawStatusCode: exception.getStatus(),
            message: exception.message,
            errors: exception.response?.message,
            extra: exception.response?.extra,
        });
    }
    isErrorInError(error) {
        return (error &&
            error.error &&
            ((0, lodash_1.isString)(error.error.error) || (0, lodash_1.isString)(error.error.message)) &&
            ((0, lodash_1.isNumber)(error.error.code) ||
                (0, lodash_1.isNumber)(error.error.status) ||
                (0, lodash_1.isNumber)(error.error.statusCode)));
    }
    transformErrorInError({ error, options }) {
        const realError = error.error;
        const message = realError.error || realError.message;
        const extra = {
            ...realError.extra,
            ...options.extra,
        };
        return this.transformError(realError, message, extra, error.stack ? error : realError);
    }
    isAxiosError(error) {
        return error && error.isAxiosError;
    }
    transformAxiosError({ error, options }) {
        const realError = error.response?.data || {};
        const message = realError.error || realError.message || realError;
        const extra = {
            ...realError.extra,
            ...options.extra,
            ...error.extra,
        };
        return this.transformError((0, lodash_1.isString)(realError) ? error.response : realError, message, extra, error.stack ? error : realError);
    }
    transformError(error, message, extra, debugableError) {
        if (error.code && httpValidCodes.includes(Number(error.code))) {
            logger_1.logger.error(debugableError, error.code, constants_1.default.isProd ? "" : error.stack || "");
            return new common_1.HttpException({ message, extra }, error.code);
        }
        if (error.status && httpValidCodes.includes(Number(error.status))) {
            logger_1.logger.error(debugableError, error.status, constants_1.default.isProd ? "" : error.stack || "");
            return new common_1.HttpException({ message, extra }, error.status);
        }
        if (error.statusCode && httpValidCodes.includes(Number(error.statusCode))) {
            logger_1.logger.error(debugableError, error.statusCode, constants_1.default.isProd ? "" : error.stack || "");
            return new common_1.HttpException({ message, extra }, error.statusCode);
        }
        logger_1.logger.error(debugableError, error.code || error.status || error.statusCode || INTERNAL_SERVER_ERROR, constants_1.default.isProd ? "" : error.stack || "");
        return new common_1.HttpException({ message, extra }, error.code || error.status || error.statusCode || INTERNAL_SERVER_ERROR);
    }
};
ExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], ExceptionsFilter);
exports.ExceptionsFilter = ExceptionsFilter;
//# sourceMappingURL=exceptions.js.map