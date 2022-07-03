import { useCallback } from 'react';

import filtersCreators from 'lib-ui/Table/filters';

const useFilterUpdaterCreator = ({
    setFilters,
    stableFilter,
    filterType,
    colIndex,
    prevValue,
    onChange,
    preventFiltersUpdating
}) =>
    useCallback(
        (value, temp = false) => {
            const handleOnChange = () => {
                if (typeof onChange === 'function') onChange({ value });
            };

            if (preventFiltersUpdating) {
                handleOnChange();
                return;
            }

            if (typeof value === 'function') {
                filterType = value.filterType;
                value = value.compare;
            }

            handleOnChange();

            const newFilter = (value || value === 0) && filtersCreators[filterType](colIndex, value, temp);
            if (!temp) stableFilter.current = newFilter;
            setFilters((filters) => {
                const index = filters.findIndex((filter) => filter.byColumn === colIndex);
                if (newFilter !== false) {
                    return index >= 0
                        ? filters.map((filter, filterIndex) => (filterIndex !== index ? filter : newFilter))
                        : [...filters, newFilter];
                } else {
                    return filters.filter((filter, filterIndex) => filterIndex !== index);
                }
            });
        },
        [setFilters, stableFilter, filterType, colIndex, prevValue, onChange]
    );

export { useFilterUpdaterCreator };
