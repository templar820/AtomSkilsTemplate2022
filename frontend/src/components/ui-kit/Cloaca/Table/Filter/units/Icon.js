import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { withProps } from 'hoc-with-props';

import { withColors } from 'lib-ui/utils';
import InlineIcons from 'lib-ui/InlineIcons';

const Icon = withColors(
    withProps(({ iconWidth, iconHeight }) => ({ w: iconWidth, h: iconHeight }))(styled(InlineIcons)`
        ${({ colors, isOpenMain, isActive }) => {
            const passiveColor = isActive ? colors.primary : colors.GrayScale_200;
            const activeColor = isActive ? colors.primaryAccent : colors.GrayScale_700;

            return css`
                color: ${isOpenMain ? activeColor : passiveColor};
                transition: color 0.3s ease;
                &:hover {
                    color: ${activeColor};
                }
            `;
        }};
    `)
);

export default Icon;
