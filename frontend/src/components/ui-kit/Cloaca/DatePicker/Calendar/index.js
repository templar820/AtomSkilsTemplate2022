import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import { isEqual } from 'lib-root/utils';

import {
    addMonths,
    isSameDay,
    isEqual as isDateTimeEqual,
    addYears,
    setYear,
    setMonth,
    differenceInCalendarMonths,
    startOfMonth,
    endOfMonth,
    addDays,
    isSameMonth,
    differenceInDays,
    min,
    max
} from 'date-fns';
import defaultLocale from 'date-fns/locale/ru';

import { rangeShape } from '../DayCell';
import WeekDays from '../WeekDays';
import Month from '../Month';
import TimeDrawer from '../TimeDrawer';
import MonthAndYear from './units/MonthAndYear';
import DateDisplay from './units/DateDisplay';

import { calcFocusDate, getMonthDisplayRange, setNewDate } from '../utils';

import { StyledCalendarWrapper, StyledInfiniteWrapper, StyledMonths } from './units';
import { withColors } from 'lib-ui/utils';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * `Calendar` используется для выбора дат и временных периодов.
 *
 * import { DatePicker as DatePickerComponents } from 'core-lib-react/components';
 *
 * const { DateRangePicker, DefinedRange, TimePicker, TimePanel, DateRange, Calendar } = DatePickerComponents;
 */
