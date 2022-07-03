// Compares array or primitive
import { useCallback, useEffect, useRef } from 'react';

// Compares values. You can compare arrays or primitives.
export const compareValues = (val1, val2) => {
    if (typeof val1 !== typeof val2) return false;

    if (Array.isArray(val1)) {
        return val1.every((value, index) => value === val2[index]);
    }

    return val1 === val2;
};

// Converts value from pixels offset to points
export const convertPixelsToPoints = ({ length, max, min, value }) => {
    // if !length or min === max return min position
    if (!length || max === min) return min;

    const fraction = value / length;

    return fraction * (max - min);
};

// Converts value from points to pixel offset
export const convertPointsToPixels = ({ length, max, min, value }) => {
    // if min === max return start position
    if (max === min) return 0;

    const fraction = (value - min) / (max - min);

    return fraction * length;
};

// Returns the length of the decimal number
export const getDecimalsLength = (step) => {
    // convert to array
    let result = `${step}`.split('.');

    // if not float
    if (result.length < 2) return 0;

    // return length of decimals
    return result[1].length;
};

// Returns label for value
export const getLabel = (value, formatter, formatterArgs) =>
    typeof formatter === 'function' ? formatter({ value, ...formatterArgs }) : `${value}${formatter}`;

// HOF, which returns function with defined orientation
export const isVerticalWrap = (orientation) => () => orientation === 'vertical';

// Normalizes value by preventing exceeding max or min.
export const normalize = ({ max, min, value }) => (value > max ? max : value < min ? min : value);

export const useDragListener = ({
    barLength,
    index,
    isDrag,
    isVertical,
    max,
    min,
    mouseStart,
    onControlMarkMove,
    setIsDrag,
    startPosition
}) => {
    const onControlMarkMoveRef = useRef(onControlMarkMove);
    onControlMarkMoveRef.current = onControlMarkMove;
    const handleMouseMove = useCallback(
        ({ type, clientX: x, clientY: y }) => {
            if (type === 'mousemove') {
                const offset = isVertical() ? mouseStart - y : x - mouseStart;
                const value = startPosition + convertPixelsToPoints({ length: barLength, max, min, value: offset });

                if (onControlMarkMoveRef.current) {
                    onControlMarkMoveRef.current(normalize({ max, min, value }), index);
                }
            } else {
                setIsDrag(false);
            }
        },
        [mouseStart, startPosition, barLength, max, min, index, isVertical, setIsDrag]
    );

    useEffect(() => {
        if (isDrag) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseMove);
        };
    }, [isDrag]);
};
