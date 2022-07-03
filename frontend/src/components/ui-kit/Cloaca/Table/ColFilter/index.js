import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'lib-ui/Dropdown';
import { ControlsContext } from 'lib-ui/Table/utils';

import { useMapHeadings, useHandlerCreator } from './utils';
import { CheckItem, UpdatePositionWrapper, StyledUl, defaultTriggerElement, triggerStyle } from './units';

const ColFilter = React.forwardRef((props, ref) => {
    const { filteredColumnsMap, setFilteredColumns, allGrandchildren: { thead = [] } = {} } = useContext(
        ControlsContext
    );

    const headings = useMapHeadings(thead);
    const onCheckChange = useHandlerCreator(setFilteredColumns);

    return (
        <Dropdown {...{ ref, triggerStyle, ...props }}>
            <UpdatePositionWrapper {...{ filteredColumnsMap }}>
                <StyledUl>
                    {headings.map(([id, children]) => (
                        <CheckItem key={id} {...{ id, children, filteredColumnsMap, onCheckChange }} />
                    ))}
                </StyledUl>
            </UpdatePositionWrapper>
        </Dropdown>
    );
});
ColFilter.displayName = 'ColFilter';

ColFilter.propTypes = {
    ...Dropdown.propTypes,
    /** Defines node that opens dropdown on click */
    triggerElement: PropTypes.node,
    /** Defines whether dropdown should close by click outside of it */
    closeOnOutside: PropTypes.bool
};
ColFilter.defaultProps = {
    triggerElement: defaultTriggerElement,
    closeOnOutside: true
};

export default ColFilter;
