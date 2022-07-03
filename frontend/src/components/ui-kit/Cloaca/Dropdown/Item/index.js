import React, { useState, useEffect, useLayoutEffect, useCallback, useImperativeHandle, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { withColors } from 'lib-ui/utils';
import { useRefCallback } from 'lib-root/utils';

import { RightIcon, LeftIcon, Highlighter, ChildDropdownRenderer, StyledItemWrapper, StyledItem } from './units';
import { mapPlacement } from './utils';

const DropdownItem = React.forwardRef(
    (
        {
            onClick: propOnClick,
            colors,
            children,
            childWrapperStyle,
            leftIcon,
            rightIcon,
            childDropdown,
            isOpen: isOpenParentDropdown,
            childDropdownOpenOnClick,
            occurrence,
            highlightStyle,
            value,
            disabled,
            active,
            isSelected,
            childDropdownPlacement,
            popperProps,
            childDropdownVerticalPosition,
            dropDownUnderChild,
            childDropDownSide,
            itemRef,
            scrollIntoViewOptions,
            ...restProps
        },
        forwardedRef
    ) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isActive, setIsActive] = useState(false);
        const { ref, initRef } = useRefCallback();

        const refUpdate = useRef();

        useImperativeHandle(forwardedRef, () => ({
            element: ref.current,
            positionUpdate: () =>
                refUpdate.current && refUpdate.current.positionUpdate && refUpdate.current.positionUpdate()
        }));

        const onMouseEnter = useMemo(() => {
            if (!childDropdown || disabled) return undefined;
            return ({ type }) => setIsHovered(type === 'mouseenter');
        }, [childDropdown, disabled]);
        const onMouseLeave = onMouseEnter;

        const onClick = useCallback(
            (e) => {
                if (propOnClick) propOnClick(e, value || children);
                if (childDropdownOpenOnClick) setIsActive((prevState) => !prevState);
            },
            [propOnClick, value, children, childDropdownOpenOnClick]
        );

        useEffect(() => {
            if (!isOpenParentDropdown) setIsActive(false);
        }, [isOpenParentDropdown]);

        useLayoutEffect(() => {
            if (active && ref && ref.current) ref.current.scrollIntoView(scrollIntoViewOptions);
        }, [active, ref.current]);

        // childDropdownVerticalPosition, dropDownUnderChild, childDropDownSide are deprecated.
        // mapping below is added for backward compatibility only. Use childDropdownPlacement and popperProps instead.
        const _childDropdownPlacement = mapPlacement({
            childDropdownPlacement,
            childDropdownVerticalPosition,
            dropDownUnderChild,
            childDropDownSide
        });

        const isOpen = childDropdown && (childDropdownOpenOnClick ? isOpenParentDropdown && isActive : isHovered);
        return (
            <StyledItemWrapper
                {...{ disabled, ref: itemRef ? itemRef : initRef, onMouseEnter, onMouseLeave, ...restProps }}>
                <StyledItem {...{ colors, active, isSelected, childDropdown, rightIcon, disabled, isHovered, onClick }}>
                    <LeftIcon {...{ leftIcon }} />
                    <Highlighter {...{ children, occurrence, highlightStyle }} />
                    <RightIcon {...{ rightIcon, childDropdown, isOpen }} />
                </StyledItem>
                {isOpen && (
                    <ChildDropdownRenderer
                        ref={refUpdate}
                        {...{
                            popperProps,
                            referenceElement: ref.current,
                            childDropdownPlacement: _childDropdownPlacement
                        }}
                        {...{ childDropdown, childWrapperStyle, isOpenParentDropdown, isOpen }}
                    />
                )}
            </StyledItemWrapper>
        );
    }
);

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = {
    /** basically node for dropdown row. Could be a render function */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /** value for click callback. Might be useful if children contents type is not a string */
    value: PropTypes.string,
    /** decorative icon that placed left to the children */
    leftIcon: PropTypes.node,
    /** node that replaces default arrow for pointing on nested dropdown */
    rightIcon: PropTypes.node,
    /** text for highlighting in children (if they are string type) */
    occurrence: PropTypes.string,
    /** nested dropdown component */
    childDropdown: PropTypes.node,
    /** if true then nested dropdown shows on click, not on hover */
    childDropdownOpenOnClick: PropTypes.bool,
    /** Position of child dropdown relative to the item. Undefined default value helps to keep opening direction.
     * Top level items with undefined will be interpreted as 'right-start' */
    childDropdownPlacement: PropTypes.oneOf([
        'auto',
        'top',
        'right',
        'bottom',
        'left',
        'auto-start',
        'auto-end',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end'
    ]),
    /** options that will be passed to the usePopper hook (see more - https://popper.js.org/docs/v2/)
     * or fn that will receive current options and should return new ones */
    popperProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** Callback that will be fired when user clicks item
     * (wont be triggered on nested dropdown click and if item is disabled), func(e, value || children) */
    onClick: PropTypes.func,
    /** same as isHover but for controlled behavior */
    active: PropTypes.bool,
    /** state for select, when item in selected in select values */
    isSelected: PropTypes.bool,
    /** shows open or not parent dropdown (needed then childDropdownOpenOnClick is true)*/
    isOpen: PropTypes.bool,
    /** defines appearance of item and (im)possibility ti trigger onClick event */
    disabled: PropTypes.bool,
    /** emotion styles for top level wrapper of the Item */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotion styles for nested dropdown wrapper */
    childWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotion styles that will be applied to the highlighted part of children instead of default ones */
    highlightStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** scrollIntoView on receiving active status will be made with this options */
    scrollIntoViewOptions: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

DropdownItem.defaultProps = {
    size: '16px',
    isOpen: true,
    disabled: false,
    childDropdownPlacement: undefined,
    popperProps: {},
    scrollIntoViewOptions: { behavior: 'smooth', block: 'nearest', inline: 'start' }
};

export default withColors(DropdownItem);
