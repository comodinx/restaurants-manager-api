import { SequelizeOptionsFactory, SequelizeModuleOptions } from "@nestjs/sequelize";
export declare class DatabaseOptions implements SequelizeOptionsFactory {
    createSequelizeOptions(): SequelizeModuleOptions;
}
