import {
    addMonths,
    areIntervalsOverlapping,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    getYear,
    getMonth,
    getDate,
    setYear,
    setMonth,
    setDate
} from 'date-fns';

const calcFocusDate = function(currentFocusedDate, props) {
    const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
    // find primary date according the props
    let targetInterval;
    if (displayMode === 'dateRange') {
        const range = ranges[focusedRange[0]] || {};
        targetInterval = {
            start: range.startDate,
            end: range.endDate
        };
    } else {
        targetInterval = {
            start: date,
            end: date
        };
    }
    targetInterval.start = startOfMonth(targetInterval.start || new Date());
    targetInterval.end = endOfMonth(targetInterval.end || targetInterval.start);
    const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

    // initial focus
    if (!currentFocusedDate) return shownDate || targetDate;

    // // just return targetDate for native scrolled calendars
    // if (props.scroll.enabled) return targetDate;
    const currentFocusInterval = {
        start: startOfMonth(currentFocusedDate),
        end: endOfMonth(addMonths(currentFocusedDate, months - 1))
    };
    if (areIntervalsOverlapping(targetInterval, currentFocusInterval)) {
        // don't change focused if new selection in view area
        return currentFocusedDate;
    }
    return targetDate;
};

const findNextRangeIndex = function(ranges, currentRangeIndex = -1) {
    const nextIndex = ranges.findIndex(
        (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
    );
    if (nextIndex !== -1) return nextIndex;
    return ranges.findIndex((range) => range.autoFocus !== false && !range.disabled);
};

const getMonthDisplayRange = function(date, dateOptions) {
    const startDateOfMonth = startOfMonth(date, dateOptions);
    const endDateOfMonth = endOfMonth(date, dateOptions);
    const startDateOfCalendar = startOfWeek(startDateOfMonth, dateOptions);
    const endDateOfCalendar = endOfWeek(endDateOfMonth, dateOptions);
    return {
        start: startDateOfCalendar,
        end: endDateOfCalendar,
        startDateOfMonth,
        endDateOfMonth
    };
};

const setNewDate = (value, newValue) => {
    if (!value) {
        return newValue;
    }
    const year = getYear(newValue);
    const month = getMonth(newValue);
    const day = getDate(newValue);
    const withYear = setYear(value, year);
    const withMonth = setMonth(withYear, month);
    const withDay = setDate(withMonth, day);
    return new Date(withDay);
};

export { calcFocusDate, findNextRangeIndex, getMonthDisplayRange, setNewDate };
