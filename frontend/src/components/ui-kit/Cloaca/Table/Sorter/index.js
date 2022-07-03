import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import sortersCreators from '../sorters';

import { ControlsContext } from '../utils';
import { SorterSVG, StyledWrapper } from './units';
import { resolveProps, getType } from 'lib-root/utils';

const createNewSorters = (sorters, nextSorter, sorterIndex, colIndex) => {
    if (nextSorter) {
        return sorterIndex >= 0
            ? sorters.map((sorter, index) => (index !== sorterIndex ? sorter : nextSorter(colIndex)))
            : [...sorters, nextSorter(colIndex)];
    } else {
        return sorters.filter((sorter, index) => index !== sorterIndex);
    }
};

const Sorter = React.forwardRef(
    ({ sequence, isDisabled, disabled: propDisabled, isControlled, onClick, children, ...restProps }, ref) => {
        const disabled = resolveProps(propDisabled, isDisabled);

        const { sorters, setSorters, colIndex } = useContext(ControlsContext);
        const sorterIndex = sorters.findIndex(
            ({ byColumn, sorterType }) => byColumn === colIndex && sequence.includes(sorterType)
        );
        const currentDirection = sorterIndex < 0 ? 'normal' : sorters[sorterIndex].sorterType;
        const nextSorterName = sequence[(sequence.indexOf(currentDirection) + 1) % sequence.length];
        const nextSorter = sortersCreators[nextSorterName];
        const handleClick = (e) => {
            if (disabled) return;
            if (onClick) onClick(e, nextSorterName, colIndex);
            if (isControlled) return;
            setSorters((sorters) => createNewSorters(sorters, nextSorter, sorterIndex, colIndex));
        };

        const propsToPass = { currentDirection, disabled, onClick: handleClick, ...restProps };

        switch (getType(children)) {
            case 'element':
            case 'array':
            case 'number':
            case 'string':
                return (
                    <StyledWrapper ref={ref} {...propsToPass}>
                        {children}
                    </StyledWrapper>
                );
            case 'function':
                return children(propsToPass);
            default:
                return <SorterSVG ref={ref} {...propsToPass} />;
        }
    }
);
Sorter.displayName = 'Sorter';
Sorter.propTypes = {
    /** Defines sequence of sorting directions. Duplicates are not acceptable */
    sequence: PropTypes.array,
    /** Defines whether it is possible to use Sorter
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** Defines whether it is possible for component to manage Table sorters internally */
    isControlled: PropTypes.bool,
    /** Defines callback fired on changing sorting direction. Receives event, next sorter name and index of the column */
    onClick: PropTypes.func,
    /** Node or render-props func that will replace default icon */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /** Defines emotion styles, that will be applied to the wrapping element (if there is one) */
    wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
Sorter.defaultProps = {
    sequence: ['normal', 'asc', 'desc']
};

export default React.memo(Sorter);
