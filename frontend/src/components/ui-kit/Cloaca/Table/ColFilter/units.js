import React, { useLayoutEffect } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Checkbox from 'lib-ui/Checkbox';
import InlineIcons from 'lib-ui/InlineIcons';

const defaultTriggerElement = <InlineIcons w={'20px'} h={'20px'} icon={'Services'} />;

const StyledUl = styled.ul`
    display: block;
    list-style: none;
    max-height: 340px;
    overflow: auto;
    padding: 0 15px;
`;

const StyledLi = styled.li`
    padding: 7px 0;
`;

const triggerStyle = css`
    display: flex;
    justify-content: center;
    position: relative;
`;

const CheckItem = ({ onCheckChange, id, children, filteredColumnsMap = [] }) => (
    <StyledLi>
        <Checkbox onCheckChange={() => onCheckChange(id)} checked={!filteredColumnsMap[id]}>
            {children}
        </Checkbox>
    </StyledLi>
);

const UpdatePositionWrapper = React.forwardRef(
    ({ children, dropdownControls: { updatePosition } = {}, filteredColumnsMap }, ref) => {
        // ref forwarding added just for preventing errors
        // update dropdown position when columns appear and disappear
        useLayoutEffect(() => {
            if (updatePosition) updatePosition();
        }, [updatePosition, filteredColumnsMap]);
        return children;
    }
);

export { UpdatePositionWrapper, CheckItem, StyledUl, defaultTriggerElement, triggerStyle };
