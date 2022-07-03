import { withProps } from 'hoc-with-props';
import styled from '@emotion/styled';
import InlineIcons from 'lib-ui/InlineIcons';
import { css } from '@emotion/core';

export const StyledHeader = styled.div`
    height: 60px;
    padding: 10px 12px;
    border-bottom: 1px solid ${({ colors }) => colors.GrayScale_100};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledHeaderArrow = styled.span`
    font-weight: 500;
    font-size: 15px;
    display: inline-flex;
    align-items: flex-end;
    cursor: pointer;
    ${({ disabled, colors }) =>
        disabled &&
        css`
            cursor: default;
            color: ${colors.GrayScale_200};
        `}
    ${({ hideArrows }) =>
        hideArrows &&
        css`
            display: none;
        `}
`;

export const StyledHeaderRightIcon = withProps({ w: '24px', h: '24px' })(styled(InlineIcons)`
    transform: rotate(-90deg);
`);

export const StyledHeaderLeftIcon = styled(StyledHeaderRightIcon)`
    transform: rotate(90deg);
`;

export const StyledHeaderText = styled.div`
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    flex: 1;
    text-align: center;
`;
