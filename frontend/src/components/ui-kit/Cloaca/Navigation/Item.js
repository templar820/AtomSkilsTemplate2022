import React from 'react';
import PropTypes from 'prop-types';

import withColors from 'lib-ui/utils/withColors';
import { StyledContentWrapper, StyledMenuItem } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

const Item = React.forwardRef(({ colors, children, icon, position, showIcons, css: _css, ...restProps }, ref) => (
    <StyledMenuItem
        {...{ ref, colors, position, showIcons, _css, ...restProps }}
        className={setClassName({ props: restProps, name: 'navigation__item' })}>
        {(showIcons || position === 'right') && icon}
        {children && <StyledContentWrapper>{children}</StyledContentWrapper>}
    </StyledMenuItem>
));

Item.displayName = 'NavigationItem';
Item.propTypes = {
    /** Usually is a title of menu item */
    children: PropTypes.node,
    /** Node with InlineIcon. But it is possible to set any node */
    icon: PropTypes.node,
    /** Defines whether the item should be highlighted */
    active: PropTypes.bool,
    /** Defines highlighting color (used if item marked as active). By default inherit the value from Navigation */
    color: PropTypes.string,
    /** Defines in which group of items the item will be placed  */
    position: PropTypes.oneOf(['left', 'right']),
    /** Defines whether the icon should be visible. By default inherit the value from Navigation */
    showIcons: PropTypes.bool,
    /** The function that will be fired on click */
    onClick: PropTypes.func,
    /** Emotion styles for the top level wrapper of the item */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

Item.defaultProps = {
    active: false,
    position: 'left'
};

export default withColors(Item);
