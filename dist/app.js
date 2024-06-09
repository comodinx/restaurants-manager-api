"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const server_1 = require("./server");
const app_module_1 = require("./app.module");
const logger_1 = require("./helpers/logger");
const constants_1 = __importDefault(require("./constants"));
class App {
    async bootstrap() {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        this.setupMiddlewares(app);
        await this.listen(app);
        this.log(app);
        return app;
    }
    setupMiddlewares(app) {
        app.useGlobalFilters(new server_1.ExceptionsFilter());
        const directives = helmet_1.default.contentSecurityPolicy.getDefaultDirectives();
        delete directives["upgrade-insecure-requests"];
        app.use((0, helmet_1.default)({
            contentSecurityPolicy: {
                directives,
            },
        }));
        app.use((0, cookie_parser_1.default)());
        app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
        app.enableCors();
        return app;
    }
    async listen(app) {
        await app.listen(constants_1.default.server.port);
        return app;
    }
    async log(app) {
        const url = await app.getUrl();
        logger_1.logger.info(`Restaurant Manager API v${constants_1.default.app.version}`);
        logger_1.logger.info(`Application is running on: ${url}`);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map