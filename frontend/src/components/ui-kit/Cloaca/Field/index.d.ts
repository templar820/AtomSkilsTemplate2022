import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

declare type FieldType =
    | 'text'
    | 'tel'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'time'
    | 'url'
    | 'week';

declare type FieldInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

export interface FieldProps {
    /** Defines value of component */
    value?: string | number;
    /** Defines placeholder of component */
    placeholder?: string;
    /** Defines label of component */
    label?: string;
    /** Defines whether checkbox is disabled */
    disabled?: boolean;
    /** Defines name of component */
    name?: string;
    /** if you need to test or mark input */
    id?: string;
    /** Defines type of component */
    type?: FieldType;
    /** Set virtual keyboard type */
    inputmode?: FieldInputMode;
    /** Defines whether field should be validated */
    validation?: boolean | ((data: { props: object; event: React.MouseEvent }) => void) | null;
    /** Defines validation error message */
    validationError?: string;
    /** Defines comment of component */
    comment?: string;
    /** Defines field size */
    fieldSize?: 'sm' | 'md' | 'lg';
    /** Change size of spacer in Field */
    marginBottom?: number;
    /** Short name prop of change size of spacer in Field */
    mB?: number;
    /** Defines icon of component */
    icon?: React.ReactNode | (() => React.ReactNode);
    /** Defines prefix of component */
    prefix?: React.ReactNode | (() => React.ReactNode);
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
    /** Deprecated. Consider using corresponding record in `styles` prop. Defines input style of component */
    inputStyle?: EmotionStylesType;
    /** Deprecated. Consider using corresponding record in `styles` prop. Defines additional css for wrapper */
    wrapperStyle?: EmotionStylesType;
    /** Deprecated. Consider using corresponding record in `styles` prop. Defines inner style of component */
    innerStyle?: EmotionStylesType;
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledLabel */
    labelStyle?: EmotionStylesType;
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledLabelWrapper */
    labelWrapperStyle?: EmotionStylesType;
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledInputWrapper */
    inputWrapperStyle?: EmotionStylesType;
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledInputBackground */
    inputBackgroundStyle?: EmotionStylesType;
    /** Styling object for all specific units */
    styles?: {
        Input?: EmotionStylesType;
        Wrapper?: EmotionStylesType;
        InputInner?: EmotionStylesType;
        LabelContent?: EmotionStylesType;
        LabelWrapper?: EmotionStylesType;
        InputWrapper?: EmotionStylesType;
        InputBackground?: EmotionStylesType;
        ChildGrabber?: EmotionStylesType;
        Loader?: EmotionStylesType;
        CommentWrapper?: EmotionStylesType;
        CommentValidationError?: EmotionStylesType;
        CommentText?: EmotionStylesType;
    };
    /** Defines additional className */
    className?: string;
    /** Autoselect text in input on focus */
    autoSelect?: boolean;
    /** Native autoComplete */
    autoComplete?: 'off' | 'on';
    /** Callback that fires when state changes, func(e) */
    onChange?: (event: React.MouseEvent) => void;
    /** Callback that fires when component focused; func(e) */
    onFocus?: (event: React.MouseEvent) => void;
    /** Callback that fires when component blurred; func(e) */
    onBlur?: (event: React.MouseEvent) => void;
    /** Callback that fires on mouse click outside of component */
    onClickOutside?: (event: React.MouseEvent) => void;
    /** Callback that fires on arrow press, func(e, direction) */
    onArrowPress?: (event: React.MouseEvent, direction: string) => void;
    /** Callback that fires when mouse enters component */
    onMouseEnter?: () => void;
    /** Callback that fires when mouse leaves component */
    onMouseLeave?: () => void;
    /** Callback that fires on key down */
    onKeyDown?: () => void;
    /** Callback that fires on key up */
    onKeyUp?: () => void;
    /** Defines whether field is required */
    isRequired?: boolean;
    /** alias for isRequired */
    required?: boolean;
    /** expand or not textarea */
    expandArea?: boolean;
    /** Turn on loading */
    isLoading?: boolean;
    /** For multi string input */
    as?: string;
}

declare const Field: React.ComponentType<FieldProps>;

export default Field;
