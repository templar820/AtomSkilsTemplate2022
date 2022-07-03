import React, { useState, useContext, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';

import { AnimationTransition } from 'lib-ui/utils';

import { Arrow, PortalManager, Wrapper, TriggerWrapper, StyledPortal, StyledPaper, StyledIcon } from './units';
import { useStateManager, usePopperConfig, mapPlacement, useMouseMoveHandler, useOnClickHandler } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';
import { resolveProps } from 'lib-root/utils';

/**
 * Используется для отображения всплывающей подсказки.
 */
const Tooltip = React.forwardRef(
    (
        {
            forcedIsHovered,
            isClicked,
            closeOnOutsideClick,
            closeOnOutsideMove,
            closeOnTriggerClick,
            isDisabled,
            disabled: propDisabled,
            children: propChildren,
            distance,
            iconWidth,
            iconHeight,
            icon,
            wrapperStyle,
            triggerWrapperStyle,
            style: oldPaperStyle,
            paperStyle,
            portalStyle,
            targetRef,
            tooltip,
            popperProps,
            placement: propPlacement,
            tooltipPositionX,
            tooltipPositionY,
            usingPortal,
            animationDuration,
            openDelay,
            closeDelay,
            animationTransitionProps,
            wrapperClassName,
            portalClassName,
            paperClassName,
            arrowClassName
        },
        ref
    ) => {
        // _placement calc added for backward compatibility. Props tooltipPositionX, tooltipPositionY are deprecated.
        // use prop placement instead.
        const placement = mapPlacement({ tooltipPositionX, tooltipPositionY, placement: propPlacement });
        const disabled = resolveProps(propDisabled, isDisabled);

        const colors = useContext(ColorsContext);

        const [wrapperElement, setWrapperElement] = useState();
        const [popperElement, setPopperElement] = useState();
        const [arrowElement, setArrowElement] = useState();

        const {
            styles,
            positionUpdate,
            mainPlacement,
            opposite,
            perpendicular,
            oppositePerpendicular
        } = usePopperConfig(wrapperElement, popperElement, placement, arrowElement, popperProps);

        const { isVisible, inDOM, handler } = useStateManager({
            openDelay,
            closeDelay,
            forcedIsHovered,
            disabled,
            animationDuration,
            isClicked
        });

        const _closeOnOutsideClick = closeOnOutsideClick === undefined ? isClicked : closeOnOutsideClick;
        const _closeOnOutsideMove = closeOnOutsideMove === undefined ? !isClicked : closeOnOutsideMove;
        const _closeOnTriggerClick = closeOnTriggerClick === undefined ? isClicked : closeOnTriggerClick;

        const trigger = propChildren || <StyledIcon width={iconWidth} height={iconHeight} icon={icon} />;

        useEffect(() => {
            if (targetRef && targetRef.current) setWrapperElement(targetRef.current);
        });

        // use this for update Popper position /
        useImperativeHandle(ref, () => ({ wrapperElement, openHandler: handler, positionUpdate }), [
            positionUpdate,
            wrapperElement,
            handler
        ]);

        const mouseMoveHandler = useMouseMoveHandler(handler, isClicked, _closeOnOutsideMove);
        const { clickHandler, outsideClickHandler } = useOnClickHandler(
            handler,
            _closeOnOutsideClick,
            _closeOnTriggerClick
        );

        return (
            <Wrapper
                onMouseMove={mouseMoveHandler}
                onMouseDown={outsideClickHandler}
                {...{ ref: !targetRef ? setWrapperElement : undefined, wrapperStyle }}
                className={setClassName({ props: { className: wrapperClassName }, name: 'tooltip' })}>
                <TriggerWrapper {...{ triggerWrapperStyle }} onClick={clickHandler}>
                    {trigger}
                </TriggerWrapper>
                <PortalManager {...{ inDOM, usingPortal }}>
                    <AnimationTransition animationStateOnMount={true} animationState={isVisible} {...animationDuration}>
                        {(animationStyles) => (
                            <StyledPortal
                                role="tooltip"
                                className={setClassName({ props: { className: portalClassName }, name: 'portal' })}
                                {...{
                                    mainPlacement,
                                    opposite,
                                    perpendicular,
                                    oppositePerpendicular,
                                    distance,
                                    portalStyle,
                                    ref: setPopperElement,
                                    animationStyles,
                                    style: styles.popper
                                }}>
                                <StyledPaper
                                    className={setClassName({ props: { className: paperClassName }, name: 'paper' })}
                                    {...{ paperStyle: oldPaperStyle || paperStyle }}
                                    {...{ onMouseEnter: handler, onMouseLeave: handler }}>
                                    {tooltip}
                                </StyledPaper>
                                <Arrow
                                    className={setClassName({ props: { className: arrowClassName }, name: 'arrow' })}
                                    {...{
                                        distance,
                                        mainPlacement,
                                        ref: setArrowElement,
                                        style: styles.arrow,
                                        colors
                                    }}
                                />
                            </StyledPortal>
                        )}
                    </AnimationTransition>
                </PortalManager>
            </Wrapper>
        );
    }
);

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
    /** children */
    children: PropTypes.node,
    /** clicked or hovered actions */
    isClicked: PropTypes.bool,
    /** if set true, tooltip will close on click outside of it. By default !== isClicked */
    closeOnOutsideClick: PropTypes.bool,
    /** if set true, tooltip will close on move outside of it. By default === isClicked */
    closeOnOutsideMove: PropTypes.bool,
    /** if set true, click on trigger element (while tooltip open) will close tooltip. By default === isClicked */
    closeOnTriggerClick: PropTypes.bool,
    /** padding from paper to base */
    distance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** forced open */
    forcedIsHovered: PropTypes.bool,
    /** icon img */
    icon: PropTypes.string,
    /** icon height */
    iconHeight: PropTypes.string,
    /** icon width */
    iconWidth: PropTypes.string,
    /** portal style */
    portalStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    /** emotion styles for Wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    /** emotion styles for trigger wrapper */
    triggerWrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    /** emotion styles for Paper */
    paperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    /** reference of wrapped DOM element */
    targetRef: PropTypes.object,
    /** text in paper */
    tooltip: PropTypes.node,
    /** options that will be passed to the usePopper hook (see more - https://popper.js.org/docs/v2/)
     * or function that will receive current options and should return new ones for hook */
    popperProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** Delay for open ToolTip */
    openDelay: PropTypes.number,
    /** Delay for close ToolTip */
    closeDelay: PropTypes.number,
    /** position of the tooltip relative to the target children */
    placement: PropTypes.oneOf([
        'auto',
        'top',
        'right',
        'bottom',
        'left',
        'auto-start',
        'auto-end',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end'
    ]),
    /** disable handlers
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** if true tooltip will be past at the body. Otherwise it will be rendered right near to the target element */
    usingPortal: PropTypes.bool,
    /** duration of fading in and out */
    animationDuration: PropTypes.number,
    /** Props for AnimationTransition component. Look AnimationTransition spec.  */
    animationTransitionProps: PropTypes.object,
    /** Custom class for wrapper element */
    wrapperClassName: PropTypes.string,
    /** Custom class for portal element */
    portalClassName: PropTypes.string,
    /** Custom class for paper element */
    paperClassName: PropTypes.string,
    /** Custom class for arrow element */
    arrowClassName: PropTypes.string
};
Tooltip.defaultProps = {
    disabled: false,
    isClicked: false,
    placement: 'auto',
    distance: 14,
    iconWidth: '20px',
    iconHeight: '20px',
    icon: 'Information',
    usingPortal: true,
    animationDuration: 200,
    openDelay: 200,
    closeDelay: 200
};

export default Tooltip;
