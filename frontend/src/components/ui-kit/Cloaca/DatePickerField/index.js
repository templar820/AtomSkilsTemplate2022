import React, { useCallback, useMemo, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import { DateField, PickerDropdown, Picker } from './units';
import { isEmptyValue, setEmptyValues } from './utils';

import Field from 'lib-ui/Field';
import { setClassName } from 'lib-root/utils/styleMixins';
import { omitPropTypes, useStateController } from 'lib-root/utils';

/**
 * Компонент используется как триггер `DatePicker` по фокусу и отображения выбранного диапазона.
 */
const DatePickerField = React.forwardRef(
    (
        {
            className,
            closeOnDateSelect,
            closeOnDoubleDateClick,
            type,
            date,
            range,
            isClearable,
            isControlled,
            dropdownProps,
            pickerProps,
            onChange,
            onOpen,
            onClose,
            disabled,
            withTime,
            showHours,
            showMinutes,
            showSeconds,
            triggerStyle,
            timePanelHeaderDateFormat,
            ...restProps
        },
        ref
    ) => {
        const { value: values, handler: setValues } = useStateController({
            value: useMemo(() => ({ date, ...range }), [date, range]),
            callback: onChange,
            isControlled
        });

        const dropdownRef = useRef();
        const clearIconRef = useRef();
        const setIsOpen = useCallback(
            (newState) => {
                const { dropdownControls: { setIsOpenMain } = {} } = dropdownRef.current || {};
                if (typeof setIsOpenMain === 'function') setIsOpenMain(newState);
            },
            [dropdownRef]
        );
        const handleIsOpenChange = useCallback(
            (isOpen) => {
                const callback = isOpen ? onOpen : onClose;
                if (callback) callback();
            },
            [onOpen, onClose]
        );

        const clearable = useMemo(() => (isEmptyValue(values) ? false : isClearable), [values, isClearable]);
        const clearHandler = useCallback(() => clearable && setEmptyValues(setValues), [clearable, setValues]);

        useImperativeHandle(
            ref,
            () => ({
                reset: clearHandler,
                setIsOpen: setIsOpen
            }),
            [clearHandler, setIsOpen]
        );

        const renderDateField = ({ isOpenMain }) => (
            <DateField
                {...{
                    isOpen: isOpenMain,
                    clearHandler,
                    clearIconRef,
                    type,
                    values,
                    disabled,
                    withTime,
                    setValues,
                    showHours,
                    showMinutes,
                    showSeconds,
                    isClearable: clearable,
                    ...restProps
                }}
            />
        );

        const renderDatePicker = () => (
            <Picker
                {...{
                    withTime,
                    showHours,
                    showMinutes,
                    showSeconds,
                    timePanelHeaderDateFormat,
                    zIndex: dropdownProps.zIndex,
                    setValues,
                    setIsOpen,
                    values,
                    type,
                    closeOnDateSelect,
                    closeOnDoubleDateClick,
                    actionAfterClick: () => setIsOpen(false),
                    ...pickerProps
                }}
            />
        );

        return (
            <PickerDropdown
                {...{
                    dropdownRef,
                    triggerElement: renderDateField,
                    handleIsOpenChange,
                    ignoreClicksOnRefs: [clearIconRef],
                    disabled,
                    triggerStyle,
                    ...dropdownProps
                }}
                className={setClassName({ props: restProps, name: 'date-picker-field' })}>
                {renderDatePicker}
            </PickerDropdown>
        );
    }
);

DatePickerField.displayName = 'DatePickerField';
DatePickerField.propTypes = {
    ...omitPropTypes(Field.propTypes, ['value']),
    /** Defines what type of DatePicker will be used */
    type: PropTypes.oneOf(['date', 'range', 'rangePicker', 'time']),
    /** Defines if DatePicker's dropdown will be closed when date is selected */
    closeOnDateSelect: PropTypes.bool,
    /** Allows to close DatePicker's dropdown on double click on date */
    closeOnDoubleDateClick: PropTypes.bool,
    /** Defines will the Field react on user actions */
    disabled: PropTypes.bool,
    /** Default value for date type Picker */
    date: PropTypes.object,
    /** Default values for range types Pickers, { startDate, endDate } */
    range: PropTypes.object,
    /** Defines callback that will be used on valid dates change, func(values) */
    onChange: PropTypes.func,
    /** Defines callback that will be used when dropdown opens, func() */
    onOpen: PropTypes.func,
    /** Defines callback that will be used when dropdown closes, func() */
    onClose: PropTypes.func,
    /** Other props that should be implement to the Dropdown component */
    dropdownProps: PropTypes.object,
    /** Other props that should be implement to the Picker component */
    pickerProps: PropTypes.object,
    /** Activate clear button */
    isClearable: PropTypes.bool,
    /** Toggle control mode */
    isControlled: PropTypes.bool,
    /** Activate time mode */
    withTime: PropTypes.bool,
    /** Defines whether show hours */
    showHours: PropTypes.bool,
    /** Defines whether show minutes */
    showMinutes: PropTypes.bool,
    /** Defines whether show seconds */
    showSeconds: PropTypes.bool,
    /** Used to throw styles into a dropdown trigger */
    triggerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Time format for TimePanel header */
    timePanelHeaderDateFormat: PropTypes.string
};

DatePickerField.defaultProps = {
    type: 'range',
    disabled: false,
    isClearable: false,
    isControlled: false,
    date: null,
    range: {
        startDate: null,
        endDate: null
    },
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    dropdownProps: {},
    fieldProps: {},
    pickerProps: {},
    triggerStyles: { marginBottom: 30 }
};

export default DatePickerField;
