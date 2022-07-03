import * as React from 'react';
import { AnimationTransitionProps } from 'lib-ui/utils/AnimationTransition';
import { EmotionStylesType } from 'lib-ui';
import * as PopperJS from '@popperjs/core';

declare type TooltipPlacement =
    | 'auto'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'auto-start'
    | 'auto-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end';

export interface TooltipProps {
    /** children */
    children?: React.ReactNode;
    /** clicked or hovered actions */
    isClicked?: boolean;
    /** if set true, tooltip will close on click outside of it. By default !== isClicked */
    closeOnOutsideClick?: boolean;
    /** if set true, tooltip will close on move outside of it. By default === isClicked */
    closeOnOutsideMove?: boolean;
    /** if set true, click on trigger element (while tooltip open) will close tooltip. By default === isClicked */
    closeOnTriggerClick?: boolean;
    /** padding from paper to base */
    distance?: string | number;
    /** forced open */
    forcedIsHovered?: boolean;
    /** icon img */
    icon?: string;
    /** icon height */
    iconHeight?: string;
    /** icon width */
    iconWidth?: string;
    /** portal style */
    portalStyle?: EmotionStylesType;
    /** emotion styles for Wrapper */
    wrapperStyle?: EmotionStylesType;
    /** emotion styles for trigger wrapper */
    triggerWrapperStyle?: EmotionStylesType;
    /** emotion styles for Paper */
    paperStyle?: EmotionStylesType;
    /** reference of wrapped DOM element */
    targetRef?: React.RefObject<HTMLElement>;
    /** text in paper */
    tooltip?: EmotionStylesType;
    /** options that will be passed to the usePopper hook (see more - https://popper.js.org/docs/v2/)
     * or function that will receive current options and should return new ones for hook */
    popperProps?: PopperJS.Options | ((options: PopperJS.Options) => PopperJS.Options);
    /** Delay for open ToolTip */
    openDelay?: number;
    /** Delay for close ToolTip */
    closeDelay?: number;
    /** position of the tooltip relative to the target children */
    placement?: TooltipPlacement;
    /** disable handlers
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** if true tooltip will be past at the body. Otherwise it will be rendered right near to the target element */
    usingPortal?: boolean;
    /** duration of fading in and out */
    animationDuration?: number;
    /** Props for AnimationTransition component. Look AnimationTransition spec.  */
    animationTransitionProps?: AnimationTransitionProps;
    /** Custom class for wrapper element */
    wrapperClassName?: string;
    /** Custom class for portal element */
    portalClassName?: string;
    /** Custom class for paper element */
    paperClassName?: string;
    /** Custom class for arrow element */
    arrowClassName?: string;
}

declare const Tooltip: React.ComponentType<TooltipProps>;

export default Tooltip;
