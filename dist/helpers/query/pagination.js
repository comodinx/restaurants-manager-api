"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const lodash_1 = require("lodash");
const defaultPageSize = 0;
const getDefaultPageSize = (options) => {
    if ((0, lodash_1.isNumber)(options)) {
        return options;
    }
    return ((0, lodash_1.isObject)(options) ? options.pageSize : defaultPageSize) || defaultPageSize;
};
const pagination = (query, options) => {
    if (!query) {
        return;
    }
    const pageSize = Number(query.page_size || query.pageSize || getDefaultPageSize(options));
    const page = Number(query.page || 1) - 1;
    if (!pageSize) {
        return;
    }
    return {
        limit: pageSize,
        offset: page * pageSize,
    };
};
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map