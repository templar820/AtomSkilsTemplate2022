import { format } from 'date-fns';
import { isEqual } from 'lib-root/utils';

const BLANK_DATE = { date: null, startDate: null, endDate: null };

const getTimeFormat = ({ prefix = '', withTime, showHours, showMinutes, showSeconds, placeholderChar }) => {
    let format = '';
    if (showHours) {
        format = format.concat('HH');
    }
    if (showMinutes) {
        if (format.length) {
            format = format.concat(':');
        }
        format = format.concat('mm');
    }
    if (showSeconds) {
        if (format.length) {
            format = format.concat(':');
        }
        format = format.concat('ss');
    }
    if (placeholderChar) {
        format = format.replace(/[^(.|:)]/g, placeholderChar);
    }
    return prefix ? (withTime ? prefix.concat(' ').concat(format) : prefix) : format;
};

const formatForField = (date, params = {}) =>
    date
        ? format(date, getTimeFormat({ prefix: 'dd.MM.yyyy', ...params }))
        : getTimeFormat({ prefix: '__.__.____', ...params, placeholderChar: '_' });
const formatForFieldTime = (date, params = {}) =>
    date ? format(date, getTimeFormat({ ...params })) : getTimeFormat({ ...params, placeholderChar: '_' });

const createDateValueForPicker = ({ date }) => ({ date });
const createTimeValueForPicker = ({ date }) => {
    return { value: date };
};
const createRangeValueForPicker = ({ startDate, endDate }) => ({
    ranges: [{ startDate, endDate, showDateDisplay: false }]
});

const createDateValueForField = ({ date }, params) => formatForField(date, params);
const createTimeValueForField = ({ date }, params) => formatForFieldTime(date, params);
const createRangeValueForField = ({ startDate, endDate }, params) =>
    `${formatForField(startDate, params)} - ${formatForField(endDate, params)}`;

const isEmptyValue = (values) => isEqual(values, BLANK_DATE);

const setEmptyValues = (setValues) => setValues(BLANK_DATE);

export {
    getTimeFormat,
    formatForField,
    createDateValueForPicker,
    createTimeValueForPicker,
    createRangeValueForPicker,
    createDateValueForField,
    createRangeValueForField,
    createTimeValueForField,
    isEmptyValue,
    setEmptyValues
};
