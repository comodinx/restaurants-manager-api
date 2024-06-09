"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const options_1 = require("./options");
exports.DatabaseModule = sequelize_1.SequelizeModule.forRootAsync({ useClass: options_1.DatabaseOptions });
//# sourceMappingURL=module.js.map