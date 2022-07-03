import styled from '@emotion/styled';

import { rem } from 'lib-root/utils/units';
import { hexToRGBA } from 'lib-root/utils/styleMixins';
import Icon from 'lib-ui/InlineIcons';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const Wrapper = styled.div`
    position: relative;
    flex: 0 0 ${rem(22)};
    margin-right: ${rem(8)};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    cursor: default;
    font-size: ${({ size }) => (size === 'sm' ? '16px' : '20px')};
    font-weight: 500;
    ${({ wrapStyle, ...restProps }) => applyEmotionStyle(wrapStyle, restProps)};
`;

const StyledLink = styled.a`
    margin-right: 5px;
    color: ${({ disabled, colors }) => (disabled ? `${hexToRGBA(colors.GrayScale_700, 0.5)}  !important` : 'inherit')};
    pointer-events: ${({ disabled }) => (disabled ? 'none !important' : 'auto')};
    user-select: ${({ disabled }) => (disabled ? 'none !important' : 'auto')};
    cursor: pointer;
    &:hover {
        text-decoration: none;
        color: inherit;
    }
`;
const StyledText = styled.span`
    margin-right: 5px;
    color: ${({ lastItemColor }) => lastItemColor};
    ${({ textStyles, ...restProps }) => applyEmotionStyle(textStyles, restProps)};
`;

const StyledItem = styled.span`
    margin-right: 5px;
    display: inline-flex;
    align-items: center;
    color: inherit;
    ${({ itemStyle, ...restProps }) => applyEmotionStyle(itemStyle, restProps)};
`;

const StyledIcon = styled(Icon)`
    margin-right: 5px;
    transform: rotate(270deg);
    ${({ iconStyle, ...restProps }) => applyEmotionStyle(iconStyle, restProps)};
`;

export { StyledIcon, StyledItem, StyledLink, StyledText, Wrapper };
