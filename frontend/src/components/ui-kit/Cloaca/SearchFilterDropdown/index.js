import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import SearchFilter from 'lib-ui/SearchFilter';
import Dropdown from 'lib-ui/Dropdown';
import Icon from 'lib-ui/InlineIcons';
import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';
import { resolveProps } from 'lib-root/utils';

const SearchFilterDropdown = ({
    onOk,
    options,
    dropdownProps,
    filterWrapStyles,
    icon,
    iconWidth,
    iconHeight,
    iconColor,
    disable,
    disabled,
    triggerElement,
    ...restProps
}) => {
    const colors = useContext(ColorsContext);
    const _disabled = resolveProps(disabled, disable);

    return (
        <Dropdown
            triggerElement={
                triggerElement || (
                    <Icon
                        color={_disabled ? colors.GrayScale_200 : iconColor}
                        icon={icon}
                        w={iconWidth}
                        h={iconHeight}
                    />
                )
            }
            {...{ disableTriggerElement: _disabled, ...dropdownProps }}>
            <SearchFilter
                {...{ onOk, options, filterWrapStyles, ...restProps }}
                className={setClassName({ props: restProps, name: 'search-filter-dropdown' })}
            />
        </Dropdown>
    );
};

SearchFilterDropdown.displayName = 'SearchFilterDropdown';
SearchFilterDropdown.propTypes = {
    /** Props for Dropdown */
    dropdownProps: PropTypes.object,
    /** Options for SearchFilter */
    options: PropTypes.array,
    /** Callback fires on ok press */
    onOk: PropTypes.func.isRequired,
    /** Icon  for dd trigger */
    icon: PropTypes.string,
    /** Ane node to override default icon */
    triggerElement: PropTypes.node,
    /** icon  color */
    iconColor: PropTypes.string,
    /** icon  width */
    iconWidth: PropTypes.string,
    /** icon  height */
    iconHeight: PropTypes.string,
    /** Styles for SearchFilter wrapper */
    filterWrapStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Put loader in select */
    isLoading: PropTypes.bool,
    /** Defines whether trigger will react on user actions */
    disabled: PropTypes.bool
};

SearchFilterDropdown.defaultProps = {
    dropdownProps: { gap: 10 },
    options: [],
    filterWrapStyles: { padding: '0 16px;', minWidth: 378 },
    icon: 'Funnel',
    iconWidth: '24px',
    iconHeight: '24px',
    isLoading: false,
    disabled: false,

    onOk: () => {}
};

export default SearchFilterDropdown;
