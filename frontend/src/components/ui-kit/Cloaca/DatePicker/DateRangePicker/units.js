import React from 'react';
import styled from '@emotion/styled';

import { hexToRGBA } from 'lib-root/utils/styleMixins';

const DateRangePickerWrap = styled.div`
    display: inline-flex;
    position: relative;
    flex-direction: column-reverse;
    user-select: none;
    box-shadow: 0 0 16px ${({ colors = {} }) => hexToRGBA(colors.GrayScale_700, 0.2)};
`;

export { DateRangePickerWrap };
