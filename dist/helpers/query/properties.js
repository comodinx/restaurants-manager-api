"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.properties = void 0;
const lodash_1 = require("lodash");
const defaultSeparator = ",";
const defaultConcatenator = ".";
const defaultRemotePrefix = "r-";
const defaultExtraPrefix = "e-";
const mapTypes = {
    fields: "attributes",
};
const getDefaultSeparator = (type, options = {}) => {
    return ((0, lodash_1.isObject)(options) ? options[`${type}Separator`] : defaultSeparator) || defaultSeparator;
};
const getDefaultConcatenator = (type, options = {}) => {
    return (((0, lodash_1.isObject)(options) ? options[`${type}Concatenator`] : defaultConcatenator) ||
        defaultConcatenator);
};
const isRemoteProperty = (property) => property.startsWith(defaultRemotePrefix);
const normalizeRemoteProperty = (property) => property.replace(defaultRemotePrefix, "");
const isExtraProperty = (property) => property.startsWith(defaultExtraPrefix);
const normalizeExtraProperty = (property) => property.replace(defaultExtraPrefix, "");
const normalizeRemoteExtraProperty = (property) => normalizeExtraProperty(normalizeRemoteProperty(property));
const resolveProperty = (opts, property, carry) => {
    if (isRemoteProperty(property)) {
        const rawProperty = normalizeRemoteProperty(property);
        opts.remotes = opts.remotes || [];
        if (!opts.remotes.includes(rawProperty)) {
            opts.remotes.push(rawProperty);
        }
    }
    else if (isExtraProperty(property)) {
        const rawProperty = normalizeExtraProperty(property);
        opts.extras = opts.extras || [];
        if (!opts.extras.includes(rawProperty)) {
            opts.extras.push(rawProperty);
        }
    }
    else if (!carry.includes(property)) {
        carry.push(property);
    }
};
const resolveRelationship = (context, type, property) => {
    type = mapTypes[type] || type;
    if (!isRemoteProperty(property) && !isExtraProperty(property)) {
        context[type] = context[type] || [];
    }
    resolveProperty(context, property, context[type]);
};
const properties = (query, type, options = {}) => {
    if (!query || !query[type]) {
        return;
    }
    const concatenator = getDefaultConcatenator(type, options);
    const properties = (0, lodash_1.isString)(query[type])
        ? query[type].split(getDefaultSeparator(type, options))
        : query[type];
    const opts = {
        [type]: [],
    };
    opts[type] = (0, lodash_1.reduce)(properties, (carry, property) => {
        let isFirstLevelProperty = true;
        let parentPropertyName;
        let parentPropertyOpts;
        if (property.includes(concatenator)) {
            property.split(concatenator).forEach((partOfProperty) => {
                const rawProperty = normalizeRemoteExtraProperty(partOfProperty);
                if (isFirstLevelProperty) {
                    isFirstLevelProperty = false;
                    if (!options.skipFirstLevelProperty) {
                        resolveProperty(opts, partOfProperty, carry);
                    }
                }
                else {
                    parentPropertyOpts.relations = parentPropertyOpts.relations || {};
                    parentPropertyOpts.relations[parentPropertyName] =
                        parentPropertyOpts.relations[parentPropertyName] || {};
                    resolveRelationship(parentPropertyOpts.relations[parentPropertyName], type, partOfProperty);
                }
                parentPropertyOpts =
                    (parentPropertyOpts &&
                        parentPropertyOpts.relations &&
                        parentPropertyOpts.relations[parentPropertyName || rawProperty]) ||
                        opts;
                parentPropertyName = normalizeRemoteExtraProperty(partOfProperty);
            });
        }
        else {
            resolveProperty(opts, property, carry);
        }
        return carry;
    }, opts[type]);
    return opts;
};
exports.properties = properties;
//# sourceMappingURL=properties.js.map