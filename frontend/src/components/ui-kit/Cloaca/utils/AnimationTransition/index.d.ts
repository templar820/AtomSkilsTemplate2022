import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface AnimationTransitionProps {
    /** State of animation  */
    animationState?: boolean;
    /** Animation state on start */
    animationStateOnMount?: boolean;
    /** Initial parameters (emotion keyframe) */
    startStyles?: EmotionStylesType;
    /** Final parameters  ( emotion keyframe)  */
    endStyles?: EmotionStylesType;
    /** The delay before transition to start state */
    startStateDelay?: number;
    /** The delay before the animation becomes final */
    endStateDelay?: number;
    /** Defines function or any node that will be placed in a body of the component */
    children?: React.ReactNode | ((styles: EmotionStylesType) => React.ReactNode);
    /** Animation duration */
    animationDuration?: number;
}

declare const AnimationTransition: React.ComponentType<AnimationTransitionProps>;

export default AnimationTransition;
