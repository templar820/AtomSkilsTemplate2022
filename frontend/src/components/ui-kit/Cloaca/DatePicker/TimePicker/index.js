import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { startOfDay } from 'date-fns';

import { withColors } from 'lib-ui/utils';

import TimeList from './TimeList';

import { TimePickWrapper } from './units';

import { parseDateToTimeObject, onTimeItemClick, getTimeItems, timePanelKeyControlFunc } from './utils';

import { HOURS_COUNT, MINUTES_LENGTH, SECONDS_LENGTH } from './config';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Используется для выбора времени.
 *
 * import { DatePicker as DatePickerComponents } from 'core-lib-react/components';
 *
 * const { DateRangePicker, DefinedRange, TimePicker, TimePanel, DateRange, Calendar } = DatePickerComponents;
 */
const TimePicker = React.forwardRef(
    (
        {
            wrapperStyle,
            listWrapperStyles,
            colors,
            value,
            isControlled,
            onChange: callback,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            showHours,
            showMinutes,
            showSeconds,
            className,
            onClickOk,
            timePanelElementChoice,
            onFocusElement,
            ...rest
        },
        forwardedRef
    ) => {
        const hoursItems = getTimeItems(HOURS_COUNT);
        const minutesItems = getTimeItems(MINUTES_LENGTH);
        const secondsItems = getTimeItems(SECONDS_LENGTH);

        const [currentValue, setValue] = useState(value);

        useEffect(() => {
            setValue(value);
        }, [value]);

        const { hours, minutes, seconds } = parseDateToTimeObject({ value: currentValue });

        const timePanelKeyControl = timePanelKeyControlFunc({ onClickOk });

        return (
            <TimePickWrapper
                onKeyDown={(event) => timePanelElementChoice({ event })}
                {...{ wrapperStyle, ref: forwardedRef }}
                className={setClassName({ props: { className }, name: 'time-picker' })}>
                {showHours && (
                    <TimeList
                        {...{
                            tabIndex: 3,
                            id: 'hours',
                            items: hoursItems,
                            disabledItems: disabledHours,
                            activeItem: hours,
                            timePanelKeyControl,
                            timePanelElementChoice,
                            onFocus: () => onFocusElement({ elNum: 2 }),
                            onItemClick: onTimeItemClick({
                                method: 'hours',
                                currentValue,
                                setValue,
                                isControlled,
                                callback
                            })
                        }}
                        {...rest}
                    />
                )}
                {showMinutes && (
                    <TimeList
                        {...{
                            tabIndex: 4,
                            id: 'minutes',
                            items: minutesItems,
                            disabledItems: disabledMinutes,
                            activeItem: minutes,
                            timePanelKeyControl,
                            timePanelElementChoice,
                            onFocus: () => onFocusElement({ elNum: 3 }),
                            onItemClick: onTimeItemClick({
                                method: 'minutes',
                                currentValue,
                                setValue,
                                isControlled,
                                callback
                            })
                        }}
                        {...rest}
                    />
                )}
                {showSeconds && (
                    <TimeList
                        {...{
                            tabIndex: 5,
                            id: 'seconds',
                            items: secondsItems,
                            disabledItems: disabledSeconds,
                            activeItem: seconds,
                            timePanelKeyControl,
                            timePanelElementChoice,
                            onFocus: () => onFocusElement({ elNum: 4 }),
                            onItemClick: onTimeItemClick({
                                method: 'seconds',
                                currentValue,
                                setValue,
                                isControlled,
                                callback
                            })
                        }}
                        {...rest}
                    />
                )}
            </TimePickWrapper>
        );
    }
);

TimePicker.displayName = 'TimePicker';
TimePicker.propTypes = {
    ...TimeList.propTypes,
    /** Data object current value to picker */
    value: PropTypes.object,
    /** Emotion styles applied to the wrapper of component. Overrides default. */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles applied to the list wrapper of component. Overrides default. */
    listWrapperStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Callback fired then time change, func({ time }) */
    onChange: PropTypes.func,
    /** Defines is component controlled or not */
    isControlled: PropTypes.bool,
    /** Defines whether show hours */
    showHours: PropTypes.bool,
    /** Defines whether show minutes */
    showMinutes: PropTypes.bool,
    /** Defines whether show seconds */
    showSeconds: PropTypes.bool,
    /** Defines whether show disabled items or not */
    hideDisabledOptions: PropTypes.bool,
    /** Array with disabled hour */
    disabledHours: PropTypes.array,
    /** Array with disabled minutes */
    disabledMinutes: PropTypes.array,
    /** Array with disabled seconds */
    disabledSeconds: PropTypes.array,
    /** Defines height of TimePicker */
    maxNumberOfVisibleOptions: PropTypes.number,
    /** Defines class to wrapper */
    className: PropTypes.string,
    /** Saves the number of the selected item */
    onFocusElement: PropTypes.func,
    /** Focusing on an item using buttons */
    timePanelElementChoice: PropTypes.func,
    /** Controlling a component using buttons */
    timePanelKeyControl: PropTypes.func
};
TimePicker.defaultProps = {
    value: startOfDay(new Date()),
    maxNumberOfVisibleOptions: 6,
    showHours: true,
    showMinutes: true,
    showSeconds: true
};

export default withColors(TimePicker);
