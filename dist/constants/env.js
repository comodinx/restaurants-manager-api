"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProd = exports.env = void 0;
exports.env = process.env.NODE_ENV || "development";
exports.isProd = ["prod", "production"].includes(String(exports.env).toLowerCase());
//# sourceMappingURL=env.js.map