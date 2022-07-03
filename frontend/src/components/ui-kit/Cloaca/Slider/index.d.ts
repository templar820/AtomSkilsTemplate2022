import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface LabelFormatterProps {
    value: string;
    min: number;
    max: number;
    step: number;
    placement: '1' | '2' | '3';
    orientation: string;
}

export interface SliderProps {
    // Bar's background color
    barColor?: string;
    // Width of the bar
    barWidth?: number;
    // If true, only values from marks can be selected
    dots?: boolean;
    // Color of child filler. By default defined through status color
    fillerColor?: string;
    // If passed function, it will be used to render slider's label.
    // If passed string, it will be used as suffix.
    labelFormatter?: ((formatterProps: LabelFormatterProps) => string) | string;
    // Array of marks
    marks?: boolean | Array<number>;
    // Max enabled value
    max?: number;
    // Min enabled value
    min?: number;
    // Callback fires on change. Return number or arrayOf(numbers)
    onChange?: (numbers: number | Array<number>) => void;
    // Bar orientation
    orientation?: 'horizontal' | 'vertical';
    // If true, filler bar is not displayed
    point?: boolean;
    // Defines whether caption will be shown or not
    showCaption?: boolean;
    // Defines whether control input will be shown or not. Input is not showed if type of 'value' is Array
    showInput?: boolean;
    // Defines step
    step?: number;
    // Defines value(-es)
    value?: number | Array<number>;
    // Styles for wrapper
    wrapperStyle?: EmotionStylesType;
    //** Props for Field */
    fieldProps?: object;
    /* Styling object for slider's elements */
    styles?: {
        SliderWrapper?: EmotionStylesType;
        Bar?: EmotionStylesType;
        FieldWrapper?: EmotionStylesType;
        ControlMarkCircle?: EmotionStylesType;
        ControlMarkLabel?: EmotionStylesType;
        MarkCircle?: EmotionStylesType;
        MarkLabel?: EmotionStylesType;
        LastLabel?: EmotionStylesType;
    };
}

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
