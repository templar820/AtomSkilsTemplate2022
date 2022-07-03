import * as React from 'react';

declare type OneOfFilter = (
    byColumn: number,
    compare: Array<string | number> | string | number,
    temp?: boolean
) => (rows: Array<React.ReactNode>) => Array<React.ReactNode>;

declare type IncludesFilter = (
    byColumn: number,
    compare: string | number,
    temp?: boolean
) => (rows: Array<React.ReactNode>) => Array<React.ReactNode>;

declare type StartsWithFilter = (
    byColumn: number,
    compare: string | number,
    temp?: boolean
) => (rows: Array<React.ReactNode>) => Array<React.ReactNode>;

declare const filters: {
    oneOf: OneOfFilter;
    includes: IncludesFilter;
    startsWith: StartsWithFilter;
};

export declare type createFilter = (
    type: string,
    callBack: (compare: any, cell: number | string) => boolean
) => (byColumn: number, compare: any, temp?: boolean) => (rows: Array<React.ReactNode>) => Array<React.ReactNode>;

export default filters;
