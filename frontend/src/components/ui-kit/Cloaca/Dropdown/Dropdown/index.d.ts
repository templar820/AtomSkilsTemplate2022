import * as React from 'react';
import { PopperPlacementType, EmotionStylesType } from 'lib-ui';
import { AnimationTransitionProps } from 'lib-ui/utils/AnimationTransition';
import { OutsideEventContainerProps } from 'react-on-outside-event/dist/OutsideEventContainer';
import * as PopperJS from '@popperjs/core';
import { RefObject } from 'react';

export type DropdownControlsType = {
    updatePosition: () => void;
    setIsOpenMain: (setState: boolean | ((prevState: boolean) => boolean)) => void;
};

export interface DropdownProps {
    /** Children for render in opened dropdown. Usually DropdownItems.
     * Also could be a render function */
    children?:
        | React.ReactNode
        | Array<React.ReactNode>
        | ((props: {
              isOpenMain: boolean;
              isOpen: boolean;
              dropdownControls: DropdownControlsType;
              childDropdownPlacement: PopperPlacementType;
          }) => React.ReactNode);
    /** defines how many rows will be visible in list (others might be revealed on scroll) */
    maxNumberOfVisibleOptions?: boolean;
    /** Shows Loading state if component if set true */
    isLoading?: boolean;
    /** Defines if main dropdown will be opened or not
     * Shows to dropdown items, is dropdown open or not (if it be controlled component) */
    isOpen?: boolean;
    /** turn off part of shadow */
    disableSideShadow?: 'top' | 'bottom' | 'left' | 'right';
    /** margin-bottom for trigger elem */
    gap?: string | number;
    /** event for show dropdown relative trigger */
    triggerAction?: 'click' | 'hover';
    /** Custom class for trigger element */
    triggerClassName?: string;
    /** React node (or render function returning react node) that opens/closes Dropdown.
     * Element will receive { isOpenMain and dropdownControls } as props. Function - as argument. */
    triggerElement?:
        | React.ReactNode
        | ((props: { isOpenMain: boolean; dropdownControls: DropdownControlsType }) => React.ReactNode);
    /** the element ref to customize ref ro popper that opens the dropdown */
    triggerElementRef?: React.RefObject<HTMLElement>;
    /** defines will the trigger opens on action and some styling */
    disableTriggerElement?: boolean;
    /** position of the dropdown relative to the trigger */
    triggerPlacement?: PopperPlacementType;
    /** options that will be passed to the usePopper hook of triggered dropdown
     * (more - https://popper.js.org/docs/v2/) or fn that will receive current options and should return new ones */
    triggerPopperProps?: PopperJS.Options | ((options: PopperJS.Options) => PopperJS.Options);
    /** custom styles for Paper */
    paperStyle?: EmotionStylesType;
    /** custom styles for PaperWrapper */
    paperWrapperStyle?: EmotionStylesType;
    /** custom styles for StyledList */
    listStyle?: EmotionStylesType;
    /** custom styles for trigger wrapper */
    triggerStyle?: EmotionStylesType;
    /** prop for disable outside click */
    closeOnOutside?: boolean;
    /** defines should the opened dropdown closes on trigger click */
    closeOnTriggerClick?: boolean;
    /** Callback fired when trigger dropdown closes or opens. Receives boolean value showing is trigger dropdown open, func(this.state.isOpenMain) */
    onTriggerDropdownOpenStateChange?: (isOpenMain: boolean) => void;
    /** Defines to OutsideEventContainer Container */
    withOutsideContainer?: boolean;
    /** Custom props to OutsideEventContainer component in dropdown */
    clickOutsideProps?: OutsideEventContainerProps;
    /** Ref to children list wrapper */
    listRef?: React.RefObject<HTMLElement>;
    /** set sequence in navigation */
    tabIndex?: number | string;
    /** Position of nester dropDowns relative to their items. Undefined default value helps to keep opening direction.
     * Top level items with undefined will be interpreted as 'right-start'.
     * Placement might be overridden by exact item props.
     * Please keep this prop undefined for nesting direction sustain */
    childDropdownPlacement?: PopperPlacementType;
    /** Props for AnimationTransition component. Look AnimationTransition spec.  */
    animationTransitionProps?: AnimationTransitionProps;
    /** Virtualization for a list of values */
    virtualization?: boolean;
    /** Defines if primary dropdown will be rendered
     * true - in portal after body
     * false - right next to trigger element
     * Be aware: being rendered without portal, dropdown will calculate its width and position based on its wrapper */
    renderPrimaryDropdownInPortal?: boolean;
    /** Array of elements that will not cause open/close state change */
    ignoreClicksOnRefs?: RefObject<HTMLElement>[];
}

declare const Dropdown: React.ComponentType<DropdownProps>;

export default Dropdown;
