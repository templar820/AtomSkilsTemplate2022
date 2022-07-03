import { useState, useCallback, useEffect, useMemo } from 'react';
import useOutsideEvent from 'react-on-outside-event/dist/useOutsideEvent';
import { usePopper } from 'react-popper';

import { useStateDelayer } from 'lib-root/utils';
import { getMainPopperPlacement, applyPopperProps, positions } from 'lib-root/utils/position';

const mapPlacement = ({ tooltipPositionX: x, tooltipPositionY: y, placement }) => {
    if (!x && !y) return placement;

    // validating inputs
    if (!['left', 'middle', 'right', 'auto'].includes(x)) x = 'auto';
    if (!['top', 'middle', 'bottom', 'auto'].includes(y)) y = 'auto';

    // auto-auto, middle-middle, auto-middle, middle-auto => auto;
    // auto-any, middle-any, any-middle, any-auto => any. Any means valid placement except 'auto'.
    if (x === 'auto' || x === 'middle') return y === 'auto' || y === 'middle' ? 'auto' : y;
    if (y === 'auto' || y === 'middle') return x === 'auto' || x === 'middle' ? 'auto' : x;

    // return other combinations converted to placement style
    return `${y}-${x === 'left' ? 'start' : 'end'}`;
};

const useStateManager = ({ openDelay, closeDelay, forcedIsHovered, disabled, isClicked, animationDuration }) => {
    const [animationFlag, setAnimationFlag] = useState(forcedIsHovered);

    const isVisible = useStateDelayer({ state: animationFlag, appear: openDelay, disappear: closeDelay });

    const inDOM = useStateDelayer({ state: isVisible, appear: 0, disappear: animationDuration });

    const handler = useCallback(
        (action) => {
            if (forcedIsHovered !== undefined) {
                setAnimationFlag(forcedIsHovered);
            } else {
                switch (action) {
                    case 'open':
                        setAnimationFlag(true);
                        break;
                    case 'close':
                        setAnimationFlag(false);
                        break;
                    case 'switch':
                        setAnimationFlag((prevVisible) => !prevVisible);
                }
            }
        },
        [isClicked, disabled, forcedIsHovered]
    );

    useEffect(() => {
        handler();
    }, [forcedIsHovered]);

    return { isVisible, inDOM, handler };
};

const useMouseMoveHandler = (handler, isClicked, closeOnOutsideMove) => {
    const outsideMoveCallback = useMemo(() => (closeOnOutsideMove ? () => handler('close') : null), [
        closeOnOutsideMove,
        handler
    ]);
    const outsideMove = useOutsideEvent(outsideMoveCallback, 'onMouseMove');
    // finalize creating with adding activator or setting undefined (if clicked tooltip with no move close)
    return useMemo(() => {
        if (!isClicked) return outsideMove(() => handler('open'));
        return closeOnOutsideMove ? outsideMove : null;
    }, [outsideMove, handler, closeOnOutsideMove, isClicked]);
};

const useOnClickHandler = (handler, closeOnOutsideClick, closeOnTriggerClick) => {
    const clickHandler = useMemo(() => () => handler(closeOnTriggerClick ? 'switch' : 'open'), [handler]);

    const closeFn = useCallback(() => handler('close'), [handler]);
    const outsideClickHandler = useOutsideEvent(closeOnOutsideClick ? closeFn : null, 'onMouseDown');

    return { clickHandler, outsideClickHandler };
};

const usePopperConfig = (wrapperElement, popperElement, placement, arrowElement, popperProps) => {
    const options = useMemo(() => {
        const basicOptions = {
            modifiers: [
                { name: 'arrow', options: { element: arrowElement } },
                {
                    name: 'preventOverflow',
                    options: {
                        altBoundary: true,
                        mainAxis: true,
                        altAxis: true,
                        padding: 8
                    }
                }
            ],
            placement
        };
        return applyPopperProps(basicOptions, popperProps);
    }, [placement, arrowElement, popperProps]);

    const { styles, state: popperState, update } = usePopper(wrapperElement, popperElement, options);
    const { placement: currentPlacement } = popperState || {};

    const mainPlacement = getMainPopperPlacement(currentPlacement);
    const opposite = positions[mainPlacement] && positions[mainPlacement].opposite;
    const perpendicular = positions[mainPlacement] && positions[mainPlacement].perpendicular;
    const oppositePerpendicular = positions[perpendicular] && positions[perpendicular].opposite;
    return { styles, mainPlacement, opposite, perpendicular, oppositePerpendicular, positionUpdate: update };
};

export { useStateManager, mapPlacement, useMouseMoveHandler, useOnClickHandler, usePopperConfig };
