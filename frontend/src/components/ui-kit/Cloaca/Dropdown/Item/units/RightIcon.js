import React from 'react';
import styled from '@emotion/styled';
import Icon from 'lib-ui/InlineIcons';

const StyledRightIconWrapper = styled.span`
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%) rotate(${({ rightIcon, isOpen }) => (rightIcon || isOpen ? 0 : -90)}deg);
    transition: 0.3s transform;
`;

const defaultRightIcon = <Icon w={'32px'} h={'32px'} icon={'Triangle'} />;
const RightIcon = ({ rightIcon, isOpen, childDropdown }) => {
    if (!rightIcon && !childDropdown) return null;
    return <StyledRightIconWrapper {...{ rightIcon, isOpen }}>{rightIcon || defaultRightIcon}</StyledRightIconWrapper>;
};

export default RightIcon;
