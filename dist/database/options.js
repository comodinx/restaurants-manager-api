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
exports.DatabaseOptions = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = __importDefault(require("../constants"));
const isDatabaseDebug = constants_1.default.trues.includes(String(process.env.DB_DEBUG).toLowerCase());
const isAutodiscover = constants_1.default.trues.includes(String(process.env.DB_AUTODISCOVER).toLowerCase());
const isPoolEnabled = constants_1.default.trues.includes(String(process.env.DB_POOL_ENABLED).toLowerCase());
const synchronize = constants_1.default.trues.includes(String(process.env.DB_SYNCHRONIZE).toLowerCase());
let DatabaseOptions = class DatabaseOptions {
    createSequelizeOptions() {
        const defaultHost = process.env.DB_HOST || "localhost";
        const defaultPort = +(process.env.DB_PORT || 3306);
        const defaultUser = process.env.DB_USER || "root";
        const defaultName = process.env.DB_NAME || constants_1.default.app.name;
        const defaultPass = process.env.DB_PASS || "secret";
        const defaultTimezone = process.env.DB_TIMEZONE || "+00:00";
        const models = [];
        let pool;
        if (isPoolEnabled) {
            const poolMax = +(process.env.DB_POOL_MAX_CONN || 10);
            const poolMin = +(process.env.DB_POOL_MIN_CONN || 0);
            const poolIdle = +(process.env.DB_POOL_IDLE || 10000);
            const poolAcquire = +(process.env.DB_POOL_ACQUIRE || 60000);
            const poolEvict = +(process.env.DB_POOL_EVICT || 1000);
            pool = {
                max: poolMax,
                min: poolMin,
                idle: poolIdle,
                acquire: poolAcquire,
                evict: poolEvict,
            };
        }
        if (isAutodiscover) {
            models.push(process.env.DB_ENTITIES_DIR || `${process.cwd()}/!(node_modules)/entities/!(index).js`);
        }
        return {
            database: defaultName,
            dialect: (process.env.DB_DIALECT || "mysql"),
            logging: isDatabaseDebug ? console.log : false,
            timezone: defaultTimezone,
            autoLoadModels: true,
            synchronize,
            models,
            replication: {
                read: [
                    {
                        host: process.env.DB_READ_HOST || defaultHost,
                        port: +(process.env.DB_READ_PORT || defaultPort),
                        username: process.env.DB_READ_USER || defaultUser,
                        password: process.env.DB_READ_PASS || defaultPass,
                    },
                ],
                write: {
                    host: process.env.DB_WRITE_HOST || defaultHost,
                    port: +(process.env.DB_WRITE_PORT || defaultPort),
                    username: process.env.DB_WRITE_USER || defaultUser,
                    password: process.env.DB_WRITE_PASS || defaultPass,
                },
            },
            define: {
                timestamps: false,
            },
            dialectOptions: {
                decimalNumbers: true,
            },
            pool,
        };
    }
};
DatabaseOptions = __decorate([
    (0, common_1.Injectable)()
], DatabaseOptions);
exports.DatabaseOptions = DatabaseOptions;
//# sourceMappingURL=options.js.map