const byIndexesFilter = ({ compare, temp = false }) => {
    const filter = ({ cells = [] /*, filterIndex, section, rowIndex*/ }) => {
        if (!compare) {
            return cells;
        } else {
            return cells.filter((cell, index) => !compare.includes(index));
        }
    };
    filter.compare = compare;
    filter.temp = temp;
    filter.filterType = 'byIndexes';
    return filter;
};
export default {
    byIndexes: byIndexesFilter
};
