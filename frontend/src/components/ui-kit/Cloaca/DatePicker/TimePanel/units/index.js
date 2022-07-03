import { css } from '@emotion/core';
import styled from '@emotion/styled';
import TimePicker from '../../TimePicker';

const StyledWrap = styled.div`
    font-size: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ isOkBtn }) => (isOkBtn ? 0 : '28px')};
    min-height: 0;
`;

const StyledPickersWrap = styled.div`
    flex: 1;
    display: flex;
    min-height: 0;
`;

const StyledOkSection = styled.div`
    cursor: pointer;
    min-height: 48px;
    font-weight: 500;
    font-size: 15px;
    line-height: 48px;
    text-align: center;
    color: ${({ colors }) => colors.GrayScale_0};
    background: ${({ colors }) => colors.primary};
`;

const StyledTimePicker = styled(TimePicker)`
    ${({ separator, colors }) =>
        separator &&
        css`
            border-left: 1px solid ${colors.GrayScale_100};
        `}
`;

export { StyledWrap, StyledPickersWrap, StyledOkSection, StyledTimePicker };
