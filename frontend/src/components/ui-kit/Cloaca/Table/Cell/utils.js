import { useMemo } from 'react';

const useFixedDefiner = ({
    fixedHeader,
    fixedFooter,
    fixedFirstCol,
    fixedLastCol,
    firstCol,
    lastCol,
    tableSection,
    rowOffset
}) =>
    useMemo(() => {
        const result = {};
        if (fixedHeader && tableSection === 'thead') result.top = rowOffset !== undefined ? rowOffset : 'auto';
        if (fixedFooter && tableSection === 'tfoot') result.bottom = rowOffset !== undefined ? rowOffset : 'auto';
        if (fixedFirstCol && firstCol) result.left = 0;
        if (fixedLastCol && lastCol) result.right = 0;
        const length = Object.keys(result).length;
        if (length) {
            result.zIndex = length + (tableSection !== 'tbody' ? 2 : 1);
            return result;
        } else return false;
    }, [fixedHeader, fixedFooter, fixedFirstCol, fixedLastCol, firstCol, lastCol, rowOffset]);

export { useFixedDefiner };
