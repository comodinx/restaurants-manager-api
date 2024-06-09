"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.name = void 0;
const pkg = require(`${process.cwd()}/package.json`);
exports.name = process.env.APP_NAME || pkg.name || "application";
exports.version = process.env.APP_VERSION || pkg.version || "0.0.1";
//# sourceMappingURL=app.js.map