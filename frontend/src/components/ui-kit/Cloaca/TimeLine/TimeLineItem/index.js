import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { default as Spinner } from 'lib-ui/Spinner';

import { ColorsContext } from 'lib-root/colors';

import {
    StyledItemWrapper,
    StyledItemLine,
    StyledContentBox,
    StyledItemIconBox,
    StyledItemIconCircle,
    StyledItemIcon,
    StyledSpinnerBox
} from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

const TimeLineItem = React.forwardRef(
    ({ className, wrapperStyle, mode, align, icon, iconColor, position, children, lastLoading, ...restProps }, ref) => {
        const colors = useContext(ColorsContext);

        return (
            <StyledItemWrapper
                {...{ ref, wrapperStyle, position, lastLoading, ...restProps }}
                className={setClassName({ props: { className }, name: 'time-line__item' })}>
                <StyledItemLine {...{ colors, mode, position, lastLoading }} />

                <StyledItemIconBox {...{ colors, mode, position, icon, lastLoading }}>
                    {icon ? (
                        <StyledItemIcon iconSize={'20px'} {...{ icon, iconColor }} />
                    ) : (
                        <StyledItemIconCircle {...{ colors, mode, position, iconColor }} />
                    )}
                </StyledItemIconBox>
                <StyledContentBox {...{ align, mode }}>{children}</StyledContentBox>

                {lastLoading && (
                    <StyledSpinnerBox {...{ mode }}>
                        <Spinner size={4} />
                    </StyledSpinnerBox>
                )}
            </StyledItemWrapper>
        );
    }
);

TimeLineItem.displayName = 'TimeLineItem';
TimeLineItem.propTypes = {
    //** Alignment control if the alignment side is not specified by the parent */
    align: PropTypes.oneOf(['left', 'right']),
    //** Color for icon or default circle */
    iconColor: PropTypes.string,
    /** Icon name */
    icon: PropTypes.string,
    //** Styles for wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    //** Mode */
    mode: PropTypes.oneOf(['left', 'right', 'various']),
    //** Position */
    position: PropTypes.oneOf(['first', 'last']),
    //**  Children */
    children: PropTypes.any.isRequired,
    //** Loading state */
    lastLoading: PropTypes.bool
};

export default TimeLineItem;
