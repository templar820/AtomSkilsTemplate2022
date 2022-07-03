import React from 'react';
import styled from '@emotion/styled';
import { withProps } from 'hoc-with-props';

import InlineIcons from 'lib-ui/InlineIcons';

const StyledRangeWrap = styled.div`
    display: flex;
    flex: 1;
    margin: 0 28px;
    font-size: 16px;
`;

const StyledRangePick = styled.div`
    cursor: pointer;
    padding: 5px 28px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 15px;
    line-height: 21px;
`;

const StyledWrap = styled.div`
    font-size: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
`;

const StyledHeader = styled.div`
    height: 60px;
    margin: 0 12px 12px;
    padding: 10px 0;
    border-bottom: 1px solid ${({ colors }) => colors.GrayScale_100};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const StyledHeaderText = styled.div`
    font-size: 15px;
    font-weight: 500;
    height: 20px;
    margin-left: 12px;
`;

const StyledHeaderCloseBtn = withProps({ w: '16px', h: '16px' })(styled(InlineIcons)`
    cursor: pointer;
    margin-right: 12px;
`);

const StyledIntervalsWrap = styled.div`
    flex: 1;
`;
const StyledInputsWrap = styled.div`
    flex-shrink: 0;
    margin: 0 28px;
`;

const StyledArrow = withProps({ w: '20px', h: '20px', icon: 'Arrow_type_1' })(styled(InlineIcons)`
    transform: rotate(180deg);
    color: ${({ isActive, colors }) => (isActive && colors.primary) || 'inherit'};
`);

const StyledRangeLabel = styled.span`
    color: ${({ isActive, colors }) => (isActive && colors.primary) || 'inherit'};
`;

export {
    StyledRangeWrap,
    StyledArrow,
    StyledRangeLabel,
    StyledRangePick,
    StyledHeader,
    StyledWrap,
    StyledHeaderText,
    StyledHeaderCloseBtn,
    StyledIntervalsWrap,
    StyledInputsWrap
};
