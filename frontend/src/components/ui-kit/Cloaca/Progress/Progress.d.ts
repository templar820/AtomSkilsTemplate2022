import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface ProgressProps {
    /** Defines shape of the progress bar */
    progressType?: 'line' | 'circle' | 'dashboard';
    /** Defines progress bar size template */
    size?: 'md' | 'sm';
    /** If progress type is circle or dashboard, defines width and height of the component */
    svgWidth?: number;
    /** If progress type is dashboard, defines percent of empty space */
    dashboardOffset?: number;
    /** Defines how full the progress bar filled. In range from 0 to 100 */
    percent?: number;
    /** Defines percent, which will be start point for fillers. Doesn't affect end point - it is still equal to the percent */
    startPosition?: number;
    /** Defines width of the bar */
    barWidth?: number;
    /** Defines width of child fillers */
    fillerWidth?: number;
    /** Defines the shape of line caps */
    caps?: 'round' | 'square';
    /** Defines rounding if square caps chosen. Works only with line progresses. */
    capsRadius?: number;
    /** If percent reaches marginal value (100), revert caps to opposite value (round -> square and square -> round). The same logic with the start position. */
    invertMarginalCaps?: boolean;
    /** Defines bar's background */
    barColor?: string;
    /** Defines color of child fillers. By default defined through status color */
    fillerColor?: string;
    /** Defines default color of filler and the caption's view. Normally shows percent or success icon when percent equal to 100 */
    status?: 'normal' | 'error' | 'success' | 'warning';
    /** Defines whether caption will be shown or not */
    showCaption?: boolean;
    /** Defines whether the min-height of the component will be set by maximal possible height of the children */
    preserveHeight?: boolean;
    /** Overrides caption defined by status */
    caption?: React.ReactNode;
    /** Defines font-size of the caption if not overwritten */
    captionFontSize?: number;
    /** Defines icon size of the caption if not overwritten */
    captionIconSize?: number;
    /** Duration of filler position change. In ms */
    animationDuration?: number;
    /** Emotion styles for component's wrapper */
    wrapperStyle?: EmotionStylesType;
    /** Emotion styles for bar */
    barStyle?: EmotionStylesType;
    /** Emotion styles for fillers*/
    fillerStyle?: EmotionStylesType;
}

declare const Progress: React.ComponentType<ProgressProps>;

export default Progress;