class Calendar extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.changeShownDate = this.changeShownDate.bind(this);
        this.focusToDate = this.focusToDate.bind(this);
        this.updateShownDate = this.updateShownDate.bind(this);
        this.onDragSelectionStart = this.onDragSelectionStart.bind(this);
        this.onDragSelectionEnd = this.onDragSelectionEnd.bind(this);
        this.onDragSelectionMove = this.onDragSelectionMove.bind(this);
        this.updatePreview = this.updatePreview.bind(this);
        this.estimateMonthSize = this.estimateMonthSize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.onSetTime = this.onSetTime.bind(this);
        this.onPreviewChange = this.onPreviewChange.bind(this);
        this.listSizeCache = {};
        this.clocksRef = React.createRef();
        this.state = {
            focusedDate: calcFocusDate(null, props),
            drag: {
                status: false,
                range: { startDate: null, endDate: null },
                disablePreview: false,
                isTimeOpen: false
            },
            timeRange: [],
            isTimeChange: props.displayMode === 'date' ? false : [],
            dateOptions: { locale: props.locale },
            scrollArea: Calendar.calcScrollArea(props),
            useCssHover: props.months === 1 && (!props.scroll || !props.scroll.enabled),
            ranges: []
        };
    }
    static calcScrollArea(props) {
        const { direction, months, scroll } = props;
        if (!scroll.enabled) return { enabled: false };

        const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
        if (direction === 'vertical') {
            return {
                enabled: true,
                monthHeight: scroll.monthHeight || 272,
                longMonthHeight: longMonthHeight || 310,
                calendarWidth: 'auto',
                calendarHeight: (scroll.calendarHeight || longMonthHeight || 310) * months
            };
        }
        return {
            enabled: true,
            monthWidth: scroll.monthWidth || 306,
            calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 306) * months,
            monthHeight: 'auto' || longMonthHeight || 316,
            calendarHeight: longMonthHeight || 362
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const ranges = nextProps.ranges.map((range, i) => ({
            ...range,
            isTimeChange:
                nextProps.isTimeChange &&
                nextProps.isTimeChange.length &&
                nextProps.isTimeChange.findIndex((item) => i === item) >= 0,
            color:
                nextProps.colors[range.color] ||
                range.color ||
                nextProps.colors[nextProps.rangeColors[i]] ||
                nextProps.rangeColors[i] ||
                nextProps.colors[nextProps.color] ||
                nextProps.color
        }));
        if (!isEqual(prevState.ranges, ranges)) {
            return { ranges };
        }
        return null;
    }

    focusToDate(date, props = this.props, preventUnnecessary = true) {
        if (!props.scroll.enabled) {
            this.setState({ focusedDate: date });
            return;
        }
        const targetMonthIndex = differenceInCalendarMonths(date, props.minDate, this.state.dateOptions);
        const visibleMonths = this.list.getVisibleRange();
        if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
        this.list.scrollTo(targetMonthIndex);
        this.setState({ focusedDate: date });
    }
    closePickerOnDateSelect = () => {
        const { displayMode, ranges, closePicker, closeOnDoubleDateClick } = this.props;
        if (displayMode === 'dateRange' && !closeOnDoubleDateClick)
            ranges[0].startDate && ranges[0].endDate && closePicker();
        if (displayMode === 'date' || closeOnDoubleDateClick) closePicker();
    };
    updateShownDate(props = this.props) {
        const newProps = props.scroll.enabled
            ? {
                  ...props,
                  months: this.list.getVisibleRange().length
              }
            : props;
        const newFocus = calcFocusDate(this.state.focusedDate, newProps);
        this.focusToDate(newFocus, newProps);
        if (props.closeOnDateSelect && props.closePicker && !props.closeOnDoubleDateClick)
            this.closePickerOnDateSelect();
    }
    updatePreview({ day: val } = {}) {
        if (!this.state.useCssHover) {
            if (!val) {
                this.setState({ preview: null });
                return;
            }
            const preview = {
                startDate: val,
                endDate: val,
                color: this.props.color
            };
            this.setState({ preview });
        }
    }
    componentDidMount() {
        if (this.props.scroll.enabled) {
            // prevent react-list's initial render focus problem
            setTimeout(() => this.focusToDate(this.state.focusedDate), 1);
        }

        this.setState(() => ({
            timeRange: this.props.ranges.reduce(
                (result, item) => [
                    ...result,
                    item.startDate ? new Date(item.startDate) : item.startDate,
                    item.endDate ? new Date(item.endDate) : item.endDate
                ],
                []
            )
        }));
    }
    componentDidUpdate(prevProps) {
        const propMapper = {
            dateRange: 'ranges',
            date: 'date'
        };
        const targetProp = propMapper[prevProps.displayMode];
        if (this.props.locale !== prevProps.locale) {
            this.setState({ dateOptions: { locale: this.props.locale } });
        }
        if (JSON.stringify(this.props.scroll) !== JSON.stringify(prevProps.scroll)) {
            this.setState({ scrollArea: Calendar.calcScrollArea(this.props) });
        }
        if (!isEqual(prevProps[targetProp], this.props[targetProp])) {
            this.updateShownDate();
        }
        if (prevProps.displayMode !== this.props.displayMode) {
            this.setState((state, props) => ({
                isTimeChange: props.displayMode !== 'date' ? [] : false
            }));
        }
        if (!isEqual(this.props.ranges, prevProps.ranges)) {
            this.setState(() => ({
                timeRange: this.props.ranges.reduce(
                    (result, item) => [
                        ...result,
                        item.startDate ? new Date(item.startDate) : item.startDate,
                        item.endDate ? new Date(item.endDate) : item.endDate
                    ],
                    []
                )
            }));
        }
    }
    changeShownDate(value, mode = 'set') {
        const { focusedDate } = this.state;
        const { onShownDateChange, minDate, maxDate } = this.props;
        const modeMapper = {
            monthOffset: () => addMonths(focusedDate, value),
            setMonth: () => setMonth(focusedDate, value),
            setYear: () => setYear(focusedDate, value),
            set: () => value
        };
        const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);
        this.focusToDate(newDate, this.props, false);
        onShownDateChange && onShownDateChange({ date: newDate });
    }

    handleScroll() {
        const { onShownDateChange, minDate } = this.props;
        const visibleMonths = this.list.getVisibleRange();
        // prevent scroll jump with wrong visible value
        if (visibleMonths[0] === undefined) return;
        const visibleMonth = addMonths(minDate, visibleMonths[0] || 0);
        const isFocusedToDifferent = !isSameMonth(visibleMonth, this.state.focusedDate);
        if (isFocusedToDifferent) {
            this.setState({ focusedDate: visibleMonth });
            onShownDateChange && onShownDateChange({ date: visibleMonth });
        }
    }

    getRangeDate(newValue = {}) {
        const { ranges, focusedRange } = this.props;
        const focusedRangeIndex = focusedRange[0];
        const selectedRange = ranges[focusedRangeIndex] || {};

        return {
            startDate: selectedRange.startDate
                ? setNewDate(selectedRange.startDate, newValue.startDate)
                : newValue.startDate,
            endDate: selectedRange.endDate ? setNewDate(selectedRange.endDate, newValue.endDate) : newValue.endDate
        };
    }

    onDragSelectionStart({ day: date, event } = {}) {
        const { date: currentDate, onChange, dragSelectionEnabled } = this.props;
        if (
            this.clocksRef.current &&
            (this.clocksRef.current === event.target || this.clocksRef.current.contains(event.target))
        ) {
            return;
        }

        if (dragSelectionEnabled) {
            this.setState({
                drag: {
                    status: true,
                    range: this.getRangeDate({ startDate: date, endDate: date }),
                    disablePreview: true
                }
            });
        } else {
            onChange({ date: setNewDate(currentDate, date) });
        }
    }

    toggleTimePanel = (value) => {
        this.setState((state) => ({
            isTimeOpen: typeof value === 'boolean' ? value : !state.isTimeOpen
        }));
    };

    onDragSelectionEnd({ day: date, event } = {}) {
        const { date: currentDate, updateRange, displayMode, onChange, dragSelectionEnabled } = this.props;
        if (
            this.clocksRef.current &&
            (this.clocksRef.current === event.target || this.clocksRef.current.contains(event.target))
        ) {
            return;
        }

        if (!dragSelectionEnabled) return;

        if (displayMode === 'date' || !this.state.drag.status) {
            onChange({ date: setNewDate(currentDate, date) });
            return;
        }
        const newRange = this.getRangeDate({
            startDate: this.state.drag.range.startDate,
            endDate: date
        });
        if (displayMode !== 'dateRange' || isSameDay(newRange.startDate, date)) {
            this.setState({ drag: { status: false, range: {} } }, () => onChange({ date }));
        } else {
            this.setState({ drag: { status: false, range: {} } }, () => {
                updateRange({ range: newRange });
            });
        }
    }
    onDragSelectionMove({ day: date } = {}) {
        const { drag } = this.state;
        if (!drag.status || !this.props.dragSelectionEnabled) return;
        this.setState({
            drag: {
                status: drag.status,
                range: { startDate: drag.range.startDate, endDate: date },
                disablePreview: true
            }
        });
    }

    estimateMonthSize(index, cache) {
        const { direction, minDate } = this.props;
        const { scrollArea, dateOptions } = this.state;
        if (cache) {
            this.listSizeCache = cache;
            if (cache[index]) return cache[index];
        }
        if (direction === 'horizontal') return scrollArea.monthWidth;
        const monthStep = addMonths(minDate, index);
        const { start, end } = getMonthDisplayRange(monthStep, dateOptions);
        const isLongMonth = differenceInDays(end, start, dateOptions) + 1 > 7 * 5;
        return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
    }

    onSetTime = ({ isOpen, time = [] }) => {
        const { updateRange, displayMode, onChange, ranges, onTimeChange } = this.props;

        this.toggleTimePanel(isOpen);

        if (displayMode === 'date') {
            if (!this.state.isTimeChange) {
                this.setState(() => ({ isTimeChange: true }));
            }

            onTimeChange && onTimeChange({ date: time[0] });
            onChange({ date: time[0], timeChange: true });
            return;
        }

        const newRanges = time.reduce(
            function(result, value, index, array) {
                if (index % 2 === 0) {
                    const newCurrentRange = array.slice(index, index + 2);
                    const currentRange = ranges[index % 2];
                    if (
                        !isDateTimeEqual(newCurrentRange[0], currentRange.startDate) ||
                        !isDateTimeEqual(newCurrentRange[1], currentRange.endDate)
                    ) {
                        this.setState((state) => ({ isTimeChange: [...state.isTimeChange, index % 2] }));
                    }
                    result.push({ ...currentRange, startDate: newCurrentRange[0], endDate: newCurrentRange[1] });
                }
                return result;
            }.bind(this),
            []
        );

        newRanges.forEach((item, index) => {
            onTimeChange && onTimeChange({ range: item, index });
            updateRange({ range: item, timeChange: true, index });
        });
    };

    onPreviewChange() {
        this.props.onPreviewChange && this.props.onPreviewChange({});
    }

    get previewSize() {
        const { isDefinedRange, moveRangeOnFirstSelection, ranges } = this.props;
        const focusedRange = this.props.focusedRange || this.state.focusedRange;

        if (!isDefinedRange || !moveRangeOnFirstSelection || focusedRange[1] !== 0) return 0;

        const { startDate, endDate } = ranges[focusedRange[0]];
        return differenceInDays(endDate, startDate);
    }

    render() {
        const {
            closeOnDoubleDateClick,
            showDateDisplay,
            scroll,
            direction,
            disabledDates,
            maxDate,
            minDate,
            className,
            withTime,
            isDefinedRange,
            date
        } = this.props;
        const { scrollArea, focusedDate, dateOptions, isTimeOpen, timeRange, isTimeChange, ranges } = this.state;
        const isVertical = direction === 'vertical';
        return (
            <StyledCalendarWrapper
                {...{ className, isDefinedRange }}
                onMouseUp={() => this.setState({ drag: { status: false, range: {} } })}
                onMouseLeave={() => {
                    this.setState({ drag: { status: false, range: {} } });
                }}
                className={setClassName({ props: this.props, name: 'calendar' })}>
                {showDateDisplay && <DateDisplay {...this.state} {...this.props} />}
                <MonthAndYear {...{ focusedDate, changeShownDate: this.changeShownDate }} {...this.props} />
                {scroll.enabled ? (
                    <div>
                        {isVertical && <WeekDays {...{ dateOptions }} />}
                        <StyledInfiniteWrapper
                            {...{ isVertical }}
                            onMouseLeave={this.onPreviewChange}
                            style={{
                                width: isVertical ? scrollArea.calendarWidth + 11 : scrollArea.calendarWidth,
                                height: scrollArea.calendarHeight + 11
                            }}
                            onScroll={this.handleScroll}>
                            <ReactList
                                length={differenceInCalendarMonths(
                                    endOfMonth(maxDate),
                                    addDays(startOfMonth(minDate), -1),
                                    dateOptions
                                )}
                                treshold={500}
                                type="variable"
                                ref={(target) => (this.list = target)}
                                itemSizeEstimator={this.estimateMonthSize}
                                axis={isVertical ? 'y' : 'x'}
                                itemRenderer={(index, key) => {
                                    const monthStep = addMonths(minDate, index).toString();
                                    return (
                                        <Month
                                            {...this.props}
                                            {...(closeOnDoubleDateClick && {
                                                closePicker: this.closePickerOnDateSelect
                                            })}
                                            {...{ isVertical, ranges, key, dateOptions, isTimeChange }}
                                            onPreviewChange={this.props.onPreviewChange || this.updatePreview}
                                            preview={
                                                !this.state.useCssHover
                                                    ? this.props.preview || this.state.preview
                                                    : null
                                            }
                                            previewSize={this.previewSize}
                                            drag={this.state.drag}
                                            clocksRef={this.clocksRef}
                                            disabledDates={disabledDates}
                                            month={monthStep}
                                            onDragSelectionStart={this.onDragSelectionStart}
                                            onDragSelectionEnd={this.onDragSelectionEnd}
                                            onDragSelectionMove={this.onDragSelectionMove}
                                            onMouseLeave={this.onPreviewChange}
                                            styles={this.styles}
                                            style={
                                                isVertical
                                                    ? { height: this.estimateMonthSize(index) }
                                                    : {
                                                          height: scrollArea.monthHeight,
                                                          width: this.estimateMonthSize(index)
                                                      }
                                            }
                                            onTimePanelCall={this.toggleTimePanel}
                                            useCssHover={this.state.useCssHover}
                                            x
                                            showMonthName
                                            showWeekDays={!isVertical}
                                        />
                                    );
                                }}
                            />
                        </StyledInfiniteWrapper>
                    </div>
                ) : (
                    <StyledMonths {...{ isVertical, className: setClassName({ name: 'months' }) }}>
                        {new Array(this.props.months).fill(1).map((_, i) => {
                            const monthStep = addMonths(this.state.focusedDate, i).toString();
                            return (
                                <Month
                                    {...this.props}
                                    {...(closeOnDoubleDateClick && {
                                        closePicker: this.closePickerOnDateSelect
                                    })}
                                    {...{ isVertical, ranges, disabledDates, dateOptions, isTimeChange }}
                                    onPreviewChange={this.props.onPreviewChange || this.updatePreview}
                                    preview={!this.state.useCssHover ? this.props.preview || this.state.preview : null}
                                    previewSize={this.previewSize}
                                    key={i}
                                    drag={this.state.drag}
                                    clocksRef={this.clocksRef}
                                    month={monthStep}
                                    onDragSelectionStart={this.onDragSelectionStart}
                                    onDragSelectionEnd={this.onDragSelectionEnd}
                                    onDragSelectionMove={this.onDragSelectionMove}
                                    onMouseLeave={this.onPreviewChange}
                                    styles={this.styles}
                                    useCssHover={this.state.useCssHover}
                                    onTimePanelCall={this.toggleTimePanel}
                                    showWeekDays={!isVertical || i === 0}
                                    showMonthName={!isVertical || i > 0}
                                />
                            );
                        })}
                    </StyledMonths>
                )}
                {withTime && (
                    <TimeDrawer
                        {...this.props}
                        {...{
                            values: timeRange,
                            value: date,
                            isOpen: isTimeOpen,
                            onOk: this.onSetTime
                        }}
                    />
                )}
            </StyledCalendarWrapper>
        );
    }
}

