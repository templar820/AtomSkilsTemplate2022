import { useCallback, useEffect, useRef, useState } from 'react';
import config from 'lib-root/components/Curtain/config';

const callFn = (fn, size) => {
    if (typeof fn === 'function') fn({ size });
};
const useDragUpdater = (onDragStart, onDragEnd, curtainRef, vertical) => {
    const [isDragging, _setIsDragging] = useState(false);
    const setIsDragging = useCallback(
        (payload) => {
            const size = curtainRef.current.style[vertical ? 'height' : 'width'];
            callFn(payload ? onDragStart : onDragEnd, size);
            _setIsDragging(payload);
        },
        [onDragStart, onDragEnd, vertical]
    );
    return [isDragging, setIsDragging];
};

function useDragHandler(position, max, min, curtainRef, setSize, onDragStart, onDragEnd) {
    const { vertical, inverse } = config.position[position];
    const [isDragging, setIsDragging] = useDragUpdater(onDragStart, onDragEnd, curtainRef, vertical);
    const mouseListener = useCallback(
        ({ type, clientX: x, clientY: y }) => {
            const size = calcPercent(vertical ? y : x, curtainRef, max, min, vertical, inverse) + '%';
            if (type === 'mousemove') {
                setSize(size);
            } else setIsDragging(false);
        },
        [position, max, min, setSize]
    );

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', mouseListener);
            document.addEventListener('mouseup', mouseListener);
        }
        return () => {
            document.removeEventListener('mousemove', mouseListener);
            document.removeEventListener('mouseup', mouseListener);
        };
    }, [isDragging]);

    return [isDragging, setIsDragging];
}

function trimValue(value, min, max) {
    if (value < min) return min;
    return value > max ? max : value;
}

function calcPercent(mousePosition, curtainRef, max, min, vertical = true, inverse = true) {
    const { left, top, width, height } = curtainRef.current.parentElement.getBoundingClientRect();
    const containerPosition = vertical ? top : left;
    const containerSide = vertical ? height : width;

    const percent = trimValue(((mousePosition - containerPosition) * 100) / containerSide, 0, 100);
    return trimValue(inverse ? 100 - percent : percent, min, max);
}

const useCurtainRef = (forwardedRef) => {
    const ref = useRef();
    const setRef = useCallback(
        (element) => {
            ref.current = element;
            switch (typeof forwardedRef) {
                case 'object':
                    if (forwardedRef) forwardedRef.current = element;
                    break;
                case 'function':
                    forwardedRef(element);
            }
        },
        [forwardedRef]
    );
    return [ref, setRef];
};

export { trimValue, calcPercent, useDragHandler, useCurtainRef };
