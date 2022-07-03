import { useCallback, useMemo } from 'react';
import { getHours, getMinutes, getSeconds } from 'date-fns';
import { methodsDict } from './config';
import { debounce } from 'lib-root/utils';

// TODO: hooks naming
const ParseDateToTimeObject = ({ value }) =>
    useMemo(() => {
        if (!value) return {};
        return { hours: getHours(value), minutes: getMinutes(value), seconds: getSeconds(value) };
    }, [value]);

// TODO: hooks naming
const OnTimeItemClick = ({ method, currentValue, setValue, isControlled, callback }) =>
    useCallback(
        ({ newValue, onStateChange = () => {} }) => {
            setValue((prevValue) => {
                const newState = methodsDict[method](prevValue, newValue);
                callback && callback({ time: newState });
                onStateChange && onStateChange();
                return !isControlled ? newState : prevValue;
            });
        },
        [method, currentValue, isControlled, callback]
    );

// TODO: hooks naming
const GetTimeItems = (length) => useMemo(() => new Array(length).fill(1).map((_, index) => index), [length]);

const sumCounterChange = debounce(({ onItemClick, activeItem }) => {
    onItemClick({ newValue: activeItem + sumCounter, onStateChange: () => (sumCounter = 0) });
}, 50);

let sumCounter = 0;

const timePanelKeyControlFunc = ({ onClickOk }) => ({ event, activeItem, onItemClick }) => {
    if (event.nativeEvent.code === 'ArrowDown') {
        event.preventDefault();
        sumCounter++;
        sumCounterChange({ onItemClick, activeItem });
    }
    if (event.nativeEvent.code === 'ArrowUp') {
        event.preventDefault();
        sumCounter--;
        sumCounterChange({ onItemClick, activeItem });
    }

    if (event.nativeEvent.code === 'Enter') {
        debounce(() => onClickOk(), 150)();
    }
};

export {
    timePanelKeyControlFunc,
    ParseDateToTimeObject as parseDateToTimeObject,
    OnTimeItemClick as onTimeItemClick,
    GetTimeItems as getTimeItems
};
