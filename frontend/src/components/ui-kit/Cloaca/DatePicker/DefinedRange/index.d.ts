import * as React from 'react';
import { DatePickerRangeShape } from 'lib-ui';

declare type DefineRangeOnChange = (range: { range1: object; range2: object; rangeKey: string }) => void;

export interface DefinedRangeProps {
    /** Inputs to select ranges */
    inputRanges?: Array<object>;
    /** Buttons ti select static ranges */
    staticRanges?: Array<object>;
    /** Showed select static ranges */
    showedStaticRanges?: Array<object>;
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges?: Array<DatePickerRangeShape>;
    /** Show which ranges are in focus */
    focusedRange?: Array<number>;
    /** Callback fires then preview change, func({ range })
     * range - rangeShape or undefined
     * */
    onPreviewChange?: (range: { range: object }) => void;
    /** Callback fires then ranges choose change, fun({ range: { range1, range2, rangeKey } })
     * range - set of rangeShape */
    onChange?: DefineRangeOnChange;
    /** Colors for all not specific ranges use by index of color */
    rangeColors?: Array<string>;
    /** ClassName to wrapper component to style by styled */
    className?: string;
    /** Custom label render func: func({staticRange})
     * staticRange - range object
     * */
    renderStaticRangeLabel?: (staticRange: { staticRange: object }) => void;
    /** If set to true, then showing inputs to select ranges */
    showInputRanges?: boolean;
    /** Defines height on animate drawer */
    drawerHeight?: number;
    /** Defines close drawer or not on choose range */
    closeOnChoose?: boolean;
    /** Object of props to all Radio components */
    radioProps?: object;
}

declare const DefinedRange: React.ComponentType<DefinedRangeProps>;

export default DefinedRange;
