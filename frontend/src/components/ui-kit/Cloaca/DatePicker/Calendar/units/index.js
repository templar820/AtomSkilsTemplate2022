import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from 'lib-ui/InlineIcons';
import { colors } from 'lib-root/colors';
import { hexToRGBA } from 'lib-root/utils/styleMixins';
import { StyledDayWrapper } from '../../DayCell/units';

const StyledCalendarWrapper = styled.div`
    box-sizing: border-box;
    background: ${colors.GrayScale_0};
    display: inline-flex;
    flex-direction: column;
    user-select: none;
    color: ${colors.GrayScale_700};
    font-size: 15px;
    position: ${({ isDefinedRange }) => !isDefinedRange && 'relative'};
    @media (max-width: 380px) {
        max-width: 300px;
    }
`;

const StyledInfiniteWrapper = styled.div`
    overflow: auto;
    ${({ isVertical }) =>
        isVertical
            ? css`
                  flex-direction: column;
              `
            : css`
                  & > div > div > div {
                      display: flex;
                      flex-direction: row;
                  }
              `};
`;

const StyledMonthAndYearWrapper = styled.div`
    box-sizing: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding-top: 10px;
    border-bottom: 1px solid ${({ colors }) => colors.GrayScale_100};
    margin: 0 12px 20px 12px;
`;

const StyledMonthAndYearPickers = styled.span`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`;

const StyledMonths = styled.div`
    display: flex;
    &:not(:hover) {
        ${StyledDayWrapper}::after {
            opacity: 0 !important;
        }
    }
    ${({ isVertical }) =>
        isVertical
            ? css`
                  flex-direction: column;
              `
            : css`
                  & > div > div > div {
                      display: flex;
                      flex-direction: row;
                  }
              `};
`;

const StyledDateDisplay = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12.495px;
`;

const StyledDateDisplayItem = styled.div`
    flex: 1 1;
    width: 0;
    text-align: center;
    color: inherit;
    border-radius: 1px;
    border: 1px solid ${({ colors }) => hexToRGBA(colors.GrayScale_700, 0.2)};

    margin-left: 12.495px;
    &:first-of-type {
        margin-left: 0;
    }
    & + & {
        margin-left: 12.495px;
    }

    &:hover {
        border: 1px solid ${({ colors }) => hexToRGBA(colors.GrayScale_700, 0.5)};
    }

    ${({ active }) =>
        active &&
        css`
            border-color: currentColor;
            &:hover {
                border-color: currentColor;
            }
        `}
`;

const StyledDateDisplayItemInput = styled.input`
    text-align: inherit;
    cursor: pointer;
    height: 37.5px;
    line-height: 37.5px;
    border: 0;
    background: transparent;
    width: 100%;
    color: ${({ active, colors }) => (active ? colors.GrayScale_700 : hexToRGBA(colors.GrayScale_700, 0.6))};
    outline: none;
    &:disabled {
        cursor: default;
    }
`;

const StyledNextMonthButton = styled.button`
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 12px;
    padding: 0;
    border: 0;
    background: transparent;

    &:hover {
        color: ${({ color }) => color};
    }
    &:disabled {
        color: ${({ colors }) => colors.GrayScale_200};
        cursor: not-allowed;
    }

    &:focus {
        outline: none;
    }
`;

const StyledNextMonthButtonIconLeft = styled(Icon)`
    transition: color 0.3s ease-in-out;
    transform: rotate(90deg);
`;
const StyledNextMonthButtonIconRight = styled(Icon)`
    transition: color 0.3s ease-in-out;
    transform: rotate(-90deg);
`;

const StyledMonthAndYearDivider = styled.span`
    padding: 8px;
`;

const StyledSelector = styled.span`
    flex: 1;
    display: flex;
    align-items: center;
`;

const StyledSelectorValue = styled.div`
    padding: 8px;
    border-radius: 4px;
    transition: background 0.3s ease-in-out;
    &:hover {
        background: ${({ colors }) => colors.GrayScale_100};
    }
`;

export {
    StyledCalendarWrapper,
    StyledInfiniteWrapper,
    StyledMonthAndYearWrapper,
    StyledMonthAndYearPickers,
    StyledMonthAndYearDivider,
    StyledDateDisplay,
    StyledDateDisplayItem,
    StyledDateDisplayItemInput,
    StyledSelector,
    StyledSelectorValue,
    StyledMonths,
    StyledNextMonthButton,
    StyledNextMonthButtonIconLeft,
    StyledNextMonthButtonIconRight
};
