import React, { useEffect, useRef, useState } from 'react';
import { getLabel, isVerticalWrap, useDragListener } from 'lib-ui/Slider/utils';
import Tooltip from 'lib-ui/Tooltip';
import { TooltipStyle } from 'lib-ui/Slider/units';
import PropTypes from 'prop-types';
import Mark from 'lib-ui/Slider/Mark';
import { resolveProps } from 'lib-root/utils';

const ControlMark = ({
    barLength,
    barWidth,
    className,
    color,
    controlMarkCircleStyle,
    controlMarkLabelStyle,
    index,
    labelSuffix, // DEPRECATED. Consider using labelFormatter prop instead. Defines suffix for labels
    labelFormatter: _labelFormatter,
    max,
    min,
    markRef,
    onControlMarkMove,
    orientation,
    showCaption,
    step,
    value,
    variant
}) => {
    const [isDrag, setIsDrag] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [mouseStart, setMouseStart] = useState(null);
    const [startPosition, setStartPosition] = useState(null);
    const labelFormatter = resolveProps(labelSuffix, _labelFormatter);

    const tooltipRef = useRef();

    // Returns true for vertical oriented slider
    const isVertical = isVerticalWrap(orientation);

    const handleMouseDown = (e) => {
        setMouseStart(isVertical() ? e.clientY : e.clientX);
        setStartPosition(value);
        setIsDrag(true);
    };

    const handleMouseOver = () => setIsHover(true);
    const handleMouseOut = () => setIsHover(false);

    useEffect(() => {
        const { current: { positionUpdate } = {} } = tooltipRef || {};

        if (typeof positionUpdate === 'function') {
            positionUpdate();
        }
    }, [value]);

    useDragListener({
        mouseStart,
        startPosition,
        barLength,
        max,
        min,
        index,
        isDrag,
        setIsDrag,
        onControlMarkMove,
        isVertical
    });

    const isTooltipShowed = !showCaption && (isDrag || isHover);

    return (
        <Tooltip
            forcedIsHovered={isTooltipShowed}
            targetRef={markRef}
            tooltip={getLabel(value, labelFormatter, { min, max, step, orientation, placement: 'tooltip' })}
            placement={'top'}
            paperStyle={TooltipStyle}
            ref={tooltipRef}>
            <Mark
                onMouseDown={handleMouseDown}
                onMouseOut={handleMouseOut}
                onMouseOver={handleMouseOver}
                {...{
                    barLength,
                    barWidth,
                    className,
                    color,
                    labelFormatter,
                    markCircleStyle: controlMarkCircleStyle,
                    markLabelStyle: controlMarkLabelStyle,
                    max,
                    min,
                    orientation,
                    ref: markRef,
                    showCaption,
                    value,
                    variant
                }}
            />
        </Tooltip>
    );
};

ControlMark.propTypes = {
    barLength: PropTypes.number,
    barWidth: PropTypes.number,
    color: PropTypes.string,
    // Array index of the current mark. Or false if not applicable.
    index: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    labelFormatter: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    max: PropTypes.number,
    controlMarkCircleStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    controlMarkLabelStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    min: PropTypes.number,
    // Callback that fires when mark is moving
    onControlMarkMove: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    step: PropTypes.number,
    value: PropTypes.number,
    variant: PropTypes.oneOf(['sm', 'lg'])
};

ControlMark.defaultProps = {
    disabled: false,
    index: false,
    value: 0,
    variant: 'lg'
};

export default ControlMark;
