import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    isBefore,
    isSameDay,
    isAfter,
    isWeekend,
    isWithinInterval,
    eachDayOfInterval,
    lightFormat
} from 'date-fns';
import { StyledDayWrapper, previewEnd } from './DayCell/units';
import DayCell, { rangeShape } from './DayCell';
import WeekDays from './WeekDays';

import { withColors } from 'lib-ui/utils';
import { getMonthDisplayRange } from './utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
import { setClassName } from 'lib-root/utils/styleMixins';

const getRangePreview = (props) => {
    let resultingCSS = '';
    const { previewSize } = props;
    let selector = ':not([aria-disabled=true]):hover';
    const addition = '{ opacity: 0.8; }';
    const afterElem = '::after';

    if (previewSize > 0) {
        for (let i = 0; i < previewSize; i++) {
            selector += ' + div';
            resultingCSS += `${selector}${afterElem} ${addition}`;
        }
        return css`
            ${resultingCSS}
            ${selector + afterElem} {
                ${previewEnd(props)}
            }
        `;
    }
};

const StyledMonth = withColors(styled.div`
    width: 306px;
    padding: 0 24px 18px 24px;
    ${StyledDayWrapper} {
        ${({ previewSize, colors }) => getRangePreview({ previewSize, colors })}
    }
    ${({ style, ...restProps }) => applyEmotionStyle(style, restProps)};
`);

const StyledMonthLabel = withColors(styled.div`
    text-align: center;
    font-weight: 500;
    margin-bottom: 14px;
    ${({ isVertical, colors }) =>
        isVertical &&
        css`
            color: ${colors.GrayScale_200};
        `}
`);

const StyledDays = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${({ useCssHover }) =>
        useCssHover
            ? css`
                  &:not(:hover) {
                      ${StyledDayWrapper}::after {
                          opacity: 0 !important;
                      }
                  }
              `
            : css`
                  ${StyledDayWrapper}::after {
                      display: none;
                  }
              `}
