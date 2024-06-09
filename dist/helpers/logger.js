"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger_1 = require("@tsed/logger");
const name = process.env.LOGGER_NAME || process.env.APP_NAME || "app";
const level = process.env.LOGGER_LEVEL || "debug";
exports.logger = new logger_1.Logger(name);
exports.logger.appenders.set("console-log", {
    type: "console",
    level,
});
//# sourceMappingURL=logger.js.map