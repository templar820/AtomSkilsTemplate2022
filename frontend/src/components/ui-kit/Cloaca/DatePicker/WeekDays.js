import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

import { ColorsContext } from 'lib-root/colors';

const StyledWeekDay = styled.span`
    flex-basis: 46px;
    box-sizing: inherit;
    text-align: center;
    font-weight: 400;
    line-height: 32px;
    color: ${({ colors }) => colors.GrayScale_200};
`;

const StyledWeekDays = styled.div`
    display: flex;
    padding: 0 12px;
`;

const WeekDays = ({ dateOptions, ...rest }) => {
    const now = new Date();
    const colors = useContext(ColorsContext);
    return (
        <StyledWeekDays {...rest}>
            {eachDayOfInterval({
                start: startOfWeek(now, dateOptions),
                end: endOfWeek(now, dateOptions)
            }).map((day, i) => (
                <StyledWeekDay colors={colors} key={i}>
                    {format(day, 'eeeeee', dateOptions).toUpperCase()}
                </StyledWeekDay>
            ))}
        </StyledWeekDays>
    );
};
export default WeekDays;
