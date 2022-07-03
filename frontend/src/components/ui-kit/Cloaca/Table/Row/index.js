import React, { useContext, useMemo } from 'react';

import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import { ControlsContext } from '../utils';

const getNextIndex = (currentIndex, rowChildren) => {
    if (!Array.isArray(rowChildren) || !rowChildren[currentIndex + 1]) {
        return null;
    } else {
        return rowChildren[currentIndex + 1].props.index;
    }
};

const StyledRow = styled.tr`
    background-color: ${({ tableSection, colors }) =>
        tableSection === 'tbody' ? colors.GrayScale_0 : colors.GrayScale_50};
    &:hover,
    &.selected {
        ${({ tableSection, colors, hoveringRows }) =>
            tableSection === 'tbody' && hoveringRows && `background-color: ${colors.GrayScale_55}`};
    }
    ${({ height }) => height !== undefined && `height: ${height}px`};
    ${({ _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const createRowStaticClassName = (className, selected) => {
    const namespace = 'table__row';
    const newClassname = setClassName({ props: { className }, name: namespace });
    return !selected
        ? newClassname
        : setClassName({ props: { className: newClassname }, name: `${namespace}_selected` });
};

const useClassNameGenerator = (className, tableSection, allCheck, key) =>
    useMemo(() => {
        const selected = allCheck && allCheck[tableSection] && !!allCheck[tableSection][key];
        return createRowStaticClassName(className, selected);
    }, [className, tableSection, allCheck, key]);

const Row = React.memo(
    React.forwardRef(
        (
            {
                className: propClassName,
                children,
                resizableCols,
                colsStyles,
                css: _css,
                tableSection,
                hoveringRows,
                originalRowKey,
                setCoords,
                height,
                ...restProps
            },
            ref
        ) => {
            const colors = useContext(ColorsContext);
            const { allCheck } = useContext(ControlsContext);
            const className = useClassNameGenerator(propClassName, tableSection, allCheck, originalRowKey);
            const localCount = React.Children.count(children);

            const handleRightClick = (event) => {
                if (restProps.contextMenuComponent) {
                    event.preventDefault();
                    setCoords({ x: event.nativeEvent.x, y: event.nativeEvent.y, tableSection, keyRow: originalRowKey });
                }
            };

            return (
                <StyledRow
                    onContextMenu={handleRightClick}
                    {...{ colors, ref, _css, tableSection, hoveringRows, height, className }}>
                    {React.Children.map(
                        children,
                        function(child, localIndex) {
                            const { children: cellChildren, index, ...restChildProps } = child.props;
                            const resizable = (resizableCols && resizableCols[index]) || false;
                            const colStyle = colsStyles[index];
                            const firstCol = localIndex === 0;
                            const lastCol = localIndex === localCount - 1;
                            const nextIndex = getNextIndex(localIndex, children);
                            if (
                                child.type.name === 'KebabCell' &&
                                !restProps.contextMenuComponent &&
                                !child.props.contextMenuComponent
                            ) {
                                console.error(
                                    'In order for KebabCell to work, it requires a prop “contextMenuComponent" to be passed directly or from any Table component above.'
                                );
                            }

                            return React.cloneElement(
                                child,
                                {
                                    tableSection,
                                    colStyle,
                                    resizable,
                                    index,
                                    firstCol,
                                    lastCol,
                                    nextIndex,
                                    originalRowKey,
                                    ...restProps,
                                    ...restChildProps
                                },
                                cellChildren
                            );
                        },
                        null
                    )}
                </StyledRow>
            );
        }
    )
);
Row.displayName = 'Row';
Row.propTypes = {
    /** emotion styles for the Row */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines whether the row could be selected by TableWithControls. If undefined depends of table section% tbody - true, thead and tfoot - false */
    isSelectable: PropTypes.bool,
    /** Set row height. Real height will use biggest value from this prop and cells' calculated heights.
     * Required if you use virtualization and calculated cells' heights are non-standard. Rowspan doesn't need height specifying.
     * Default heights: ordinary row - 48, high Row - 60 (px) */
    height: PropTypes.number
};

export { StyledRow };
export default Row;