Calendar.displayName = 'Calendar';
Calendar.propTypes = {
    /** If true when buttons of next/prev months showing */
    showMonthArrows: PropTypes.bool,
    /** If true when selects to month and year showing */
    showMonthAndYearPickers: PropTypes.bool,
    /** Array of disabled dates */
    disabledDates: PropTypes.array,
    /** Min available date */
    minDate: PropTypes.object,
    /** Max available date */
    maxDate: PropTypes.object,
    /** Current date to show */
    date: PropTypes.object,
    /** Callback fires then range change, func({ date }) */
    onChange: PropTypes.func,
    /** Callback fires then preview change, func({ day }) */
    onPreviewChange: PropTypes.func,
    /** Callback fired then client pick new range (if multiply ranges), or start pick new, func({range: [rangesIndex, rangeItemIndex]}) */
    onRangeFocusChange: PropTypes.func,
    /** Date-fns locale */
    locale: PropTypes.object,
    /** Date what showing right now in calendar */
    shownDate: PropTypes.object,
    /** Callback fired when showDate change, func({ date }) */
    onShownDateChange: PropTypes.func,
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges: PropTypes.arrayOf(rangeShape),
    /** Preview range */
    preview: PropTypes.shape({
        /** Start of preview */
        startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        /** End of preview */
        endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    }),
    dateDisplayFormat: PropTypes.string,
    /** Show which ranges are in focus */
    /** 0-index value represents which range of ranges is in focus */
    /** 1-index value represents if range is editing:
     * -- 0 - not editing (range selection is not started)
     * -- 1 - editing (one date of range selected) */
    focusedRange: PropTypes.arrayOf(PropTypes.number),
    /** Init to ranges are in focus */
    initialFocusedRange: PropTypes.arrayOf(PropTypes.number),
    /** Number of shown months  */
    months: PropTypes.number,
    /** ClassName to wrapper component to style by styled */
    className: PropTypes.string,
    /** If true when all inputs of ranges not showing */
    showDateDisplay: PropTypes.bool,
    /** If true when time picker turn on */
    withTime: PropTypes.bool,
    /** If set to true when preview (hover effect of dates) showing */
    showPreview: PropTypes.bool,
    /** Mode of how to pick dates */
    displayMode: PropTypes.oneOf(['dateRange', 'date']),
    /** Color for chosen date */
    color: PropTypes.string,
    /** Callback fired when range updates after two dates chosen, func({ range }) */
    updateRange: PropTypes.func,
    /** Object of infinity scroll settings */
    scroll: PropTypes.shape({
        /** If set to true when infinity scroll enabled */
        enabled: PropTypes.bool,
        /** Month height in px */
        monthHeight: PropTypes.number,
        /** Max month height in px */
        longMonthHeight: PropTypes.number,
        /** Month width in px */
        monthWidth: PropTypes.number,
        /** Calendar width in px */
        calendarWidth: PropTypes.number,
        /** Calendar height in px */
        calendarHeight: PropTypes.number
    }),
    /** Direction of infinity scroll */
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    /** Render func witch change month/year selects and arrows, func({ focusedDate, changeShownDate, ...restProps }) */
    navigatorRenderer: PropTypes.func,
    /** Array of colors for all ranges */
    rangeColors: PropTypes.arrayOf(PropTypes.string),
    /** if set to true when selected ranges can be dragged */
    dragSelectionEnabled: PropTypes.bool,
    /** if set to true when wrapper position set to unset and this, flag show is here defined range or not */
    isDefinedRange: PropTypes.bool,
    /** Defines zIndex for selects */
    zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** CallBack on time pick call before onChange, func({ range, date }) */
    onTimeChange: PropTypes.func
};

Calendar.defaultProps = {
    showMonthArrows: true,
    showMonthAndYearPickers: true,
    disabledDates: [],
    locale: defaultLocale,
    ranges: [],
    focusedRange: [0, 0],
    dateDisplayFormat: 'MMM d, yyyy',
    showDateDisplay: false,
    showPreview: true,
    displayMode: 'date',
    months: 1,
    color: 'primary',
    withTime: false,
    scroll: {
        enabled: false
    },
    direction: 'horizontal',
    maxDate: addYears(new Date(), 20),
    minDate: addYears(new Date(), -100),
    rangeColors: ['primary', 'primaryAccent', 'info'],
    dragSelectionEnabled: true,
    onRangeFocusChange: () => null,
    updateRange: () => null,
    onChange: () => null
};

export default withColors(Calendar);
