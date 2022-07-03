import React from 'react';
import { DateRange, DateRangePicker, Calendar, TimePanel } from 'lib-ui/DatePicker';
import {
    createDateValueForPicker,
    createTimeValueForPicker,
    createRangeValueForPicker,
    createDateValueForField,
    createRangeValueForField,
    createTimeValueForField
} from './utils';

import { dateFn as dateMask, dateTime as dateTimeMask, time as timeMask } from 'lib-root/utils/masks';

const RANGE_SEPARATOR = ' - ';

const rangeMask = (value) => [
    ...dateMask(value),
    ...RANGE_SEPARATOR,
    ...dateMask(value.split(RANGE_SEPARATOR)[1] || value)
];

const rangedDateTimeMask = (params) => (value) => {
    const mask = dateTimeMask(params);
    return [...mask(value), ...RANGE_SEPARATOR, ...mask(value.split(RANGE_SEPARATOR)[1] || value)];
};

const config = {
    types: {
        range: {
            placeholder: 'Выберите нужный период',
            component: DateRange,
            createPickerValue: createRangeValueForPicker,
            createFieldValue: createRangeValueForField,
            mask: ({ withTime, ...params }) => (withTime ? rangedDateTimeMask(params) : rangeMask)
        },
        date: {
            placeholder: 'Выберите дату',
            component: Calendar,
            createPickerValue: createDateValueForPicker,
            createFieldValue: createDateValueForField,
            mask: ({ withTime, ...params }) => (withTime ? dateTimeMask(params) : dateMask)
        },
        rangePicker: {
            placeholder: 'Выберите нужный период',
            component: DateRangePicker,
            createPickerValue: createRangeValueForPicker,
            createFieldValue: createRangeValueForField,
            mask: ({ withTime, ...params }) => (withTime ? rangedDateTimeMask(params) : rangeMask)
        },
        time: {
            placeholder: 'Выберите время',
            component: (props) => <TimePanel hideHeader closeOnOk {...props} />,
            createPickerValue: createTimeValueForPicker,
            createFieldValue: createTimeValueForField,
            mask: (params) => timeMask(params)
        }
    }
};

export default config;
