import styled from '@emotion/styled';
import { withProps } from 'hoc-with-props';

import InlineIcons from 'lib-ui/InlineIcons';

const StyledOuter = styled.div`
    position: absolute;
    display: inline-flex;
    top: -6px;
    right: -10px;
    padding: 2px;
    z-index: 200;
    border-radius: 100%;
    background: ${({ colors }) => colors.GrayScale_0};
`;

const StyledInner = styled.div`
    border-radius: 100%;
    background: ${({ colors }) => colors.GrayScale_0};
    color: ${({ colors, color }) => color || colors.primary};
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover {
        background: ${({ colors, color }) => color || colors.primary};
        color: ${({ colors }) => colors.GrayScale_0};
    }
`;

const StyledClocksIcon = withProps({ icon: 'Clock', w: '18px', h: '18px' })(styled(InlineIcons)`
    display: block;
`);

const StyledTooltipOuter = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const StyledTooltipDate = styled.div`
    font-size: 12px;
`;

export { StyledOuter, StyledInner, StyledClocksIcon, StyledTooltipOuter, StyledTooltipDate };
