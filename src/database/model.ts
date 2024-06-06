import "reflect-metadata";
import { Op } from "sequelize";
import { Model as BaseModel, AfterFind } from "sequelize-typescript";
import { FinderDto, GetterByIdDto } from "@app/dtos";
import { queryParse } from "@app/helpers";

//
// class
//
// @ts-ignore
export abstract class Model<T> extends BaseModel<T> {
  /**
   * Sequelize hook for before find function
   */
  @AfterFind
  static async afterFindHook(models: any, options: any) {
    if (!models) {
      return;
    }

    models = Array.isArray(models) ? models : [models];

    for (const model of models) {
      if (!model) {
        continue;
      }

      // Check if need resolve includes
      if (options.include && options.include.length) {
        await Model.resolveIncludes(model, options);
      }
    }
  }

  /**
   * Resolve include relationships
   */
  static async resolveIncludes(model: any, findOptions: any) {
    const relations = findOptions.relations || {};

    for (const includeOptions of findOptions.include) {
      const include = includeOptions.as;
      const related = model[include];

      if (related && includeOptions.model.afterFindHook) {
        await includeOptions.model.afterFindHook(related, relations[include] || {});
      }
    }
  }

  /**
   * Find all or filtered entities
   *
   * @param entityClass {Class<Model<T>>} Entity Class
   * @param query {FinderDto} Query options
   *
   * @return {Promise<Model[]>} Result of find models
   */
  // @ts-ignore
  static async findByQueryFilters(
    entityClass: any /* Class<Model<T>> */,
    query: FinderDto = {}
  ): Promise<any> {
    const opts: any = await this.queryToFindOptions(query);

    return entityClass.findAll(opts);
  }

  /**
   * Get entity by ID
   *
   * @param entityClass {Class<Model<T>>} Entity Class
   * @param id {any} Unique identifier
   * @param query {GetterByIdDto} Query options
   * @param field {string} Indicate primary key fields. Default is "id"
   *
   * @return {Promise<Model[]>} Result of find models
   */
  // @ts-ignore
  static async getByIdAndQueryFilters(
    entityClass: any /* Class<Model<T>> */,
    id: any,
    query: GetterByIdDto = {},
    field = "id"
  ): Promise<any | undefined | null> {
    const opts: any = await this.queryToFindOptions(query);

    opts.where = opts.where || {};
    opts.where[field] = opts.where[field] || {};
    opts.where[field][Op.eq] = id;

    return entityClass.findOne(opts);
  }

  /**
   * Transform query to find options
   *
   * @param query {FinderDto | GetterByIdDto} Query options
   *
   * @return {Promise<any>} Result of transform query on find options
   */
  // @ts-ignore
  static async queryToFindOptions(query: FinderDto | GetterByIdDto = {}): Promise<any> {
    return queryParse(query);
  }
}
