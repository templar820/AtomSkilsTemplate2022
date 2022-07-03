import { getCellValue } from './utils';

const startsWith = (compare, cell) => {
    return String(cell).indexOf(compare) === 0;
};

const includesFilter = (compare, cell) => {
    return String(cell).includes(compare);
};

const oneOfFilter = (compare, cell) => {
    const compareArray = Array.isArray(compare) ? compare : [compare];
    const result = compareArray.some((item) => item === cell);
    return result;
};

const filters = {
    oneOf: oneOfFilter,
    includes: includesFilter,
    startsWith: startsWith
};

export const createFilter = (type, callBack) => {
    if (callBack && filters[type]) console.error(new Error(`Filter: "${type}" already exist!`));
    if (!callBack && !filters[type])
        console.error(new Error('You probably want to create custom filter, but forgot to pass callBack'));

    return (byColumn, compare, temp = false) => {
        let filter;
        if (callBack) {
            filter = (rows) => {
                return rows.filter((row) => {
                    const cell = getCellValue(row, byColumn);
                    return callBack(compare, cell);
                });
            };
        } else {
            if (filters[type]) {
                filter = (rows = []) => {
                    return rows.filter((row) => {
                        const cell = getCellValue(row, byColumn);
                        return filters[type](compare, cell);
                    });
                };
            } else {
                filter = (row) => row;
            }
        }
        filter.filterType = type;
        filter.byColumn = byColumn;
        filter.temp = temp;
        filter.compare = compare;
        return filter;
    };
};

export default {
    oneOf: createFilter('oneOf'),
    includes: createFilter('includes'),
    startsWith: createFilter('startsWith')
};
