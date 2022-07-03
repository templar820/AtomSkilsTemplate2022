import React, { useMemo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import defaultLocale from 'date-fns/locale/ru';

import { withColors } from 'lib-ui/utils';

import { StyledWrap, StyledPickersWrap, StyledOkSection, StyledTimePicker } from './units';
import TimePanelHeader from './TimePanelHeader';
import TimePicker from '../TimePicker';
import { setClassName } from 'lib-root/utils/styleMixins';

import { timePanelElementChoiceFunc, onFocusElementFunc, FOCUSED_ELEMENT_NAME } from './utils';

const TimePanel = ({
    className,
    months,
    values,
    value,
    colors,
    isOkBtn,
    onOk,
    pickersCount: _pickersCount,
    hideHeader,
    onChange,
    closeOnOk,
    onClose,
    dropdownControls,
    focusedPicker: focusedPickerProps,
    okBtnLabel,
    dateOptions,
    headerProps,
    timePanelHeaderDateFormat,
    ...rest
}) => {
    const pickersCount = useMemo(() => months || _pickersCount || values.length || 1, [months, values]);
    const [timeValues, setValues] = useState(value ? [value] : values);
    const [focusedPicker, setFocusedPicker] = useState(0);
    const [elementNum, setElementNum] = useState(0);

    const onChangeTime = useCallback(({ time, index }) => {
        setValues((currentValues) => {
            currentValues.splice(index, 1, time && new Date(time));
            return [...currentValues];
        });
    }, []);

    useEffect(() => {
        setValues(value ? [value] : values);
    }, [value, values]);

    useEffect(() => {
        setFocusedPicker(focusedPickerProps);
    }, [focusedPickerProps]);

    useEffect(() => {
        !isOkBtn && onChange && onChange({ time: timeValues });
    }, [timeValues]);

    useEffect(() => {
        const focusedElement = document.getElementById(FOCUSED_ELEMENT_NAME[elementNum]);
        if (focusedElement) focusedElement.focus();
    }, [elementNum, onOk]);

    const onClickOk = useCallback(() => {
        closeOnOk && onClose && onClose();
        // if its wrap with dropdown
        if (dropdownControls) {
            const { setIsOpenMain } = dropdownControls;
            setIsOpenMain && setIsOpenMain(false);
        }
        onOk ? onOk({ time: timeValues }) : onChange && onChange({ time: timeValues });
    }, [timeValues, onClose]);

    const onFocusElement = onFocusElementFunc({ setElementNum });

    const timePanelElementChoice = timePanelElementChoiceFunc({ elementNum, setElementNum });

    return (
        <StyledWrap {...{ isOkBtn }} className={setClassName({ props: { className }, name: 'time-panel' })}>
            {!hideHeader && (
                <TimePanelHeader
                    {...{
                        colors,
                        timeValues,
                        focusedPicker,
                        dateOptions,
                        dateTimeFormat: timePanelHeaderDateFormat,
                        hideArrows: pickersCount.length === 1,
                        visiblePickers: pickersCount,
                        timePanelElementChoice,
                        onFocusElement,
                        showArrows: timeValues.length !== 1,
                        onArrowClick: ({ direction }) => {
                            setFocusedPicker((state) => (direction === 'left' ? state - 1 : state + 1));
                        },
                        ...headerProps
                    }}
                />
            )}
            <StyledPickersWrap>
                {new Array(pickersCount).fill(1).map((_, i) => {
                    return (
                        <StyledTimePicker
                            key={focusedPicker + i}
                            {...{
                                timePanelElementChoice,
                                onFocusElement,
                                onClickOk,
                                value: timeValues[focusedPicker + i],
                                colors,
                                separator: i > 0,
                                ...rest
                            }}
                            onChange={(params) => onChangeTime({ ...params, index: focusedPicker + i })}
                        />
                    );
                })}
            </StyledPickersWrap>
            {isOkBtn && <StyledOkSection {...{ colors, onClick: onClickOk }}>{okBtnLabel}</StyledOkSection>}
        </StyledWrap>
    );
};
TimePanel.displayName = 'TimePanel';
TimePanel.propTypes = {
    ...TimePicker.propTypes,
    /** Defines show btn to confirm or not */
    isOkBtn: PropTypes.bool,
    /** Defines call cb onClose then user click on ok btn or not */
    closeOnOk: PropTypes.bool,
    /** Defines show header or not */
    hideHeader: PropTypes.bool,
    /** Callback then user choose time and click on Ok btn, func({ time }) */
    onOk: PropTypes.func,
    /** Callback then user choose time, func({ time }) */
    onChange: PropTypes.func,
    /** Callback then user choose time and click on Ok btn and closeOnOk flag is true, func() */
    onClose: PropTypes.func,
    /** Number of timePickers */
    pickersCount: PropTypes.number,
    /** one Date object to pick time */
    value: PropTypes.object,
    /** array of Date objects to pick time */
    values: PropTypes.array,
    /** Index of focused picker (left in view) */
    focusedPicker: PropTypes.number,
    /** Object with option to date-fns */
    dateOptions: PropTypes.object,
    /** Object to pass props direct to TimePicker/Header */
    headerProps: PropTypes.object,
    /** Label on Ok btn */
    okBtnLabel: PropTypes.string,
    /** Time format for TimePanel header */
    timePanelHeaderDateFormat: PropTypes.string
};

TimePanel.defaultProps = {
    isOkBtn: true,
    pickersCount: 1,
    focusedPicker: 0,
    values: [],
    okBtnLabel: 'Выбрать время',
    dateOptions: { locale: defaultLocale }
};

export default withColors(TimePanel);
