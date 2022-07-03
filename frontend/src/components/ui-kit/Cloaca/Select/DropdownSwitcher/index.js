import React, { useState, useContext, useImperativeHandle } from 'react';

import { Portal } from 'lib-ui/utils';
import { LayersContext } from 'lib-root/layers';

import { StyledDropdownGrabber, StyledDropdown } from '../units';

import defaultDropdownRenderer from '../defaultDropdownRenderer';
import TreeDropdown from '../TreeDropdown';

import { usePopperConfig } from './utils';

const getDropdownChildren = (args) => {
    const {
        props: { dropdownRenderer, treeSelect }
    } = args;
    switch (true) {
        case dropdownRenderer:
            return dropdownRenderer(args);
        case treeSelect:
            return <TreeDropdown {...args} />;
        default:
            return defaultDropdownRenderer(args);
    }
};

const SelectDropdown = React.forwardRef(
    ({ dictionary, props, state, methods, referenceElement, showNativeTitleForOptions }, forwardedRef) => {
        const { portal, treeSelect } = props;
        const zIndex = useContext(LayersContext);

        const virtualization = methods.searchResults().length === 0 ? false : props.virtualization;

        const [popperElement, setPopperElement] = useState(null);
        const { opposite, positionUpdate, popperStyles, isOversize } = usePopperConfig(
            popperElement,
            referenceElement,
            props.dropdownPosition,
            props.popperProps
        );

        // use this for update Popper position  /
        useImperativeHandle(forwardedRef, () => ({ positionUpdate }));

        if (!state.dropdown) return null;

        return (
            <Portal node={portal} roleName={'dropdown'}>
                <StyledDropdownGrabber
                    ref={setPopperElement}
                    style={popperStyles}
                    {...{ isOpen: state.dropdown, zIndex }}>
                    <StyledDropdown
                        virtualization={virtualization}
                        disableSideShadow={isOversize ? undefined : opposite || 'top'}
                        maxNumberOfVisibleOptions={props.maxNumberOfVisibleOptions}
                        className={props.dropdownClassName}
                        isTreeSelect={!!treeSelect}
                        {...props.dropdownProps}>
                        {getDropdownChildren({
                            showTitles: isOversize,
                            showNativeTitleForOptions,
                            dictionary,
                            props,
                            state,
                            methods
                        })}
                    </StyledDropdown>
                </StyledDropdownGrabber>
            </Portal>
        );
    }
);

export { SelectDropdown };
