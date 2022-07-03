import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface SearchFilterDropdownProps {
    /** Props for Dropdown */
    dropdownProps?: object;
    /** Options for SearchFilter */
    options?: Array<object>;
    /** Callback fires on ok press */
    onOk: (values: Array<object>, dropdownControls: object) => void;
    /** Ane node to override default icon */
    triggerElement?: React.ReactNode;
    /** Icon  for dd trigger */
    icon?: string;
    /** icon  color */
    iconColor?: string;
    /** icon  width */
    iconWidth?: string;
    /** icon  height */
    iconHeight?: string;
    /** Styles for SearchFilter wrapper */
    filterWrapStyles?: EmotionStylesType;
    /** Put loader in select */
    isLoading?: boolean;
    /** Defines whether trigger will react on user actions */
    disabled?: boolean;
}

declare const SearchFilterDropdown: React.ComponentType<SearchFilterDropdownProps>;

export default SearchFilterDropdown;
