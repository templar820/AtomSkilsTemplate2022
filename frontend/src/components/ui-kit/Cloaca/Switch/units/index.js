import React from 'react';
import styled from '@emotion/styled';

import Box from './Box';
import Icon from './Icon';
import Loader from './Loader';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledWrapper = styled.label`
    display: inline-flex;
    margin: 0;
    position: relative;
    pointer-events: ${({ isLoading, disabled }) => (isLoading || disabled) && 'none'};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const StyledInput = styled.input`
    opacity: 0;
`;

export { Icon, Box, Loader, StyledInput, StyledWrapper };
