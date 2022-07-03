import React from 'react';

import SearchFilterDropdown from 'lib-ui/SearchFilterDropdown';
import {
    createClearAllHandler,
    createOnChangeHandler,
    createOnOkHandler,
    createOnSearchChangeHandler,
    getDropdownSettings
} from './utils';

import Icon from '../Icon';

const SearchFilter = React.forwardRef(
    (
        {
            currentFilter,
            options,
            value,
            updateFilter,
            closeOnOutsideClick,
            closeOnOk,
            filterOnOptionPick,
            revertOnCancel,
            setValue,
            closeOnCancel,
            stableFilter,
            showDropdown,
            filterOnType,
            icon = 'Search',
            iconWidth = '16px',
            iconHeight = '16px',
            onOk,
            onCancel,
            virtualization,
            isActive,
            ...restProps
        },
        ref
    ) => {
        return (
            <SearchFilterDropdown
                dropdownProps={{ closeOnOutside: closeOnOutsideClick }}
                triggerElement={
                    <Icon
                        {...{ icon, iconWidth, iconHeight }}
                        isActive={isActive !== undefined ? isActive : !!currentFilter}
                    />
                }
                {...{ options, ref, isSearchable: true, ...restProps }}
                values={currentFilter === undefined && !value ? undefined : [{ label: value, value }]}
                onOk={createOnOkHandler({ updateFilter, value, closeOnOk, onOk })}
                onChange={createOnChangeHandler({
                    updateFilter,
                    filterOnOptionPick,
                    revertOnCancel,
                    setValue,
                    value
                })}
                onClearAll={createClearAllHandler({
                    updateFilter,
                    revertOnCancel,
                    closeOnCancel,
                    stableFilter,
                    onCancel
                })}
                propsForSelect={{
                    ...getDropdownSettings(showDropdown),
                    virtualization,
                    create: false,
                    marginBottom: 0,
                    onSearchChange: createOnSearchChangeHandler({
                        updateFilter,
                        filterOnType,
                        revertOnCancel,
                        setValue,
                        value
                    })
                }}
            />
        );
    }
);

export default SearchFilter;