`;

const Month = (props) => {
    const {
        customDates,
        dateOptions,
        displayMode,
        focusedRange,
        drag,
        disabledDates,
        isVertical,
        locale,
        minDate: _minDate,
        maxDate: _maxDate,
        month,
        preview,
        previewSize,
        onMouseLeave,
        showPreview: _showPreview,
        showMonthName,
        showWeekDays,
        ranges: _ranges,
        style,
        useCssHover,
        className,
        onDragSelectionStart,
        onDragSelectionEnd,
        onDragSelectionMove
    } = props;

    const customDatesMap = useMemo(() => {
        const updatedMap = {};
        const _customDates = Array.isArray(customDates) ? customDates : [];
        _customDates.forEach((item) => {
            const { date, ...rest } = item;
            if (date) updatedMap[lightFormat(date, 'yyyy-MM-dd')] = rest;
        });
        return updatedMap;
    }, [customDates]);

    const monthWithSelectedDate = useMemo(() => {
        const rng = _ranges.find((rng) => rng.startDate && !rng.endDate);
        let _monthWithSelectedDate = 0;
        if (rng) {
            const monthDisplay = getMonthDisplayRange(new Date(month), dateOptions);
            if (isBefore(rng.startDate, monthDisplay.startDateOfMonth)) {
                _monthWithSelectedDate = 1;
            } else if (isAfter(rng.startDate, monthDisplay.endDateOfMonth)) {
                _monthWithSelectedDate = -1;
            }
        }
        return _monthWithSelectedDate;
    }, [_ranges, month, dateOptions]);

    const ranges = useMemo(() => {
        let ranges = _ranges;
        if (displayMode === 'dateRange' && drag.status) {
            let { startDate, endDate } = drag.range;
            ranges = _ranges.map((range, i) => {
                if (i !== focusedRange[0]) return range;
                return {
                    ...range,
                    startDate,
                    endDate
                };
            });
        }
        return ranges;
    }, [_ranges, displayMode, drag, focusedRange]);

    const now = new Date();
    const minDate = useMemo(() => _minDate && startOfDay(_minDate), [_minDate]);
    const maxDate = useMemo(() => _maxDate && endOfDay(_maxDate), [_maxDate]);
    const monthDisplay = useMemo(() => getMonthDisplayRange(new Date(month), dateOptions), [month, dateOptions]);

    const { startDate, endDate } = ranges.length ? ranges[focusedRange[0]] : {};
    const allDatesSelected = focusedRange[1] === 0;
    const noDatesSelected = !startDate && !endDate;
    const showPreview = _showPreview && !drag.disablePreview;
    return (
        <StyledMonth {...{ style, className, previewSize }}>
            {showMonthName ? (
                <StyledMonthLabel {...{ isVertical, className: setClassName({ name: 'month-label' }) }}>
                    {locale.localize.month(new Date(month).getMonth())} {new Date(month).getFullYear()}
                </StyledMonthLabel>
            ) : null}
            {showWeekDays && (
                <WeekDays
                    dateOptions={dateOptions}
                    style={{ padding: '0 10px' }}
                    className={setClassName({ name: 'week-days' })}
                />
            )}
            <StyledDays
                onMouseLeave={(event) => onMouseLeave({ event })}
                useCssHover={useCssHover}
                className={setClassName({ name: 'days' })}>
                {eachDayOfInterval({
                    start: monthDisplay.start,
                    end: monthDisplay.end
                }).map((day, index) => {
                    const isStartOfMonth = isSameDay(day, monthDisplay.startDateOfMonth);
                    const isEndOfMonth = isSameDay(day, monthDisplay.endDateOfMonth);
                    const isOutsideMinMax = (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate));
                    const disabledSpecifically = disabledDates.some((disabledDate) => isSameDay(disabledDate, day));
                    const customProps = customDatesMap[lightFormat(day, 'yyyy-MM-dd')] || {};
                    return (
                        <DayCell
                            {...props}
                            {...{ noDatesSelected, allDatesSelected }}
                            monthWithSelectedDate={monthWithSelectedDate}
                            ranges={ranges}
                            day={day}
                            showPreview={showPreview}
                            preview={!useCssHover && showPreview ? preview : null}
                            isWeekend={isWeekend(day, dateOptions)}
                            isToday={isSameDay(day, now)}
                            isStartOfWeek={isSameDay(day, startOfWeek(day, dateOptions))}
                            isEndOfWeek={isSameDay(day, endOfWeek(day, dateOptions))}
                            isStartOfMonth={isStartOfMonth}
                            isEndOfMonth={isEndOfMonth}
                            key={index}
                            disabled={isOutsideMinMax || disabledSpecifically}
                            isPassive={
                                !isWithinInterval(day, {
                                    start: monthDisplay.startDateOfMonth,
                                    end: monthDisplay.endDateOfMonth
                                })
                            }
                            onMouseDown={onDragSelectionStart}
                            onMouseUp={onDragSelectionEnd}
                            onMouseEnter={onDragSelectionMove}
                            dragRange={drag.range}
                            drag={drag.status}
                            {...customProps}
                        />
                    );
                })}
            </StyledDays>
        </StyledMonth>
    );
};

Month.displayName = 'Month';
Month.propTypes = {
    /** Styles to wrapper */
    style: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** ClassName to wrapper component to style by styled */
    className: PropTypes.string,
    /** Month to display now */
    month: PropTypes.string,
    /** Drag range objects */
    drag: PropTypes.object,
    /** Options to date-fns format and funcs */
    dateOptions: PropTypes.object,
    /** Array of disabled dates */
    disabledDates: PropTypes.array,
    /** Array of obj: {date: new Date(), ...rest } for customizing direct to day */
    /** Use memoized value to prevent unwanted rerenders */
    customDates: PropTypes.array,
    /** Preview range */
    preview: PropTypes.shape({
        /** Start of preview */
        startDate: PropTypes.object,
        /** End of preview */
        endDate: PropTypes.object
    }),
    /** Show hover effect on day or not */
    showPreview: PropTypes.bool,
    /** If true, infinity scroll on and set to vertical */
    isVertical: PropTypes.bool,
    /** Mode of how to pick dates */
    displayMode: PropTypes.oneOf(['dateRange', 'date']),
    /** Min available date */
    minDate: PropTypes.object,
    /** Max available date */
    maxDate: PropTypes.object,
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges: PropTypes.arrayOf(rangeShape),
    /** Show which ranges are in focus */
    focusedRange: PropTypes.arrayOf(PropTypes.number),
    /** Callback fired then selected range start drag, func({ day }) */
    onDragSelectionStart: PropTypes.func,
    /** Callback fired then selected range end drag, func({ day }) */
    onDragSelectionEnd: PropTypes.func,
    /** Callback fired then selected range continue drag, func({ day }) */
    onDragSelectionMove: PropTypes.func,
    /** Callback fired then user leave days area, func({ event }) */
    onMouseLeave: PropTypes.func,
    /** If true then showing week days */
    showWeekDays: PropTypes.bool,
    /** If true then showing month label on top of days and under week days */
    showMonthName: PropTypes.bool,
    /** Callback fires then user call time choose , func({ event, day, displayMode, date, ranges }) */
    onTimePanelCall: PropTypes.func
};

Month.defaultProps = {
    onDragSelectionStart: () => null,
    onDragSelectionEnd: () => null,
    onDragSelectionMove: () => null,
    onMouseLeave: () => null
};

export default React.memo(Month);
