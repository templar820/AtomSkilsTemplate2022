import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import * as PopperJS from '@popperjs/core';

declare type DropdownItemPlacement =
    | 'auto'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'auto-start'
    | 'auto-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end';

export interface DropdownItemStyleProps {
    /** emotion styles for top level wrapper of the Item */
    wrapperStyle?: EmotionStylesType;
    /** emotion styles for nested dropdown wrapper */
    childWrapperStyle?: EmotionStylesType;
    /** emotion styles that will be applied to the highlighted part of children instead of default ones */
    highlightStyle?: EmotionStylesType;
}

export interface ItemProps extends DropdownItemStyleProps {
    /** basically node for dropdown row. Could be a render function */
    children?: React.ReactNode | ((occurrence: string) => React.ReactNode);
    /** value for click callback. Might be useful if children contents type is not a string */
    value?: string;
    /** decorative icon that placed left to the children */
    leftIcon?: React.ReactNode;
    /** React.ReactNode that replaces default arrow for pointing on nested dropdown */
    rightIcon?: React.ReactNode;
    /** text for highlighting in children (if they are string type) */
    occurrence?: string;
    /** nested dropdown component */
    childDropdown?: React.ReactNode;
    /** if true then nested dropdown shows on click, not on hover */
    childDropdownOpenOnClick?: boolean;
    /** Position of child dropdown relative to the item. Undefined default value helps to keep opening direction.
     * Top level items with undefined will be interpreted as 'right-start' */
    childDropdownPlacement?: DropdownItemPlacement;
    /** options that will be passed to the usePopper hook (see more - https://popper.js.org/docs/v2/)
     * or fn that will receive current options and should return new ones */
    popperProps?: PopperJS.Options | ((options: PopperJS.Options) => PopperJS.Options);
    /** Callback that will be fired when user clicks item
     * (wont be triggered on nested dropdown click and if item is disabled), func(e, value || children) */
    onClick?: (event: React.MouseEvent, value: string | React.ReactNode) => void;
    /** same as isHover but for controlled behavior */
    active?: boolean;
    /** state for select, when item in selected in select values */
    isSelected?: boolean;
    /** shows open or not parent dropdown (needed then childDropdownOpenOnClick is true)*/
    isOpen?: boolean;
    /** defines appearance of item and (im)possibility ti trigger onClick event */
    disabled?: boolean;
    /** scrollIntoView on receiving active status will be made with this options */
    scrollIntoViewOptions?:
        | boolean
        | {
              behavior?: 'auto' | 'smooth';
              block?: 'center' | 'end' | 'nearest' | 'start';
              inline?: 'center' | 'end' | 'nearest' | 'start';
          };
}

declare const Item: React.ComponentType<ItemProps>;

export default Item;
