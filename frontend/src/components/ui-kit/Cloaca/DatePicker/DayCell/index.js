/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { startOfDay, format, isSameDay, isAfter, isBefore, endOfDay } from 'date-fns';
import { withColors } from 'lib-root/components/utils';

import {
    StyledPreview,
    StyledSelection,
    StyledDayNumber,
    StyledDay,
    StyledDaySpan,
    StyledTodaySpan,
    StyledDayWrapper
} from './units';

import Clocks from './Clocks';
import { setClassName } from 'lib-root/utils/styleMixins';

class DayCell extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            active: false,
            hover: false,
            clickTimer: null
        };

        this.handleMouseEvent = this.handleMouseEvent.bind(this);
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
        this.renderSelectionPlaceholders = this.renderSelectionPlaceholders.bind(this);
        this.renderPreviewPlaceholder = this.renderPreviewPlaceholder.bind(this);
    }

    handleKeyEvent = (event) => {
        const { day, onMouseDown, onMouseUp } = this.props;
        switch (event.key) {
            case 'Space':
            case 'Enter':
                if (event.type === 'keydown') {
                    onMouseDown({ day, event });
                } else {
                    onMouseUp({ day, event });
                }
                break;
            default:
                break;
        }
    };
    resetTimer = () => {
        clearTimeout(this.state.clickTimer);
        this.setState({ clickTimer: null });
    };
    checkTimer = () => {
        if (this.state.clickTimer) {
            this.resetTimer();
            this.props.closePicker();
        } else {
            this.setState({
                clickTimer: setTimeout(() => {
                    this.resetTimer();
                }, 500)
            });
        }
    };

    handleMouseEvent = (event) => {
        const {
            day,
            disabled,
            onPreviewChange,
            onMouseEnter,
            onMouseDown,
            onMouseUp,
            useCssHover,
            closeOnDoubleDateClick
        } = this.props;
        const stateChanges = {};
        if (disabled) {
            onPreviewChange({});
            return;
        }

        // Prevents unnecessary clicks on mouse buttons
        if (event.button) return;

        switch (event.type) {
            case 'mouseenter':
                onMouseEnter({ day });
                onPreviewChange({ day });
                if (!useCssHover) stateChanges.hover = true;
                break;
            case 'blur':
            case 'mouseleave':
                if (!useCssHover) {
                    stateChanges.active = false;
                    stateChanges.hover = false;
                }
                break;
            case 'mousedown':
            case 'touchstart':
                if (closeOnDoubleDateClick) this.checkTimer();
                stateChanges.active = true;
                onMouseDown({ day, event });
                break;
            case 'mouseup':
            case 'touchend':
                stateChanges.active = false;
                onMouseUp({ day, event });
                break;
            case 'focus':
                onPreviewChange({ day });
                break;
            default:
                break;
        }
        if (Object.keys(stateChanges).length) {
            this.setState(stateChanges);
        }
    };

    timePanelCall = (event) => {
        const { ranges, day, date, displayMode, onTimePanelCall } = this.props;
        event.persist();
        onTimePanelCall && onTimePanelCall({ event, day, ranges, date, displayMode });
    };

    renderSelectionPlaceholders = ({ active, hover, isPassive, disabled } = {}) => {
        const {
            ranges,
            day,
            isStartOfWeek,
            isEndOfWeek,
            isStartOfMonth,
            isEndOfMonth,
            colors,
            displayMode,
            date,
            withTime,
            dateOptions,
            isTimeChange,
            clocksRef
        } = this.props;

        if (displayMode === 'date') {
            let isSelected = isSameDay(day, date);
            return isSelected ? (
                <>
                    <StyledSelection
                        {...{ color: colors[this.props.color] || this.props.color, active, hover, disabled }}
                    />
                    {withTime && (
                        <Clocks
                            color={isTimeChange ? colors.secondary : undefined}
                            onClick={this.timePanelCall}
                            {...{ date, dateOptions, isTimeChange, clocksRef }}
                        />
                    )}
                </>
            ) : null;
        }

        const inRanges = ranges.reduce((result, range) => {
            let startDate = range.startDate;
            let endDate = range.endDate;
            if (startDate && endDate && isBefore(endDate, startDate)) {
                [startDate, endDate] = [endDate, startDate];
            }
            startDate = startDate ? endOfDay(startDate) : null;
            endDate = endDate ? startOfDay(endDate) : null;
            const isInRange = isAfter(day, startDate) && isBefore(day, endDate);
            const isStartEdge = !isInRange && isSameDay(day, startDate);
            const isEndEdge = !isInRange && isSameDay(day, endDate);
            if (isInRange || isStartEdge || isEndEdge) {
                return [
                    ...result,
                    {
                        isStartEdge,
                        isEndEdge: isEndEdge,
                        isInRange,
                        isStartOfWeek,
                        isEndOfWeek,
                        isStartOfMonth,
                        isEndOfMonth,
                        active,
                        ...range
                    }
                ];
            }
            return result;
        }, []);

        return inRanges.map(({ isStartEdge, isEndEdge, isInRange, color, startDate, endDate, isTimeChange }, i) => (
            <React.Fragment key={i}>
                <StyledSelection
                    key={i}
                    {...{
                        isStartEdge,
                        isPassive,
                        isEndEdge,
                        isInRange,
                        color: colors[color] || color || colors[this.props.color] || this.props.color,
                        isStartOfWeek,
                        isEndOfWeek,
                        isStartOfMonth,
                        isEndOfMonth,
                        active,
                        disabled
                    }}
                />
                {withTime && isEndEdge && !isPassive && (
                    <Clocks
                        onClick={this.timePanelCall}
                        range={{ startDate, endDate }}
                        {...{ dateOptions, clocksRef }}
                        color={
                            isTimeChange
                                ? colors.secondary
                                : colors[color] || color || colors[this.props.color] || this.props.color
                        }
                    />
                )}
            </React.Fragment>
        ));
    };

    renderPreviewPlaceholder = ({ active, hover, isPassive } = {}) => {
        const {
            preview,
            day,
            isStartOfWeek,
            isEndOfWeek,
            isStartOfMonth,
            isEndOfMonth,
            colors,
            previewStyle
        } = this.props;
        if (!preview || (!preview.startDate && !preview.endDate)) return null;
        const startDate = preview.startDate ? endOfDay(preview.startDate) : null;
        const endDate = preview.endDate ? startOfDay(preview.endDate) : null;
        const isInRange = (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
        const isStartEdge = !isInRange && isSameDay(day, startDate);
        const isEndEdge = !isInRange && isSameDay(day, endDate);
        return (
            <StyledPreview
                {...{
                    isStartEdge,
                    isInRange,
                    isEndEdge,
                    active,
                    hover,
                    isPassive,
                    colors,
                    isStartOfWeek,
                    isEndOfWeek,
                    isStartOfMonth,
                    isEndOfMonth,
                    previewStyle,
                    isPreview: true
                }}
            />
        );
    };

    inRangeDay = (focusedRangeIndex) => {
        const { ranges, day } = this.props;

        return ranges.reduce((result, range, index) => {
            let startDate = range.startDate;
            let endDate = range.endDate;
            if (startDate && endDate && isBefore(endDate, startDate)) {
                [startDate, endDate] = [endDate, startDate];
            }
            startDate = startDate ? endOfDay(startDate) : null;
            endDate = endDate ? startOfDay(endDate) : null;
            const isInRange = isAfter(day, startDate) && isBefore(day, endDate);
            const isStartEdge = !isInRange && isSameDay(day, startDate);
            const isEndEdge = !isInRange && isSameDay(day, endDate);
            const isInFocusedRange = index === focusedRangeIndex;
            if (isInRange || isStartEdge || isEndEdge) {
                return [
                    ...result,
                    {
                        isStartEdge,
                        isEndEdge: isEndEdge,
                        isInRange,
                        isInFocusedRange,
                        ...range
                    }
                ];
            }
            return result;
        }, []);
    };

    render() {
        const { active, hover } = this.state;
        const {
            isToday,
            isPassive,
            isEndOfWeek,
            isStartOfWeek,
            isStartOfMonth,
            isEndOfMonth,
            focusedRange,
            disabled,
            color,
            day,
            date,
            colors,
            monthWithSelectedDate,
            valueStyle,
            useCssHover,
            previewStyle,
            previewSize,
            noDatesSelected,
            allDatesSelected,
            scroll,
            showPreview
        } = this.props;
        const isSelected = isSameDay(day, date);
        const rangeData = this.inRangeDay(focusedRange[0]);
        const bothDatesSelected = rangeData.every((rng) => rng.startDate && rng.endDate);
        const [{ isInRange, isStartEdge, isEndEdge, isInFocusedRange } = {}] = rangeData || [];
        return (
            <StyledDayWrapper
                aria-selected={(isInRange || isStartEdge || isEndEdge) && isInFocusedRange}
                aria-disabled={isPassive || disabled}
                className={setClassName({ name: 'day-cell' })}
                {...{
                    isPassive,
                    colors,
                    isSelected,
                    disabled,
                    bothDatesSelected,
                    noDatesSelected,
                    allDatesSelected,
                    isEndOfWeek,
                    monthWithSelectedDate,
                    isStartOfWeek,
                    isStartOfMonth,
                    isEndOfMonth,
                    previewStyle,
                    previewSize,
                    showPreview,
                    scroll
                }}>
                <StyledDay
                    type="button"
                    onMouseEnter={this.handleMouseEvent}
                    onMouseLeave={this.handleMouseEvent}
                    onMouseDown={this.handleMouseEvent}
                    onMouseUp={this.handleMouseEvent}
                    onFocus={this.handleMouseEvent}
                    onBlur={this.handleMouseEvent}
                    onPauseCapture={this.handleMouseEvent}
                    onKeyDown={this.handleKeyEvent}
                    onKeyUp={this.handleKeyEvent}
                    {...(disabled || isPassive ? { tabIndex: -1 } : {})}
                    {...{ isPassive, isSelected, disabled, colors }}
                    style={{ color: colors[color] || color }}>
                    {this.renderSelectionPlaceholders({ active, hover, isPassive, disabled })}
                    {!useCssHover && this.renderPreviewPlaceholder({ active, hover, isPassive, colors })}
                    {isToday && (
                        <StyledTodaySpan
                            {...{
                                colors,
                                active,
                                hover,
                                isSelected,
                                isPassive,
                                isInRange,
                                isStartEdge,
                                isEndEdge,
                                disabled
                            }}
                        />
                    )}
                    <StyledDayNumber
                        {...{
                            active,
                            hover,
                            isSelected,
                            isToday,
                            isPassive,
                            isInRange,
                            isStartEdge,
                            isEndEdge,
                            colors
                        }}>
                        <StyledDaySpan
                            {...{
                                isSelected,
                                isToday,
                                isPassive,
                                isInRange,
                                isStartEdge,
                                isEndEdge,
                                colors,
                                disabled,
                                valueStyle
                            }}>
                            {format(day, 'd')}
                        </StyledDaySpan>
                    </StyledDayNumber>
                </StyledDay>
            </StyledDayWrapper>
        );
    }
}

