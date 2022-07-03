import React from 'react';
import { css } from '@emotion/core';

import { Dropdown } from 'lib-ui/Dropdown';

const dropdownPaperStyle = css`
    max-height: none;
    padding: 0;
`;

const dropdownListStyles = css`
    padding: 0;
`;

const triggerPopperProps = {
    placement: 'bottom-start',
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 10]
            }
        },
        {
            name: 'flip',
            options: {
                fallbackPlacements: ['top-start', 'auto']
            }
        },
        {
            name: 'preventOverflow',
            options: {
                altBoundary: true,
                mainAxis: true,
                altAxis: true,
                padding: 10
            }
        }
    ]
};

const PickerDropdown = ({ dropdownRef, disabled, handleIsOpenChange, ...restProps }) => (
    <Dropdown
        ref={dropdownRef}
        onTriggerDropdownOpenStateChange={handleIsOpenChange}
        closeOnTriggerClick={false}
        closeOnOutside={true}
        disableTriggerElement={disabled}
        listStyle={dropdownListStyles}
        paperStyle={dropdownPaperStyle}
        withOutsideContainer={true}
        triggerPopperProps={triggerPopperProps}
        {...restProps}
    />
);

export default PickerDropdown;
