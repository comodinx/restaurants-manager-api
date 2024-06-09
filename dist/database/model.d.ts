import "reflect-metadata";
import { Model as BaseModel } from "sequelize-typescript";
import { FinderDto, GetterByIdDto } from "@app/dtos";
export declare abstract class Model<T> extends BaseModel<T> {
    static afterFindHook(models: any, options: any): Promise<void>;
    static resolveIncludes(model: any, findOptions: any): Promise<void>;
    static findByQueryFilters(entityClass: any, query?: FinderDto): Promise<any>;
    static getByIdAndQueryFilters(entityClass: any, id: any, query?: GetterByIdDto, field?: string): Promise<any | undefined | null>;
    static queryToFindOptions(query?: FinderDto | GetterByIdDto): Promise<any>;
}
