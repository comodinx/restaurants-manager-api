export interface IQueryOptionParsed {
    limit?: number;
    offset?: number;
    where?: any;
    attributes?: any;
    include?: any;
    relations?: any;
    remotes?: any;
    extras?: any;
    order?: any;
    group?: any;
    required?: boolean;
    association?: string;
    rawQueryOptions?: string;
}
export declare const queryParse: (query: any, options?: any) => IQueryOptionParsed;
