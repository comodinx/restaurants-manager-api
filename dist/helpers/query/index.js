"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParse = void 0;
const lodash_1 = require("lodash");
const pagination_1 = require("./pagination");
const filters_1 = require("./filters");
const include_1 = require("./include");
const fields_1 = require("./fields");
const order_1 = require("./order");
const group_1 = require("./group");
const orm_1 = require("./orm");
const mergeArrays = (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
    return;
};
const queryParse = (query, options = {}) => {
    const pagination = (0, pagination_1.pagination)(query, options);
    const filters = (0, filters_1.filters)(query, options);
    const fieldsOptions = (0, fields_1.fields)(query, options);
    const includeOptions = (0, include_1.include)(query, options);
    const orders = (0, order_1.order)(query, options);
    const groups = (0, group_1.group)(query);
    const opts = {};
    if (pagination) {
        opts.limit = pagination.limit;
        opts.offset = pagination.offset;
    }
    if (filters) {
        opts.where = filters;
    }
    if (fieldsOptions) {
        if (fieldsOptions.fields && fieldsOptions.fields.length) {
            opts.attributes = fieldsOptions.fields;
        }
        if (fieldsOptions.relations) {
            opts.relations = (0, lodash_1.mergeWith)(opts.relations || {}, fieldsOptions.relations, mergeArrays);
        }
    }
    if (includeOptions) {
        if (includeOptions.include && includeOptions.include.length) {
            opts.include = includeOptions.include;
        }
        if (includeOptions.relations) {
            opts.relations = (0, lodash_1.mergeWith)(opts.relations || {}, includeOptions.relations, mergeArrays);
        }
    }
    if (orders) {
        opts.order = orders;
    }
    if (groups && groups.length) {
        opts.group = groups;
    }
    if (query.includeRaw || options.includeRaw) {
        opts.rawQueryOptions = query;
    }
    return (0, orm_1.sequelizeParser)(opts);
};
exports.queryParse = queryParse;
//# sourceMappingURL=index.js.map