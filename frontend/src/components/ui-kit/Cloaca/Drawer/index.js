import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Curtain from 'lib-ui/Curtain';

import config from 'lib-root/components/Curtain/config';
import { useExtendedCallback, getCurtainStyles } from './utils';

/**
 * Панель, которая обычно накладывается поверх страницы и "выезжает" с одной из сторон.
 */
const Drawer = React.forwardRef(
    (
        {
            position,
            isOpen,
            showBackdrop: propShowBackdrop,
            animationDuration,
            size: propSize,
            isDraggable: propDraggable,
            curtainStyle,
            onDragStart,
            onDragEnd: propOnDragEnd,
            Sibling: PropSibling,
            ...restProps
        },
        ref
    ) => {
        const { vertical } = config.position[position];
        const [size, setSize] = useState(propSize);

        const isDraggable = isOpen ? propDraggable : false;

        useEffect(() => {
            setSize(propSize);
        }, [propSize]);

        const onDragEnd = useExtendedCallback({
            cb: ({ size }) => setSize(size),
            propCb: propOnDragEnd
        });

        curtainStyle = getCurtainStyles(curtainStyle, vertical, animationDuration);

        const showBackdrop = isOpen ? propShowBackdrop : false;

        return (
            <Curtain
                size={isOpen ? size : 0}
                {...{ ref, position, showBackdrop, curtainStyle, isDraggable, onDragStart, onDragEnd, ...restProps }}
            />
        );
    }
);

Drawer.displayName = 'Drawer';
Drawer.propTypes = {
    /** Defines node that will be parent for theCurtain. By default Curtain renders in direct parent */
    container: PropTypes.object,
    /** Defines whether the Drawer is open or closed (visible or hidden)*/
    isOpen: PropTypes.bool,
    /** Duration of opening/closing animation. Receives ms */
    animationDuration: PropTypes.number,
    /** Defines the static edge of the curtain */
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Defines whether Curtain will be positioned absolutely (overlay) or in standard flow */
    overlay: PropTypes.bool,
    /** Defines whether the curtain could be changed by dragging */
    isDraggable: PropTypes.bool,
    /** Defines width or height of the curtain (depends from position prop). Could be changed by dragging if turned on */
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines maximal width or height of the curtain (depends from position prop) */
    maxPercent: PropTypes.number,
    /** Defines minimal width or height of the curtain (depends from position prop) */
    minPercent: PropTypes.number,
    /** Callback will be fired when user starts dragging Resizer. Receives object containing new size in format { size } */
    onDragStart: PropTypes.func,
    /** Callback will be fired when user changes resizer position. Receives object containing new size in format { size } */
    onDrag: PropTypes.func,
    /** Callback will be fired when user ends dragging Resizer. Receives object containing new size in format { size } */
    onDragEnd: PropTypes.func,
    /** Callback will be fired when user clicks outside the Drawer Receives event */
    onClickOutside: PropTypes.func,
    /** Defines whether the backdrop should be shown */
    showBackdrop: PropTypes.bool,
    /** Defines should the children be hidden if they overflow the Curtain */
    overflowHidden: PropTypes.bool,
    /** Emotion styles for the curtain Could be a function receiving isDragging argument and returning emotion object */
    curtainStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for the resizer element. Could be a function receiving isDragging argument and returning emotion object */
    resizerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for the backdrop element. Could be a function receiving isDragging argument and returning emotion object */
    backdropStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};
Drawer.defaultProps = {
    isOpen: false,
    animationDuration: 300,
    position: 'bottom',
    overlay: false,
    isDraggable: false,
    maxPercent: 100,
    minPercent: 0,
    overflowHidden: true
};

export default Drawer;
