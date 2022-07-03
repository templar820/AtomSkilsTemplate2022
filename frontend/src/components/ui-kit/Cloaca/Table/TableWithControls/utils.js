import React, { useCallback, useMemo, useState, useRef } from 'react';
import { defaultFirstCollCells, defaultLastCollCells } from './units';

const insertCell = ({ children, cell = undefined, position = 'last' }) => {
    const cells = React.Children.toArray(children);
    if (cell) cells.splice(position === 'last' ? cells.length : position, 0, cell);
    return cells;
};

const usePropsInsert = ({ children, addFirstCol, addLastCol, firstColCells, lastColCells }) =>
    useMemo(() => {
        if (!addFirstCol && !addLastCol) return children;
        const totalFirstColCells = { ...defaultFirstCollCells, ...firstColCells };
        const totalLastColCells = { ...defaultLastCollCells, ...lastColCells };
        return React.Children.map(children, (child) => {
            const { tableSection } = child.type;
            const { children, ...restChildProps } = child.props;
            const rows = React.Children.map(children, (row, index) => {
                const { props: { children } = {}, key } = row || {};
                const cellsWithLastCell = !addLastCol
                    ? children
                    : insertCell({ children, cell: totalLastColCells[tableSection], position: 'last' });
                const cellsWithFirstCell = !addFirstCol
                    ? cellsWithLastCell
                    : insertCell({
                          children: cellsWithLastCell,
                          cell: totalFirstColCells[tableSection],
                          position: 0
                      });
                const originalRowKey = key || String(index);
                return { ...row, props: { ...row.props, children: cellsWithFirstCell, originalRowKey } };
            });
            return React.cloneElement(
                child,
                {
                    ...restChildProps
                },
                rows
            );
        });
    }, [children, addFirstCol, addLastCol, firstColCells, lastColCells]);

const getColumnsCount = (children) => {
    let section = React.Children.toArray(children).find(
        (child) => child.props && child.props.children && React.Children.count(child.props.children)
    );
    if (!section) {
        throw new Error('No <Row/> found');
    }
    const row = React.Children.toArray(section.props.children)[0] || {};
    return row.props && row.props.children
        ? row.props.children.reduce((acc, cell) => {
              if (cell && cell.props) acc += cell.props.colSpan ? cell.props.colSpan : 1;
              return acc;
          }, 0)
        : 0;
};

const calcStartEntry = (page, pagesCount, rowsCount, extendLastPage, entriesOnDisplay) =>
    page !== pagesCount || !extendLastPage ? (page - 1) * entriesOnDisplay : rowsCount - entriesOnDisplay;

const getRowSelectableStatus = (isSelectable, tableSection) => {
    return typeof isSelectable === 'boolean' ? isSelectable : tableSection === 'tbody';
};

const getObjectForAllCheckboxes = (isCheckingControlled, checkedRows, mergeCheckedRows) => {
    switch (true) {
        case checkedRows === undefined:
            return {};
        case typeof checkedRows !== 'object' ||
            Object.keys(checkedRows).some((key) => key !== 'tbody' && key !== 'thead' && key !== 'foot'):
            // dealing with wrong prop structure
            console.error(
                'prop checkedRows is defined with errors. checkedRows must be an object with table sections keys.'
            );
            return {};
        case !mergeCheckedRows:
            return checkedRows;
        default:
            // prevent mutating of original objects
            return Object.entries(checkedRows).reduce((result, [section, keys]) => {
                result[section] = { ...keys };
                return result;
            }, {});
    }
};

const useCheckController = (
    children,
    isCheckingControlled,
    checkedRows,
    defaultChecked,
    mergeCheckedRows,
    callback
) => {
    const currentCheckboxesRef = useRef(null);
    currentCheckboxesRef.current = useMemo(() => {
        // ref used to prevent expensive calculations in non-controlled mode
        if (!isCheckingControlled && currentCheckboxesRef.current !== null) return currentCheckboxesRef.current;

        const obj = getObjectForAllCheckboxes(isCheckingControlled, checkedRows, mergeCheckedRows);
        if (obj === checkedRows) return checkedRows;

        // iterations over sections
        React.Children.forEach(children, (child) => {
            const { tableSection } = child.type;

            // iterations over rows
            React.Children.forEach(child.props.children, ({ props: { originalRowKey: key, isSelectable } = {} }) => {
                const finalIsSelectable = getRowSelectableStatus(isSelectable, tableSection);
                if (finalIsSelectable) {
                    if (!obj[tableSection]) obj[tableSection] = {};
                    if (obj[tableSection][key] === undefined) obj[tableSection][key] = defaultChecked;
                }
            });
        });

        return obj;
    }, [children, isCheckingControlled, checkedRows, defaultChecked, mergeCheckedRows]);

    const [checkState, setCheckState] = useState(currentCheckboxesRef.current);
    const allCheck = isCheckingControlled ? currentCheckboxesRef.current : checkState;

    const setAllCheck = useCallback(
        (newState, change) => {
            if (!isCheckingControlled) setCheckState(newState);
            callback && callback(newState, change);
        },
        [callback, isCheckingControlled]
    );

    return { allCheck, setAllCheck };
};

const getTotalChecked = (allCheck) => {
    let result = undefined;
    const sections = Object.keys(allCheck);
    // iterate overs sections
    for (let i = 0; result !== 'indeterminate' && i < sections.length; i++) {
        const rows = Object.values(allCheck[sections[i]]);
        // iterate over rows in section
        for (let j = 0; result !== 'indeterminate' && j < rows.length; j++) {
            if (result !== undefined) {
                result = result === rows[j] ? rows[j] : 'indeterminate';
            } else {
                result = rows[j];
            }
        }
    }
    return result !== undefined ? result : false;
};

const handleCheck = ({ tableSection, setAllCheck, allCheck, originalRowKey, sumCell = false, event }) => {
    const obj = { ...allCheck };
    const value = event.target.checked;

    if (sumCell) {
        // iterate over sections
        for (let section in obj) {
            if (obj.hasOwnProperty(section)) {
                // iterate over rows
                for (let key in obj[section]) {
                    if (obj[section].hasOwnProperty(key)) obj[section][key] = value;
                }
            }
        }
    } else {
        obj[tableSection][originalRowKey] = value;
    }

    setAllCheck(obj, { key: originalRowKey, tableSection, value, sumCell });
};

const fillArrayOfDefaultValues = (array, defaultValue, count) => {
    return Array.apply(null, Array(count)).reduce(
        (acc, el, i) => [...acc, array[i] === undefined ? defaultValue : array[i]],
        []
    );
};

const getArrayWithAddedColumns = (array, count, isFirst, isLast, firstValue, lastValue, defaultValue) => {
    let tempArr = isFirst ? [firstValue, ...array] : array;
    if (isLast) {
        tempArr = fillArrayOfDefaultValues(tempArr, defaultValue, count);
        tempArr[tempArr.length - 1] = lastValue;
    }
    return tempArr;
};

const prepareVirtualization = (virtualization, onPageChange, entriesOnDisplay) => {
    if (!virtualization) return false;
    return {
        ...(virtualization || {}),
        onScroll: (arg) => {
            if (virtualization.onScroll) virtualization.onScroll(arg);
            onPageChange(Math.floor(arg.calcPureStartEntry() / entriesOnDisplay) + 1);
        }
    };
};

export {
    getColumnsCount,
    getArrayWithAddedColumns,
    calcStartEntry,
    insertCell,
    usePropsInsert,
    handleCheck,
    getTotalChecked,
    useCheckController,
    prepareVirtualization
};