export const rangeShape = PropTypes.shape({
    /** Start date of range */
    startDate: PropTypes.object,
    /** End date of range */
    endDate: PropTypes.object,
    /** Specific color for current range */
    color: PropTypes.string,
    /** Key for range to search and rerender */
    key: PropTypes.string,
    /** if true then calendar focused on this range */
    autoFocus: PropTypes.bool,
    /** If true when current range can't move and can't be changed */
    disabled: PropTypes.bool,
    /** If true when current inputs of ranges not showing */
    showDateDisplay: PropTypes.bool
});

DayCell.propTypes = {
    /** Date value for this cell */
    day: PropTypes.object.isRequired,
    /** Date value of selected date  */
    date: PropTypes.object,
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges: PropTypes.arrayOf(rangeShape),
    /** Preview range */
    preview: PropTypes.shape({
        /** Start of preview */
        startDate: PropTypes.object,
        /** End of preview */
        endDate: PropTypes.object
    }),
    /** Custom emotion styles to day label, if func - func(props) */
    valueStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Custom emotion styles to preview on day, if func - func(props) */
    previewStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Callback fires then preview change, func({ day }) */
    onPreviewChange: PropTypes.func,
    /** If true when it shows what this day is not interactive */
    disabled: PropTypes.bool,
    /** If true when it shows what this day is not in this month */
    isPassive: PropTypes.bool,
    /** If true when it shows what this day is today */
    isToday: PropTypes.bool,
    /** If true when it shows what this day is in weekend */
    isWeekend: PropTypes.bool,
    /** If true when it shows what this day is monday */
    isStartOfWeek: PropTypes.bool,
    /** If true when it shows what this day is sunday */
    isEndOfWeek: PropTypes.bool,
    /** If true when it shows what this day is first day of month */
    isStartOfMonth: PropTypes.bool,
    /** If true when it shows what this day is last day of month */
    isEndOfMonth: PropTypes.bool,
    /** Color for date label */
    color: PropTypes.string,
    /** Shows is calendar shows date or ranges */
    displayMode: PropTypes.oneOf(['dateRange', 'date']),
    /** Callback fires then mouse down in day zone, func({ day }) */
    onMouseDown: PropTypes.func,
    /** Callback fires then mouse up in day zone, func({ day }) */
    onMouseUp: PropTypes.func,
    /** Callback fires then mouse enter to day zone, func({ day }) */
    onMouseEnter: PropTypes.func,
    /** Callback fires then user call time choose , func({ event, day, displayMode, date, ranges }) */
    onTimePanelCall: PropTypes.func,
    /** Defines is current calendar has time picker or not */
    withTime: PropTypes.bool,
    /** Object of date-fns options */
    dateOptions: PropTypes.object,
    /** Defines is user change time or not */
    isTimeChange: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
};

DayCell.defaultProps = {
    onMouseUp: () => null,
    onMouseDown: () => null,
    onMouseEnter: () => null,
    onTimePanelCall: () => null,
    onPreviewChange: () => null
};

export default withColors(DayCell);
