import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface BackToTopProps {
    /** send the ref if you need scroll to some element */
    refProp?: React.RefObject<HTMLElement>;
    /** window ref in which the element will scroll */
    windowRefProp?: React.RefObject<HTMLElement>;
    /** body ref which will scroll */
    bodyRefProp?: React.RefObject<HTMLElement>;
    /** Show on scroll  */
    showOnScroll?: boolean;
    /** Canceling of animation  */
    cancelAnimation?: boolean;
    /** Scroll direction */
    direction?: 'toBottom' | 'toTop' | 'toRight' | 'toLeft';
    /** easing */
    easing?: string;
    /** Callback that fires on mouse click */
    onClick?: () => void;
    /** Show at some height or width */
    showAt?: number;
    /** Animation speed */
    animationDuration?: number;
    /** Style */
    style?: EmotionStylesType;
}

declare const BackToTop: React.ComponentType<BackToTopProps>;

export default BackToTop;
