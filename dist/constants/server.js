"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthPath = exports.port = void 0;
exports.port = +(process.env.SERVER_PORT || process.env.PORT || 3030);
exports.healthPath = process.env.SERVER_HEALTH_PATH || process.env.HEALTH_PATH || "/health";
//# sourceMappingURL=server.js.map