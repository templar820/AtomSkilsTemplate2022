import React from 'react';

const defaultControls = {};
const ControlsContext = React.createContext(defaultControls);

// 1 - startEntry. Offset as items count
// 2 - Limit. Number of items to show
// 3 - offset. Space that compensate non-showed items from the start of the list (set by startEntry).
const OffsetContext = React.createContext([0, 10, 0]);

const getCellValue = (row, colIndex) => {
    const { props: { filtersValue, children } = {} } = React.Children.toArray(row.props.children)[colIndex] || {};
    if (filtersValue !== undefined) return filtersValue;
    return typeof children === 'string' || typeof children === 'number' ? children : 0;
};

export { getCellValue, ControlsContext, OffsetContext };
