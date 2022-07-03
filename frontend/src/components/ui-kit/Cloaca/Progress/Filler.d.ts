import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface FillerProps {
    /** Defines how full the progress bar filled. In range from 0 to 100. Overrides Progress bar's percent */
    percent?: number;
    /** Defines the shape of filler caps. Overrides Progress bar's caps */
    caps?: 'round' | 'square';
    /** Overrides Progress' rounding if square caps chosen. Works only with line progresses. */
    capsRadius?: number;
    /** Overrides Progress' prop. If filler reaches marginal value (100%), revert caps to opposite value (round -> square and square -> round). The same logic with the start position. */
    invertMarginalCaps?: boolean;
    /** Overrides width of the filler defined in Progress bar */
    fillerWidth?: number;
    /** Overrides color of the filler defined in Progress bar */
    fillerColor?: string;
    /** Defines percent, which will be start point for the filler. Doesn't affect end point - it is still equal to the percent. Overrides Progress' value */
    startPosition?: number;
    /** Overrides duration of filler position change set in Progress. In ms */
    animationDuration?: number;
    /** Overrides Emotion styles for filler set in Progress */
    fillerStyle?: EmotionStylesType;
}

declare const Filler: React.ComponentType<FillerProps>;

export default Filler;
