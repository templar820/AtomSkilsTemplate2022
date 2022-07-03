import { useCallback } from 'react';
import { parse as fnsParse } from 'date-fns';

import { getTimeFormat, formatForField } from '../../utils';

const formatStringToDate = (dateString, params) =>
    fnsParse(dateString, getTimeFormat({ prefix: 'dd.MM.yyyy', ...params }), new Date());

const checkAndFormatFieldValue = (value, prevDate, params) => {
    if (!value || value === getTimeFormat({ prefix: '__.__.____', ...params, placeholderChar: '_' })) return null;

    const date = formatStringToDate(value, params);

    return isNaN(date) || formatForField(prevDate, params) === value ? prevDate : date;
};

const useFieldChangeHandler = (setValues, type, params = {}) =>
    useCallback(
        ({ target: { value } }) => {
            if (type !== 'date' && type !== 'time') {
                const dates = value.split(' - ');

                setValues((prevValues) => {
                    const startDate = checkAndFormatFieldValue(dates[0], prevValues.startDate, params);
                    const endDate = checkAndFormatFieldValue(dates[1], prevValues.endDate, params);
                    const reverse = startDate && endDate && startDate > endDate;

                    return startDate === prevValues.startDate && endDate === prevValues.endDate
                        ? prevValues
                        : {
                              ...prevValues,
                              startDate: !reverse ? startDate : endDate,
                              endDate: !reverse ? endDate : startDate
                          };
                });
            } else {
                setValues((prevValues) => {
                    if (type === 'time') {
                        params.prefix = '';
                    }
                    const date = checkAndFormatFieldValue(value, prevValues.date, params);
                    return date === prevValues.date ? prevValues : { ...prevValues, date };
                });
            }
        },
        [type]
    );

export { useFieldChangeHandler };
