import "reflect-metadata";
import { Model as BaseModel, AfterFind } from "sequelize-typescript";

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
}
