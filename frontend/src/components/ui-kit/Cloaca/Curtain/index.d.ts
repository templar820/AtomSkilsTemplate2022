import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface CurtainProps {
    /** Defines node that will be parent for theCurtain. By default Curtain renders in direct parent */
    container?: object;
    /** Defines the static edge of the curtain */
    position?: 'top' | 'right' | 'bottom' | 'left';
    /** Defines whether Curtain will be positioned absolutely (overlay) or in standard flow */
    overlay?: boolean;
    /** Defines whether the curtain could be changed by dragging */
    isDraggable?: boolean;
    /** Defines width or height of the curtain (depends from position prop). Could be changed by dragging if turned on */
    size?: number | string;
    /** Defines maximal width or height of the curtain (depends from position prop) */
    maxPercent?: number;
    /** Defines minimal width or height of the curtain (depends from position prop) */
    minPercent?: number;
    /** Callback will be fired when user starts dragging Resizer. Receives object containing new size in format { size } */
    onDragStart?: (size: { size: string }) => void;
    /** Callback will be fired when user changes resizer position. Receives object containing new size in format { size } */
    onDrag?: (size: { size: string }) => void;
    /** Callback will be fired when user ends dragging Resizer. Receives object containing new size in format { size } */
    onDragEnd?: (size: { size: string }) => void;
    /** Callback will be fired when user clicks outside the Curtain. Receives event */
    onClickOutside?: (event: MouseEvent) => void;
    /** Defines whether the backdrop should be shown */
    showBackdrop?: boolean;
    /** Defines should the children be hidden if they overflow the Curtain */
    overflowHidden?: boolean;
    /** Emotion styles for the curtain Could be a function receiving isDragging argument and returning emotion object */
    curtainStyle?: EmotionStylesType;
    /** Emotion styles for the overflow element. Could be a function receiving isDragging argument and returning emotion object */
    overflowStyle?: EmotionStylesType;
    /** Emotion styles for the resizer element. Could be a function receiving isDragging argument and returning emotion object */
    resizerStyle?: EmotionStylesType;
    /** Emotion styles for the backdrop element. Could be a function receiving isDragging argument and returning emotion object */
    backdropStyle?: EmotionStylesType;
}

declare const Curtain: React.ComponentType<CurtainProps>;

export default Curtain;
