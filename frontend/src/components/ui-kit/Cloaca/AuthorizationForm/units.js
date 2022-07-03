import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Icon from 'lib-ui/InlineIcons';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const Header = styled.h2`
    ${({ headerStyle, ...restProps }) => applyEmotionStyle(headerStyle, restProps)};
`;

const IsBlockedWrapper = styled.div`
    ${({ isBlockedStyle, ...restProps }) => applyEmotionStyle(isBlockedStyle, restProps)};
`;

const fieldStyle = (additionalStyle = null) => css`
    max-width: 100%;
    ${additionalStyle};
`;

const buttonStyle = (additionalStyle = null) => css`
    width: 100%;
    ${additionalStyle};
`;

const StyledIcon = styled(Icon)`
    cursor: pointer;
`;

export { Header, IsBlockedWrapper, fieldStyle, buttonStyle, StyledIcon };
