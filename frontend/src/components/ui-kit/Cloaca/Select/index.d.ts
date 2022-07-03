import * as React from 'react';
import { FieldProps } from 'lib-ui/Field';
import { EmotionStylesType } from 'lib-ui';
import { TreeItemStyleProps, TreeProps } from 'lib-ui/Tree';
import * as PopperJS from '@popperjs/core';
import { DropdownItemStyleProps } from 'lib-ui/Dropdown';

declare type SelectDropdownPosition =
    | 'top'
    | 'bottom'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'auto';

declare type ChipStyle = { chipStyle?: EmotionStylesType };

declare type SelectItemStyle = (TreeItemStyleProps & ChipStyle) | (DropdownItemStyleProps & ChipStyle);

declare type SelectOption = {
    value?: string | number;
    label?: React.ReactNode | ((occurrence?: string) => React.ReactNode);
    disabled?: boolean;
    styles?: SelectItemStyle;
    nativeTitle?: string;
    [key: string]: any;
};

declare type SelectValue = Omit<SelectOption, 'styles'> & { styles?: ChipStyle };

export interface SelectProps extends Omit<FieldProps, 'onFocus' | 'onChange' | 'onBlur'> {
    /** Callback fired on every values change, func: (values, metaInfo) => {} */
    onChange?: (values: object, meta: { clear?: boolean; mount?: boolean }) => void;
    /** Callback fired on every search change, func: (props,state,methods) => {} */
    onSearchChange?: (props: object, state: object, methods: object) => void;
    /** Select options array */
    options: Array<SelectOption>;
    /** Callback fired on select close, func: ({props,state,methods}) => {} */
    onDropdownClose?: (data: { props: object; state: object; methods: object }) => void;
    /** Callback fired on field blur, func: (e = syntheticEvent,{props,state,methods}) => {} */
    onBlur?: (event: React.SyntheticEvent, data: { props: object; state: object; methods: object }) => void;
    /** Callback fired on field focus, func: (e,{props,state,methods}) => {} */
    onFocus?: (data: { props: object; state: object; methods: object }) => void;
    /** Callback fired on search change, func: ({props,state,methods}) => {} */
    searchFn?: (data: { props: object; state: object; methods: object }) => void;
    /** Callback fired to check is search in values or options, func: (search, options, {props,state,methods}) => {} */
    valueExistFn?: (search: string, options: object, data: { props: object; state: object; methods: object }) => void;
    /** Callback fired on create new option, func: (enwValue,{props,state,methods}) => {}*/
    onCreateNew?: (enwValue: string, data: { props: object; state: object; methods: object }) => void;
    /** Callback fired on select open, func: ({props,state,methods}) => {} */
    onDropdownOpen?: (data: { props: object; state: object; methods: object }) => void;
    /** Callback fired on clear all selected options call, func: ({props,state,methods}) => {} */
    onClearAll?: (data: { props: object; state: object; methods: object }) => void;
    /** Callback fired on select all options call, func: ({props,state,methods}) => {} */
    onSelectAll?: (data: { props: object; state: object; methods: object }) => void;
    /** Callback for removeItem func */
    onRemoveItem?: (data: { event: React.MouseEvent; item: object | Array<object> }) => void;
    /** Array of selected value/values */
    values?: Array<SelectValue>;
    /** Key of option/value object that must be taken as label */
    labelField?: string;
    /** Key of option/value object that must be taken as value */
    valueField?: string;
    /** Key of option/value object that must be taken as category */
    categoryField?: string;
    /** If `true`, Select will be opened all the time */
    keepOpen?: boolean;
    /** element or bool for Portal */
    portal?: React.ReactNode;
    /** Multiselect mode: allows to select more than 1 option */
    multi?: boolean;
    /** Autosuggest mode: select tries to suggest desired option by search string */
    autoSuggest?: boolean;
    /** Placeholder for Field input */
    placeholder?: string;
    /** Placeholder on add new option */
    addPlaceholder?: string;
    /** Placeholder on search for value */
    searchPlaceholder?: string;
    /** Disabled mode: select becomes inactive and changes styling accordingly */
    disabled?: boolean;
    /** Create mode: allows user to create new options for select if search doesn't get any result */
    create?: boolean;
    /** Classname for Select component */
    className?: string;
    /** Classname for Select Dropdown component */
    dropdownClassName?: string;
    /** Set open position.
     * Auto refers to behavior when Select tries to render Dropdown top or bottom depends of free space in viewport*/
    dropdownPosition?: SelectDropdownPosition;
    /** Dictionary of string constants to override default text variables */
    dictionary?: object;
    /** options that will be passed to the usePopper hook (see more - https://popper.js.org/docs/v2/)
     * or function that will receive current options and should return new ones for hook */
    popperProps?: PopperJS.Options | ((options: PopperJS.Options) => PopperJS.Options);
    /** Sets dropdown height in number of options visible to user */
    maxNumberOfVisibleOptions?: number;
    /** Defines if loader should be rendered within Select field */
    isLoading?: boolean;
    /** Clearable mode: allows to clear Select if any option is selected, renders specific control to clear all */
    isClearable?: boolean;
    /** Search mode: allows user typing in Field to search for desired option */
    isSearchable?: boolean;
    /** Controlled mode: switches off built-in values handling so that values will be handled only by passed values and onChange props */
    isValuesControlled?: boolean;
    /** Defines if Select should highlight parts of option label that match search string */
    highlight?: boolean;
    /** Defines if Select should always keep all options in list (on search) */
    keepSelectedInList?: boolean;
    /** Turn on rightIcon view */
    dropdownHandle?: boolean;
    /** If `true`, Select will be closed after user selects an option */
    closeOnSelect?: boolean;
    /** If `true`, Select's search field will be cleared on blur */
    clearOnBlur?: boolean;
    /** If `true`, Select's search field will be cleared after user selects an option */
    clearOnSelect?: boolean;
    /** If `true`, Select will be focused on mount */
    autoFocus?: boolean;
    /** If `true`, Select will render additional option in list that allows to select all options */
    selectAll?: boolean;
    /** Defines by what option/value object key search should be performed, when search mode on */
    searchBy?: string;
    /** Defines by what option/value object key options should be sorted */
    sortBy?: string;
    /** Empty state label */
    noDataLabel?: string;
    /** Label for option of a new option creation, when create mode on*/
    createNewLabel?: string;
    /** Color to all select */
    color?: string;
    /** Styled for Field component */
    style?: EmotionStylesType;
    /** Styles applied to the wrapper of select component. */
    selectWrapperStyle?: EmotionStylesType;
    /** Props for Chip components */
    chipProps?: object;
    /** Props for Dropdown components */
    dropdownProps?: object;
    /** Props for Dropdown item components */
    dropdownItemProps?: object;
    /** Render func for Field prefix ({ props, state, methods }) */
    contentRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** Render func for dropdown ({ props, state, methods }) */
    dropdownRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** Render func for item in Field prefix ({ props, state, methods }) */
    itemRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** Render func for no data state ({ props, state, methods }) */
    noDataRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** Render func for item in dropdown ({ props, state, methods }) */
    optionRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** Render func for Field ({ props, state, methods }) */
    inputRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** Render func for right icon on clearable ({ props, state, methods }) */
    clearRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** Render func for right icon ({ props, state, methods }) */
    dropdownHandleRenderer?: (data: { props: object; state: object; methods: object }) => React.ReactNode;
    /** TreeSelect mode: options will be rendered to a tree-like structure, requires specific options formatting */
    treeSelect?: boolean;
    /** Max number of chips on field before collapse */
    showedChips?: (data: { props: object; propName: string; componentName: string }) => null | boolean;
    /** Categories mode: select options will be groupped by category, requires specific options formatting */
    categories?: boolean;
    /** If `true` categories will be sortred alphabetically when catagories mode is on */
    sortCategories?: boolean;
    /** Native mode: select will be rendered as native html select element*/
    native?: boolean;
    /** Styles for native select */
    nativeStyle?: EmotionStylesType;
    /** Defines whether selected items should have check marks */
    checkedIcon?: boolean;
    /** Defines whether search should be case sensitive */
    caseSensitive?: boolean;
    /** Unfiltered mode: list of options won't be filtered by search string */
    unfiltered?: boolean;
    /** Props that will be passed to Tree component, when treeSelect mode is on */
    treeProps?: TreeProps;
    /** Dropdown will always be hidden while hideDropdown is `true` */
    hideDropdown?: boolean;
    /** Virtualization for a list of values */
    virtualization?: boolean;
    /** If true, native title will be shown on hover on option in dropdown
     *  By default shows options label
     *  If need custom title, pass `nativeTitle` prop in option
     * */
    showNativeTitleForOptions?: boolean;
}

declare const Select: React.ComponentType<SelectProps>;

export default Select;
