/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import generateCss from './utils';
import { useStateDelayer } from 'lib-root/utils';

/**
 * The wrapper in which the animation comes. FADE by default
 *
 * import { utils as utilsComponents } from 'core-lib-react/components';
 *
 * const { HighlightWrapper, LoaderComponent, EmptyStates, Portal, PortalWithState, withColors, AnimationTransition } = utilsComponents;
 */

const AnimationTransition = React.forwardRef(
    (
        {
            animationState,
            animationStateOnMount,
            startStyles,
            endStyles,
            children,
            startStateDelay,
            endStateDelay,
            animationDuration
        },
        ref
    ) => {
        const animate = useStateDelayer({
            state: animationState,
            initial: animationStateOnMount,
            appear: endStateDelay,
            disappear: startStateDelay
        });

        const memoizedStyles = useMemo(() => generateCss({ animate, animationDuration, startStyles, endStyles }), [
            animate,
            animationDuration,
            startStyles,
            endStyles
        ]);

        if (React.isValidElement(children)) {
            return (
                <div ref={ref} css={memoizedStyles}>
                    {children}
                </div>
            );
        } else {
            return typeof children === 'function' ? children(memoizedStyles) : null;
        }
    }
);

AnimationTransition.displayName = 'AnimationTransition';
AnimationTransition.propTypes = {
    /** State of animation  */
    animationState: PropTypes.bool,
    /** Animation state on start */
    animationStateOnMount: PropTypes.bool,
    /** Initial parameters (emotion keyframe) */
    startStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Final parameters  ( emotion keyframe)  */
    endStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** The delay before transition to start state */
    startStateDelay: PropTypes.number,
    /** The delay before the animation becomes final */
    endStateDelay: PropTypes.number,
    /** Defines function or any node that will be placed in a body of the component */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Animation duration */
    animationDuration: PropTypes.number
};

AnimationTransition.defaultProps = {
    animationState: false,
    animationStateOnMount: false,
    startStateDelay: 0,
    endStateDelay: 0,
    animationDuration: 300
};

export default AnimationTransition;
