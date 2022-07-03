declare type ComparisonFunction = (a: number | string, b: number | string) => -1 | 0 | 1;
declare type Sorter = (byColumn: number) => ComparisonFunction;

declare const sorters: {
    asc: Sorter;
    desc: Sorter;
};

export default sorters;
