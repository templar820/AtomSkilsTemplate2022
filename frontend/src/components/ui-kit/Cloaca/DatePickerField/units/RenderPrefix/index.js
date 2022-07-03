import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import InlineIcons from 'lib-ui/InlineIcons';
import withColors from 'lib-ui/utils/withColors';

const StyledIconWrapper = styled.div`
    margin-left: -6px;
    margin-bottom: 2px;
    z-index: 1;
    ${({ isClearable, isHover }) => isClearable && isHover && 'cursor: pointer;'}
`;

const RenderPrefix = memo(({ isClearable, clearHandler, clearIconRef, icon, colors }) => {
    const [isHover, setIsHover] = useState(false);
    const dispatchIsHover = useCallback(({ type }) => setIsHover(type === 'mouseenter'), []);

    let onClick,
        _icon = icon,
        ref;
    if (isClearable && isHover) {
        _icon = 'Sys_Cross_exit_rounded';
        onClick = clearHandler;
        ref = clearIconRef;
    }

    return (
        <StyledIconWrapper
            onMouseEnter={dispatchIsHover}
            onMouseLeave={dispatchIsHover}
            {...{ isClearable, onClick, isHover, ref }}>
            <InlineIcons
                w={'20px'}
                h={'20px'}
                icon={_icon}
                color={icon === 'Clock' ? colors.GrayScale_200 : undefined}
            />
        </StyledIconWrapper>
    );
});

RenderPrefix.displayName = 'RenderPrefix';
RenderPrefix.propTypes = {
    /** Is clearable */
    isClearable: PropTypes.bool,
    /** Callback that fires on mouse click */
    clearHandler: PropTypes.func,
    /** Custom props to icon*/
    iconProps: PropTypes.object
};

RenderPrefix.defaultProps = {
    isClearable: false,
    clearHandler: undefined,
    icon: 'Calendar'
};

export default withColors(RenderPrefix);
