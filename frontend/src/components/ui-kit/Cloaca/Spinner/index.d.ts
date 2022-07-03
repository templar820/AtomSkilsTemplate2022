import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface SpinnerProps {
    /** Defines color scheme of component */
    colorScheme?: 'primary' | 'secondary' | 'default';
    /** Defines size of component */
    size?: number;
    /** Defines scale of component */
    scale?: number;
    /** Defines the amount of circles */
    circleCount?: number;
    /** Defines duration of animation */
    duration?: string;
    /** Defines delay of animation */
    delay?: number;
    /** Defines component's primary color */
    primaryColor?: string;
    /** Defines component's secondary color */
    secondaryColor?: string;
    /** Defines component's wrapper styles */
    wrapperStyle?: EmotionStylesType;
    /** Defines inner style */
    innerStyle?: EmotionStylesType;
    /** Defines circle style */
    circleStyle?: EmotionStylesType;
    /** Defines width */
    width?: number;
    /** Defines height */
    height?: number;
}

declare const Spinner: React.ComponentType<SpinnerProps>;

export default Spinner;
