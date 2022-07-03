import { css, keyframes } from '@emotion/core';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const DEFAULT_START_STYLE = css`
    opacity: 0;
    visibility: hidden;
`;

const DEFAULT_END_STYLE = css`
    opacity: 1;
    visibility: visible;
`;

const createKeyFrame = (forwardAnimation, backwardAnimation) => keyframes`
          0% { 
            ${applyEmotionStyle(forwardAnimation)}
          }
          100% { 
            ${applyEmotionStyle(backwardAnimation)}
          }
        `;

const generateCss = ({ animate, animationDuration, startStyles, endStyles }) => {
    const chosenStartAnimation = startStyles || DEFAULT_START_STYLE;
    const chosenEndAnimation = endStyles || DEFAULT_END_STYLE;

    return css`
        animation: ${animate
                ? createKeyFrame(chosenStartAnimation, chosenEndAnimation)
                : createKeyFrame(chosenEndAnimation, chosenStartAnimation)}
            ${animationDuration}ms linear forwards;
    `;
};

export default generateCss;
