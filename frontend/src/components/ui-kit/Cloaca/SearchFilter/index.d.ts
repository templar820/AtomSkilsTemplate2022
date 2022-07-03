import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { ComponentClass } from 'react';

export interface SearchFilterProps {
    /** Callback fires on ok press */
    onOk: (
        values: Array<object>,
        dropdownControls: object,
        meta: { event: MouseEvent; select: ComponentClass }
    ) => void;
    /** Select option array */
    options: Array<object>;
    /** Array of multi values */
    values?: Array<object>;
    /** Turn on clearAll mode */
    isClearable?: boolean;
    /** Create new item for select */
    create?: boolean;
    /** Turn on autosuggest mode */
    autoSuggest?: boolean;
    /** Turn on highlight mode */
    highlight?: boolean;
    /** Turn on search mode */
    isSearchable?: boolean;
    /** Turn on multiselect mode */
    multi?: boolean;
    /** Turn on loading Field mode */
    isLoading?: boolean;
    /** Stay Select open all time or not */
    keepOpen?: boolean;
    /** Icon image */
    fieldIcon?: string;
    /** Icon width */
    fieldIconWidth?: string;
    /** Icon height */
    fieldIconHeight?: string;
    /** Callback fired on every search change */
    onSearchChange?: () => void;
    /** Callback fired on select open */
    onDropdownOpen?: () => void;
    /** Callback fired on select close */
    onDropdownClose?: () => void;
    /** Callback fired on clear all selected options call */
    onClearAll?: (event: React.MouseEvent, dropdownControls: object) => void;
    /** Callback fired on select all options call */
    onSelectAll?: () => void;
    /** Wrapper styles */
    filterWrapStyles?: EmotionStylesType;
}

declare const SearchFilter: React.ComponentType<SearchFilterProps>;

export default SearchFilter;
