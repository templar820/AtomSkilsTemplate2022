import React, { Component } from 'react';
import {
    isBefore,
    differenceInCalendarDays,
    addDays,
    min,
    isWithinInterval,
    max,
    endOfDay,
    startOfDay
} from 'date-fns';
import PropTypes from 'prop-types';
import Calendar from '../Calendar';
import { rangeShape } from '../DayCell';
import { findNextRangeIndex, setNewDate } from '../utils.js';

import { withColors } from 'lib-ui/utils';

/**
 * Используется для выбора диапазона дат.
 *
 * import { DatePicker as DatePickerComponents } from 'core-lib-react/components';
 *
 * const { DateRangePicker, DefinedRange, TimePicker, TimePanel, DateRange, Calendar } = DatePickerComponents;
 */
class DateRange extends Component {
    constructor(props, context) {
        super(props, context);
        this.setSelection = this.setSelection.bind(this);
        this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
        this.updatePreview = this.updatePreview.bind(this);
        this.updateRangeInCalendar = this.updateRangeInCalendar.bind(this);
        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.changePreview = this.changePreview.bind(this);
        this.calcNewSelection = this.calcNewSelection.bind(this);
        this.state = {
            focusedRange: props.initialFocusedRange || [findNextRangeIndex(props.ranges), 0],
            preview: null,
            isTimeChange: [],
            useCssHover: props.months === 1 && (!props.scroll || !props.scroll.enabled)
        };
    }
    calcNewSelection = (value, isSingleValue = true, timeChange) => {
        const focusedRange = this.props.focusedRange || this.state.focusedRange;
        const { ranges, onChange, maxDate, moveRangeOnFirstSelection, disabledDates } = this.props;
        const focusedRangeIndex = focusedRange[0];
        const isCurrentRangeTimeChange = this.state.isTimeChange.findIndex((item) => item === focusedRangeIndex) >= 0;
        const selectedRange = ranges[focusedRangeIndex];
        if (!selectedRange || !onChange) return {};

        let { startDate, endDate } = selectedRange;

        if (!endDate) endDate = endOfDay(new Date(startDate));
        let nextFocusRange;
        if (!isSingleValue) {
            startDate = timeChange ? value.startDate : setNewDate(startDate, value.startDate);
            endDate = timeChange ? value.endDate : setNewDate(endDate, value.endDate);
        } else if (focusedRange[1] === 0) {
            // startDate selection
            const dayOffset = differenceInCalendarDays(endDate, startDate);
            startDate = timeChange ? value : setNewDate(startDate, value);
            const newEndDate = moveRangeOnFirstSelection ? addDays(value, dayOffset) : value;
            endDate = timeChange ? newEndDate : setNewDate(endDate, newEndDate);
            if (maxDate) {
                const croppedEndDate = min([endDate, maxDate]);
                endDate = timeChange ? timeChange : setNewDate(endDate, croppedEndDate);
            }
            nextFocusRange = [focusedRange[0], 1];
        } else {
            endDate = timeChange ? value : setNewDate(endDate, value);
        }

        // reverse dates if startDate before endDate
        let isStartDateSelected = focusedRange[1] === 0;

        if (!isCurrentRangeTimeChange) {
            startDate = startOfDay(startDate);
            endDate = endOfDay(endDate);
        }

        if (isBefore(endDate, startDate)) {
            isStartDateSelected = !isStartDateSelected;
            if (!isCurrentRangeTimeChange || focusedRange[1] === 1) {
                [startDate, endDate] = [startOfDay(endDate), endOfDay(startDate)];
            } else {
                [startDate, endDate] = [endDate, startDate];
            }
        }

        const inValidDatesWithinRange = disabledDates.filter((disabledDate) =>
            isWithinInterval(disabledDate, {
                start: startDate,
                end: endDate
            })
        );

        if (inValidDatesWithinRange.length > 0) {
            if (isStartDateSelected) {
                startDate = addDays(max(inValidDatesWithinRange), 1);
            } else {
                endDate = addDays(min(inValidDatesWithinRange), -1);
            }
        }

        if (!nextFocusRange) {
            const nextFocusRangeIndex = findNextRangeIndex(this.props.ranges, focusedRange[0]);
            nextFocusRange = [nextFocusRangeIndex, 0];
        }
        return {
            wasValid: !(inValidDatesWithinRange.length > 0),
            range: { startDate, endDate },
            isStartDateSelection: focusedRange[1] === 0,
            nextFocusRange: nextFocusRange
        };
    };
    setSelection(value, isSingleValue = true, timeChange = false) {
        const { onChange, ranges, onRangeFocusChange } = this.props;
        const focusedRange = this.props.focusedRange || this.state.focusedRange;
        const focusedRangeIndex = focusedRange[0];
        const selectedRange = ranges[focusedRangeIndex];

        if (!selectedRange) return;
        const { range, isStartDateSelection, nextFocusRange } = this.calcNewSelection(value, isSingleValue, timeChange);
        onChange &&
            onChange({
                range: {
                    [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
                        ...selectedRange,
                        ...{
                            startDate: range.startDate,
                            endDate:
                                !isStartDateSelection || range.startDate.getDate() !== range.endDate.getDate()
                                    ? range.endDate
                                    : null
                        }
                    }
                },
                isSingleValue
            });
        this.setState({
            focusedRange: nextFocusRange,
            preview: null
        });
        onRangeFocusChange({ range: nextFocusRange });
    }
    handleRangeFocusChange({ range: focusedRange }) {
        this.setState({ focusedRange });
        this.props.onRangeFocusChange({ range: focusedRange });
    }

