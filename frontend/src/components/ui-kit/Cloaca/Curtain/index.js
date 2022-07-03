import React, { useEffect, useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { ColorsContext } from 'lib-root/colors';
import { LayersContext } from 'lib-root/layers';

import { Portal } from 'lib-ui/utils';

import { StyledResizer, StyledCurtain, Overflow, Backdrop, GlobalStyles } from './units';

import { useDragHandler, useCurtainRef } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Занавес.
 */
const Curtain = React.forwardRef(
    (
        {
            container,
            children,
            resizerStyle,
            backdropStyle,
            overflowHidden,
            overflowStyle,
            isDraggable,
            overlay,
            size: propSize,
            minPercent,
            maxPercent,
            position,
            onDragStart,
            onDrag,
            onDragEnd,
            onClickOutside,
            showBackdrop,
            ...restProps
        },
        forwardedRef
    ) => {
        const colors = useContext(ColorsContext);
        const zIndex = useContext(LayersContext);

        const [curtainRef, setRef] = useCurtainRef(forwardedRef);

        // ref is needed to keep size value in cases of container switching
        const sizeRef = useRef(propSize);
        const setSize = useCallback(
            (size, callback = true) => {
                if (typeof size === 'undefined') size = 'auto';
                sizeRef.current = size;
                if (curtainRef.current && curtainRef.current.style)
                    curtainRef.current.style[position === 'top' || position === 'bottom' ? 'height' : 'width'] = size;
                if (typeof onDrag === 'function' && callback) onDrag({ size });
            },
            [onDrag, curtainRef]
        );

        // dealing with all drag events
        const [isDragging, setIsDragging] = useDragHandler(
            position,
            maxPercent,
            minPercent,
            curtainRef,
            setSize,
            onDragStart,
            onDragEnd
        );

        const outsideClickHandler = useCallback((e) => typeof onClickOutside === 'function' && onClickOutside(e), [
            onClickOutside
        ]);

        // changing size in props will override user defined value
        useEffect(() => {
            setSize(propSize, false);
        }, [propSize]);

        return (
            <Portal node={container || false} roleName={'drawer'} hasLayerControl={false}>
                <StyledCurtain
                    callback={outsideClickHandler}
                    {...{
                        ref: setRef,
                        size: sizeRef.current,
                        position,
                        overlay,
                        maxPercent,
                        minPercent,
                        isDragging,
                        zIndex,
                        ...restProps
                    }}
                    className={setClassName({ props: restProps, name: 'curtain' })}>
                    {isDraggable && (
                        <React.Fragment>
                            <StyledResizer
                                {...{ colors, resizerStyle, isDragging, position }}
                                onMouseDown={() => setIsDragging(true)}
                            />
                            <GlobalStyles {...{ isDragging, position }} />
                        </React.Fragment>
                    )}
                    <Overflow {...{ overflowHidden, overflowStyle }}>{children}</Overflow>
                </StyledCurtain>
                <Backdrop {...{ colors, zIndex, showBackdrop, backdropStyle, isDragging }} />
            </Portal>
        );
    }
);

Curtain.displayName = 'Curtain';
Curtain.propTypes = {
    /** Defines node that will be parent for theCurtain. By default Curtain renders in direct parent */
    container: PropTypes.object,
    /** Defines the static edge of the curtain */
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Defines whether Curtain will be positioned absolutely (overlay) or in standard flow */
    overlay: PropTypes.bool,
    /** Defines whether the curtain could be changed by dragging */
    isDraggable: PropTypes.bool,
    /** If set true, size of the curtain changes only through props */
    controlledDrag: PropTypes.bool,
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
    /** Callback will be fired when user clicks outside the Curtain. Receives event */
    onClickOutside: PropTypes.func,
    /** Defines whether the backdrop should be shown */
    showBackdrop: PropTypes.bool,
    /** Defines should the children be hidden if they overflow the Curtain */
    overflowHidden: PropTypes.bool,
    /** Emotion styles for the curtain Could be a function receiving isDragging argument and returning emotion object */
    curtainStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for the overflow element. Could be a function receiving isDragging argument and returning emotion object */
    overflowStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for the resizer element. Could be a function receiving isDragging argument and returning emotion object */
    resizerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for the backdrop element. Could be a function receiving isDragging argument and returning emotion object */
    backdropStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

Curtain.defaultProps = {
    position: 'bottom',
    overlay: true,
    isDraggable: true,
    controlledDrag: false,
    maxPercent: 100,
    minPercent: 0,
    showBackdrop: false,
    overflowHidden: true
};

export default Curtain;
