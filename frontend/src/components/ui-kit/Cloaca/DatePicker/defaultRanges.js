import {
    addDays,
    endOfDay,
    startOfDay,
    startOfYear,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    differenceInCalendarDays
} from 'date-fns';
import { declension } from 'lib-root/utils';

const defineDates = {
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    startOfLastWeek: () => startOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
    endOfLastWeek: () => endOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
    startOfToday: () => startOfDay(new Date()),
    endOfToday: () => endOfDay(new Date()),
    startOfYesterday: () => startOfDay(addDays(new Date(), -1)),
    endOfYesterday: () => endOfDay(addDays(new Date(), -1)),
    startOfMonth: () => startOfMonth(new Date()),
    startOfLastMonth: () => startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: () => endOfMonth(addMonths(new Date(), -1)),
    startOfYear: () => startOfYear(new Date())
};

const staticRangeHandler = {
    range: {},
    isSelected(range) {
        const definedRange = this.range();
        return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
    }
};

/**
 * Function creator of static ranges
 * @param ranges
 * @returns {*}
 */
export function createStaticRanges(ranges) {
    return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
}

/**
 * Define all static ranges rules
 */
export const defaultStaticRanges = createStaticRanges([
    {
        id: 'today',
        label: 'Сегодня',
        range: () => ({
            startDate: defineDates.startOfToday(),
            endDate: defineDates.endOfToday()
        })
    },
    {
        id: 'yesterday',
        label: 'Вчера',
        range: () => ({
            startDate: defineDates.startOfYesterday(),
            endDate: defineDates.endOfYesterday()
        })
    },
    {
        id: 'thisWeek',
        label: 'Текущая Неделя',
        range: () => ({
            startDate: defineDates.startOfWeek(),
            endDate: defineDates.endOfToday()
        })
    },
    {
        id: 'lastWeek',
        label: 'Прошлая неделя',
        range: () => ({
            startDate: defineDates.startOfLastWeek(),
            endDate: defineDates.endOfLastWeek()
        })
    },
    {
        id: 'thisMonth',
        label: 'Текущий месяц',
        range: () => ({
            startDate: defineDates.startOfMonth(),
            endDate: defineDates.endOfToday()
        })
    },
    {
        id: 'lastMonth',
        label: 'Прошлый месяц',
        range: () => ({
            startDate: defineDates.startOfLastMonth(),
            endDate: defineDates.endOfLastMonth()
        })
    },
    {
        id: 'thisYear',
        label: 'Текущий год',
        range: () => ({
            startDate: defineDates.startOfYear(),
            endDate: defineDates.endOfToday()
        })
    },
    {
        id: 'week',
        label: 'Неделя',
        range: () => ({
            startDate: defineDates.startOfToday(),
            endDate: addDays(new Date(), 7)
        })
    },
    {
        id: 'month',
        label: 'Месяц',
        range: () => ({
            startDate: defineDates.startOfToday(),
            endDate: addMonths(new Date(), 1)
        })
    },
    {
        id: 'year',
        label: 'Год',
        range: () => ({
            startDate: defineDates.startOfToday(),
            endDate: addMonths(new Date(), 12)
        })
    }
]);

/**
 * Define all calendar inputs rules
 * @type {*[]}
 */
export const defaultInputRanges = [
    {
        label(value) {
            return `${declension(value, ['предыдущий день', 'предыдущих дня', 'предыдущих дней'])}`;
        },
        range(value) {
            return {
                startDate: addDays(defineDates.startOfToday(), (Math.max(Number(value), 1) - 1) * -1),
                endDate: defineDates.endOfToday()
            };
        },
        getCurrentValue(range) {
            if (!isSameDay(range.endDate, defineDates.endOfToday())) return '';
            if (!range.startDate) return '∞';
            return differenceInCalendarDays(defineDates.endOfToday(), range.startDate) + 1;
        }
    },
    {
        label(value) {
            return `${declension(value, ['последующий день', 'последующих дня', 'последующих дней'])}`;
        },
        disabled: true,
        range(value) {
            const today = new Date();
            return {
                startDate: today,
                endDate: addDays(today, Math.max(Number(value), 1) - 1)
            };
        },
        getCurrentValue(range) {
            if (!isSameDay(range.startDate, defineDates.startOfToday())) return '';
            if (!range.endDate) return '∞';
            return differenceInCalendarDays(range.endDate, defineDates.startOfToday()) + 1;
        }
    }
];