    setDateTimeSelection = (value, isSingleValue, timeChange = false, index = 0) => {
        if (timeChange) {
            this.setState(
                (state) => ({
                    isTimeChange: [...state.isTimeChange, index]
                }),
                () => this.setSelection(value, isSingleValue, timeChange)
            );
        } else {
            this.setSelection(value, isSingleValue);
        }
    };

    updatePreview(val) {
        if (!val) {
            this.setState({ preview: null });
            return;
        }
        const { rangeColors, ranges, colors, color: mainColor } = this.props;
        const focusedRange = this.props.focusedRange || this.state.focusedRange;
        const color =
            ranges[focusedRange[0]].color ||
            colors[rangeColors[focusedRange[0]]] ||
            rangeColors[focusedRange[0]] ||
            mainColor;
        this.setState({ preview: { ...val.range, color } });
    }

    changePreview({ day }) {
        !this.state.useCssHover && this.updatePreview(day ? this.calcNewSelection(day) : null);
    }

    updateRangeInCalendar({ range, timeChange, index }) {
        this.setDateTimeSelection(range, false, timeChange, index);
    }

    onCalendarChange({ date, timeChange, index }) {
        this.setDateTimeSelection(date, true, timeChange, index);
    }

    render() {
        return (
            <Calendar
                focusedRange={this.state.focusedRange}
                onRangeFocusChange={this.handleRangeFocusChange}
                preview={this.state.preview}
                onPreviewChange={this.changePreview}
                {...this.props}
                displayMode="dateRange"
                onChange={this.onCalendarChange}
                updateRange={this.updateRangeInCalendar}
                ref={(target) => {
                    this.calendar = target;
                }}
            />
        );
    }
}

DateRange.displayName = 'DateRange';
DateRange.propTypes = {
    ...Calendar.propTypes,
    /** Callback on pickup range, func({range: {range1, range2, rangeKey, ....}, isSingleValue}) */
    onChange: PropTypes.func,
    /** Callback fired then client pick new range (if multiply ranges), or start pick new, func({range: [rangesIndex, rangeItemIndex]}) */
    onRangeFocusChange: PropTypes.func,
    /** className to Calendar component */
    className: PropTypes.string,
    /** Defaults/controlled ranges obj, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges: PropTypes.arrayOf(rangeShape),
    /** if set to true, then Calendar move to start range month */
    moveRangeOnFirstSelection: PropTypes.bool
};

DateRange.defaultProps = {
    ranges: [],
    moveRangeOnFirstSelection: false,
    rangeColors: ['primary', 'primaryAccent', 'info'],
    disabledDates: [],
    onRangeFocusChange: () => null
};

export default withColors(DateRange);
