import { getCellValue } from './utils';

const createSortingByColumnValueFunction = (inverse) => {
    const result = inverse ? -1 : 1;
    return (byColumn = 0) => {
        const sorter = (a, b) => {
            a = getCellValue(a, byColumn);
            b = getCellValue(b, byColumn);
            return a > b ? result : a < b ? -result : 0;
        };
        sorter.byColumn = byColumn;
        sorter.sorterType = inverse ? 'desc' : 'asc';
        return sorter;
    };
};

export default {
    asc: createSortingByColumnValueFunction(false),
    desc: createSortingByColumnValueFunction(true)
};
