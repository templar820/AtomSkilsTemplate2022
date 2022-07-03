import styled from '@emotion/styled';
import Icon from 'lib-ui/InlineIcons';

import { withProps } from 'hoc-with-props';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const ICON_MODE = {
    left: 'right: 0; transform: translateX(+50%);',
    right: 'left: 0; transform: translateX(-50%);',
    various: 'left: 50%; transform: translateX(-50%);',
    first: 'width: 14px; height: 14px; top: 0;',
    last: 'width: 14px; height: 14px; top: 0;'
};
const LINE_MODE = {
    left: 'right: 0; transform: translateX(+50%);',
    right: 'left: 0; transform: translateX(-50%);',
    various: 'left: 50%; transform: translateX(-50%);',
    last: 'border: 0;'
};
const CONTAINER_MODE = {
    left: 'text-align: right;',
    right: 'text-align: left;',
    various: 'width: 50%;',
    various_left: 'margin-right: auto; text-align: right;',
    various_right: 'margin-left: auto; text-align: left;'
};

const SPINNER_MODE = {
    left: 'right: 0; transform: translateX(+50%) rotate(-90deg);',
    right: 'left: 0; transform: translateX(-50%) rotate(-90deg);',
    various: 'left: 50%; transform: translateX(-50%) rotate(-90deg);'
};

const StyledSpinnerBox = styled.div`
    min-width: 22px;
    position: absolute;
    bottom: 0;
    transform: rotate(-90deg);

    ${({ mode }) => SPINNER_MODE[mode]};
`;

const StyledItemWrapper = styled.li`
    position: relative;
    list-style-type: none;
    padding-bottom: 30px;

    ${({ position }) => position === 'last' && 'padding-bottom: 0'};

    ${({ lastLoading }) => lastLoading && 'padding-bottom: 22px; margin-bottom: 10px;'};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const StyledItemIconBox = styled.div`
    position: absolute;
    top: 3px;

    width: 10px;
    height: 10px;

    background: ${({ colors }) => colors.GrayScale_0};

    ${({ icon }) => icon && 'top: -2px; width: 20px; height: 20px;'};
    ${({ mode }) => ICON_MODE[mode]};
    ${({ position, icon, lastLoading }) => position && !icon && !lastLoading && ICON_MODE[position]};
`;

const StyledItemIconCircle = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 100%;

    border: 2px solid ${({ colors, iconColor }) => iconColor || colors.GrayScale_100};

    ${({ position, colors, iconColor }) =>
        (position === 'first' || position === 'last') && !iconColor && 'border-color:' + colors.GrayScale_200};
`;

const StyledItemIcon = withProps(({ iconSize, iconColor }) => ({ w: iconSize, h: iconSize, color: iconColor }))(styled(
    Icon
)`
    cursor: inherit;
    vertical-align: top;
`);

const StyledItemLine = styled.div`
    position: absolute;
    top: 0;
    width: 4px;
    height: 100%;

    box-sizing: border-box;

    border-left: 4px solid ${({ colors }) => colors.GrayScale_100};
    ${({ mode }) => LINE_MODE[mode]};
    ${({ position }) => position === 'last' && 'border: 0'};

    ${({ lastLoading, colors }) => lastLoading && 'border-left: 4px dotted ' + colors.GrayScale_100};
`;

const StyledContentBox = styled.div`
    margin: 0;
    padding: 0 14px;
    position: relative;
    word-break: break-word;
    font-size: 12px;
    line-height: 16px;

    ${({ mode }) => CONTAINER_MODE[mode]};

    ${({ mode, align }) =>
        mode === 'various' && (align ? CONTAINER_MODE['various_' + align] : CONTAINER_MODE['various_right'])};
`;

export {
    StyledItemWrapper,
    StyledItemLine,
    StyledContentBox,
    StyledItemIconBox,
    StyledItemIconCircle,
    StyledItemIcon,
    StyledSpinnerBox
};
