import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import { getCellValue } from '../utils';
import { useFilterUpdaterCreator } from './utils';
import { Picker } from './units';
import { ControlsContext } from '../utils';

const TableFilter = React.forwardRef(
    (
        {
            showDropdown,
            filterType,
            onChange,
            preventFiltersUpdating,
            customRender,
            disabled,
            value: propValue,
            ...restProps
        },
        ref
    ) => {
        const { colIndex, filters, setFilters, allGrandchildren: { tbody: allRows } = {} } = useContext(
            ControlsContext
        );
        const currentFilter = filters.find(({ byColumn }) => byColumn === colIndex);
        const stableFilter = useRef(currentFilter);

        const [value, setValue] = useState(propValue || (currentFilter && currentFilter.compare));
        useEffect(() => {
            if (propValue) {
                setValue(propValue);
            } else {
                setValue(currentFilter !== undefined ? currentFilter.compare : undefined);
            }
        }, [currentFilter, propValue]);

        const updateFilter = useFilterUpdaterCreator({
            setFilters,
            stableFilter,
            filterType,
            colIndex,
            value,
            onChange,
            preventFiltersUpdating: customRender ? true : preventFiltersUpdating
        });

        const options = useMemo(
            () =>
                !showDropdown && filterType !== 'oneOf'
                    ? []
                    : React.Children.map(allRows || [], (row) => {
                          const original = getCellValue(row, colIndex);
                          const value = String(original);
                          return { label: value, value, original };
                      }),
            [allRows, colIndex, showDropdown]
        );

        return (
            <Picker
                disabled={typeof disabled !== 'undefined' ? disabled : allRows && !allRows.length}
                {...{
                    ref,
                    filterType,
                    currentFilter,
                    options,
                    value,
                    updateFilter,
                    setValue,
                    stableFilter,
                    showDropdown,
                    disabled,
                    customRender,
                    onChange,
                    ...restProps
                }}
            />
        );
    }
);
TableFilter.displayName = 'TableFilter';
TableFilter.propTypes = {
    /** Defines whether dropdown will be shown */
    showDropdown: PropTypes.bool,
    /** Defines filtering rows in the Table right in typing process */
    filterOnType: PropTypes.bool,
    /** Defines filtering rows int Table after picking option in Dropdown */
    filterOnOptionPick: PropTypes.bool,
    /** Defines whether current filter should be changed to the last filter saved by ok */
    revertOnCancel: PropTypes.bool,
    /** Defines closing filter's dropdown on click outside of the component */
    closeOnOutsideClick: PropTypes.bool,
    /** Defines closing select on ok click */
    closeOnCancel: PropTypes.bool,
    /** Defines closing select on close click */
    closeOnOk: PropTypes.bool,
    /** Defines what filter will be used */
    filterType: PropTypes.oneOf(['includes', 'startsWith', 'oneOf']),
    /** Defines name of the icon that will be displayed */
    icon: PropTypes.string,
    /** Defines height of the icon */
    iconHeight: PropTypes.string,
    /** Defines width of the icon */
    iconWidth: PropTypes.string,
    /** Defines callback that will be fired when user changes conditions */
    onChange: PropTypes.func,
    /** Defines callback that will be fired when user presses confirm button */
    onOk: PropTypes.func,
    /** Defines callback that will be fired when user presses abort button */
    onCancel: PropTypes.func,
    /** If set true, Filter wont update filers array of the Table. You could do it manually */
    preventFiltersUpdating: PropTypes.bool,
    /** Indicates whether component will react on user actions.
     * If table has no rows and disabled is not defined, it will be considered as `true` */
    disabled: PropTypes.bool,
    /** For custom checklist, which include custom filter, it's only "oneOf" filter
     * if you use "customRender", "preventFiltersUpdating" always equal true for onChange */
    customRender: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.func]),
    /** If enabled, will be used in rendering of 'includes' and 'startsWith' filters.
     * Recommended to disable, while lists for filter are small (<30-50 records e.g.) */
    virtualization: PropTypes.bool,
    /** Overrides auto highlighting of icon */
    isActive: PropTypes.bool,
    /** Allow to set default value. Also can override previously chosen value */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ])
};
TableFilter.defaultProps = {
    showDropdown: true,
    filterOnType: true,
    filterOnOptionPick: true,
    revertOnCancel: true,
    closeOnOutsideClick: true,
    closeOnCancel: true,
    closeOnOk: true,
    filterType: 'includes',
    preventFiltersUpdating: false,
    virtualization: true
};

export default React.memo(TableFilter);
