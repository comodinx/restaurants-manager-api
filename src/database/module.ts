import { SequelizeModule } from "@nestjs/sequelize";
import { DatabaseOptions } from "./options";

export const DatabaseModule = SequelizeModule.forRootAsync({ useClass: DatabaseOptions });
