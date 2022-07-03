import * as React from 'react';

export type CustomRenderObj = {
    children?: React.ReactNode;
    checked: boolean | 'indeterminate';
    key: string | number;
    [propName: string]: any;
};

export interface TableFilterProps {
    /** Defines whether dropdown will be shown */
    showDropdown?: boolean;
    /** Defines filtering rows in the Table right in typing process */
    filterOnType?: boolean;
    /** Defines filtering rows int Table after picking option in Dropdown */
    filterOnOptionPick?: boolean;
    /** Defines whether current filter should be changed to the last filter saved by ok */
    revertOnCancel?: boolean;
    /** Defines closing select on ok click */
    closeOnCancel?: boolean;
    /** Defines closing select on close click */
    closeOnOk?: boolean;
    /** Defines what filter will be used */
    filterType?: 'includes' | 'startsWith' | 'oneOf';
    /** Defines name of the icon that will be displayed */
    icon?: string;
    /** Defines height of the icon */
    iconHeight?: string;
    /** Defines width of the icon */
    iconWidth?: string;
    /** Defines callback that will be fired when user changes conditions */
    onChange?: (params: React.ReactNode | CustomRenderObj) => void;
    /** Defines callback that will be fired when user presses confirm button */
    onOk?: () => void;
    /** Defines callback that will be fired when user presses abort button */
    onCancel?: () => void;
    /** If set true, Filter wont update filers array of the Table. You could do it manually */
    preventFiltersUpdating?: boolean;
    /** Indicates whether component will react on user actions.
     * If table has no rows and disabled is not defined, it will be considered as `true` */
    disabled?: boolean;
    /** For custom checklist, which include custom filter, it's only "oneOf" filter
     * if you use "customRender", "preventFiltersUpdating" always equal true for onChange */
    customRender?:
        | ((params: {
              onCheckChange: (params: React.ReactNode | CustomRenderObj) => void;
              uniques: Array<React.ReactNode>;
          }) => React.ReactNode)
        | Array<CustomRenderObj>;
    /** If enabled, will be used in rendering of 'includes' and 'startsWith' filters.
     * Recommended to disable, while lists for filter are small (<30-50 records e.g.) */
    virtualization?: boolean;
    /** Overrides auto highlighting of icon */
    isActive?: boolean;
    /** Allow to set default value. Also can override previously chosen value */
    value?: string | number | (string | number)[];
}

declare const TableFilter: React.ComponentType<TableFilterProps>;

export default TableFilter;
