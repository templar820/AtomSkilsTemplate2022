import React from 'react';
import styled from '@emotion/styled';
import InlineIcons from 'lib-ui/InlineIcons';
import { iconConfig } from '../utils';

const StyledIcon = styled.span`
    position: absolute;
    top: 50%;
    ${({ position }) => position}: 25%;
    transform: translate(${({ position }) => (position === 'right' ? '50%' : '-50%')}, -50%);
`;

export default ({ checked, iconsType, currentSwitchSizes, checkedIcon, uncheckedIcon }) => {
    const userIcon = checked ? checkedIcon : uncheckedIcon;
    if (!userIcon && !iconsType) return null;
    const icon = checked ? iconConfig['checked'] : iconConfig['unchecked'];

    let output;
    if (userIcon) {
        output = userIcon;
    } else {
        const iconSize = currentSwitchSizes.defaultIconSize;
        output =
            iconsType === 'numeric' ? icon.numeric : <InlineIcons w={iconSize} h={iconSize} icon={icon.iconName} />;
    }
    return <StyledIcon position={icon.position}>{output}</StyledIcon>;
};
