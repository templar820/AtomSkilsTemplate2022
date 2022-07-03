import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import { TransitionGroup } from 'react-transition-group';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledNotificationContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${({ zIndex }) => zIndex};
    pointer-events: none;
    ${({ _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const showBtn = keyframes`
  0% {
    width: auto;
    height: auto;
    opacity: 0;
  }
  100% {
    width: auto;
    height: auto;
    opacity: 1;
  }
`;

const hideBtn = keyframes`
  0% {
    width: auto;
    height: auto;
    opacity: 1;
  }
  99% {
    width: auto;
    height: auto;
    opacity: 0;
  }
  100% {
    width: 0;
    height: 0;
    opacity: 0;
  }
`;

const StyledNotificationPositioner = styled.div`
    display: inline-flex;
    flex-direction: ${({ direction, verticalPosition }) =>
        verticalPosition === 'top' ? direction + '-reverse' : direction};
    padding: ${({ gap }) => gap};
    position: absolute;
    align-items: ${({ horizontalPosition }) => (horizontalPosition === 'left' ? 'flex-start' : 'flex-end')};
    transition: ${({ horizontalPosition }) => `${horizontalPosition} 500ms linear`};
    ${({ horizontalPosition, state }) => `${horizontalPosition}: ${state === 'entered' ? '0' : '-100%'}`};
    ${({ verticalPosition }) => verticalPosition}: 0;
    pointer-events: auto;
`;

const StyledCloseAllButton = styled.div`
    display: flex;
    visibility: ${({ notificationsLength, countForView }) =>
        notificationsLength <= countForView ? 'hidden' : 'inherit'};
    max-height: ${({ notificationsLength, countForView }) => (notificationsLength <= countForView ? '0' : 'auto')};
    max-width: ${({ notificationsLength, countForView }) => (notificationsLength <= countForView ? '0' : 'auto')};
    font-weight: 500;
    cursor: pointer;
    pointer-events: auto;
    text-decoration: underline;
    &:hover {
        text-decoration: none;
    }
    ${({ customStylesForCloseButton: style, ...rest }) => (typeof style === 'function' ? style(rest) : style)};
    ${({ verticalPosition }) => `margin-${verticalPosition}`}: 3px;
    line-height: 24px;
    font-size: 15px;
    margin-left: 12px;
    margin-right: 12px;
    animation: ${hideBtn} 300ms forwards;
    ${StyledNotificationPositioner}:hover & {
        animation: ${showBtn} 300ms forwards;
    }
`;

const StyledTransitionGroup = styled(TransitionGroup, { shouldForwardProp: isPropValid })`
    display: inherit;
    flex-direction: ${({ direction, isReversed }) => direction + (isReversed ? '-reverse' : '')};
    align-items: inherit;
`;

const StyledChild = styled.div`
    margin: ${({ gap }) => gap};
    transition: max-height 500ms;
    max-height: ${({ state }) => (state === 'entered' ? '100px' : '0')};
    opacity: ${({ state }) => (state === 'entering' ? '0' : '1')};
`;

export {
    StyledNotificationContainer,
    StyledCloseAllButton,
    StyledNotificationPositioner,
    StyledTransitionGroup,
    StyledChild
};
