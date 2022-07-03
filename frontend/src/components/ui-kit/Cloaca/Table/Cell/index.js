import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';
import { ControlsContext } from '../utils';

import Sorter from 'lib-ui/Table/Sorter';

import { Resizer, StyledCell, ChildrenWrapper, Slot, TitleSorter, slotSorterWrapper } from './units';
import { useFixedDefiner } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';

const Cell = React.forwardRef(
    (
        {
            className,
            children,
            tableSection,
            index: colIndex,
            nextIndex,
            resizable,
            leftSlot,
            rightSlot,
            scroll,
            fixedHeader,
            fixedFooter,
            fixedFirstCol,
            fixedLastCol,
            firstCol,
            lastCol,
            isScrolled,
            rowOffset,
            colSpan = 1,
            disableEllipsisOverflow,
            sortOnClick,
            sorterProps,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);
        const prevContextValue = useContext(ControlsContext);
        const { resizingStates, isEdgeUseBgBorders } = prevContextValue;
        const contextValue = useMemo(() => ({ ...prevContextValue, colIndex }), [prevContextValue, colIndex]);

        const rightIndexPosition = colIndex + colSpan - 1;

        const as = tableSection !== 'thead' ? 'td' : 'th';
        const fixedConfig = useFixedDefiner({
            fixedHeader,
            fixedFooter,
            fixedFirstCol,
            fixedLastCol,
            firstCol,
            lastCol,
            tableSection,
            rowOffset
        });

        // wrapping children in case of sorting or for ellipsis
        let _children = children;
        if (tableSection !== 'thead' && !disableEllipsisOverflow) {
            _children = <ChildrenWrapper>{children}</ChildrenWrapper>;
        } else if (sortOnClick) _children = <TitleSorter {...sorterProps}>{children}</TitleSorter>;

        // assigning sorter icon to the empty slot
        let _leftSlot = leftSlot,
            _rightSlot = rightSlot;
        if (sortOnClick && (leftSlot === undefined || rightSlot === undefined)) {
            const sorter = <Sorter wrapperStyle={slotSorterWrapper} {...sorterProps} />;
            if (_leftSlot === undefined) {
                _leftSlot = sorter;
            } else _rightSlot = sorter;
        }

        return (
            <ControlsContext.Provider value={contextValue}>
                <StyledCell
                    {...{
                        colSpan,
                        colors,
                        ref,
                        rightSlot,
                        fixedConfig,
                        tableSection,
                        firstCol,
                        lastCol,
                        isScrolled,
                        as,
                        isEdgeUseBgBorders,
                        ...restProps
                    }}
                    className={setClassName({ props: { className }, name: 'table__cell' })}>
                    {_children}
                    {tableSection === 'thead' && (
                        <>
                            <Slot slot={'left'}>{_leftSlot}</Slot>
                            <Slot slot={'right'}>{_rightSlot}</Slot>
                            <Resizer {...{ resizable, rightIndexPosition, resizingStates, lastCol, nextIndex }} />
                        </>
                    )}
                </StyledCell>
            </ControlsContext.Provider>
        );
    }
);
Cell.displayName = 'Cell';
Cell.propTypes = {
    /** defines number of columns cell will be spanned to */
    colSpan: PropTypes.number,
    /** emotion styles for the Cell */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** defines whether cell should apply text-overflow: ellipsis */
    disableEllipsisOverflow: PropTypes.bool,
    /** defines value that will be used for sorting and filtering instead of children */
    filtersValue: PropTypes.node,
    /** defines content of  cell's left slot*/
    leftSlot: PropTypes.node,
    /** defines content of  cell's left slot*/
    rightSlot: PropTypes.node,
    /** defines number of rows cell will be spanned to */
    rowSpan: PropTypes.number,
    /** defines whether cell will be shown for checking at the ColFilter component */
    showInColFilter: PropTypes.bool,
    /** defines whether click on cell should trigger column sorting (for th only) */
    sortOnClick: PropTypes.bool,
    /** props that will be passed to the Sorter component (if sortOnClick is true) */
    sorterProps: PropTypes.object
};
Cell.defaultProps = {
    showInColFilter: true,
    sortOnClick: false,
    sorterProps: {}
};

export default Cell;
