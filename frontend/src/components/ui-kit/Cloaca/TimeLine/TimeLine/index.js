import React from 'react';
import PropTypes from 'prop-types';

import { StyledWrapper } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

const getOptions = (index, length, isLoading) => {
    let position;
    if (index) {
        if (index + 1 === length) position = 'last';
    } else {
        position = 'first';
    }
    return { position, lastLoading: position === 'last' && isLoading };
};

/**
 * Используется для отображения определенных событий в хронологическом порядке.
 *
 * import { TimeLine as TimeLineComponents } from 'core-lib-react/components';
 *
 * const { TimeLine, TimeLineItem } = TimeLineComponents;
 */
const TimeLine = React.forwardRef(({ className, mode, isLoading, wrapperStyle, children, ...restProps }, ref) => (
    <StyledWrapper
        {...{ ref, wrapperStyle, ...restProps }}
        className={setClassName({ props: { className }, name: 'time-line' })}>
        {React.Children.map(
            children,
            (child, index) =>
                React.cloneElement(child, {
                    ...child.props,
                    mode,
                    index,
                    ...getOptions(index, children.length, isLoading)
                }),
            null
        )}
    </StyledWrapper>
));

TimeLine.displayName = 'TimeLine';
TimeLine.propTypes = {
    //** Alignment control over children */
    mode: PropTypes.oneOf(['left', 'right', 'various']),
    //* Loading state */
    isLoading: PropTypes.bool,
    //** Styles for wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    //* Children */
    children: PropTypes.any
};
TimeLine.defaultProps = {
    mode: 'right'
};

export default TimeLine;
