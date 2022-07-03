import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';

import { InlineIcons as Icon } from 'lib-ui';

const StyledTooltipBlock = styled.div`
    &:after {
        content: '';
        width: 100%;
        order: 0;
    }
`;

const TooltipText = styled.span`
    font-size: 15px;
    text-align: left;
    margin-left: 7px;
`;

const TooltipButton = styled.div`
    width: 100%;
    display: flex;
    margin-top: 8px;
    order: 1;
    margin-left: auto;
    margin-right: 0;
    justify-content: flex-end;
`;

const StyledContentWrapper = styled.div`
    display: flex;
`;

const TooltipBlock = ({ iconName, iconWidth, iconHeight, tooltip, icon, children }) => {
    const colors = useContext(ColorsContext);
    return (
        <StyledTooltipBlock>
            <StyledContentWrapper>
                {icon ? (
                    <Icon
                        key={iconName ? iconName : 'Attention_error'}
                        color={colors.errorAccent}
                        width={iconWidth}
                        height={iconHeight}
                        icon={iconName ? iconName : 'Attention_error'}
                    />
                ) : (
                    ''
                )}
                <TooltipText>{tooltip}</TooltipText>
            </StyledContentWrapper>
            <TooltipButton>{children}</TooltipButton>
        </StyledTooltipBlock>
    );
};

export { TooltipBlock, TooltipText, TooltipButton, StyledContentWrapper };
