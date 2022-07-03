import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { withColors } from 'lib-ui/utils';

import { ListItemLabel, ListItem } from './units';

const TimeItem = React.forwardRef(
    ({ colors, item, isActive, onClick: _onCLick, disabled, listItemStyles, labelItemStyles }, ref) => {
        const onClick = useCallback(() => {
            return !isActive && !disabled && _onCLick && _onCLick({ newValue: item });
        }, [isActive, disabled]);

        return (
            <ListItem
                {...{
                    colors,
                    isActive,
                    ref,
                    onClick: () => !isActive && onClick({ newValue: item }),
                    disabled,
                    listItemStyles
                }}>
                <ListItemLabel {...{ className: isActive && 'isActive', labelItemStyles }}>{item}</ListItemLabel>
            </ListItem>
        );
    }
);

TimeItem.displayName = 'TimeItem';
TimeItem.propTypes = {
    /** Item object that consider hour/minute of second */
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
    /** Defines is that item is active */
    isActive: PropTypes.bool,
    /** Defines is that item is disabled */
    disabled: PropTypes.bool,
    /** Custom styles ot item label */
    labelItemStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Custom styles ot item wrapper */
    listItemStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Pass ref to element */
    itemRef: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.object]),
    /** Callback, fired then user click on item, func({ newValue }) */
    onClick: PropTypes.func
};

TimeItem.defaultProps = {};

export default withColors(TimeItem);
