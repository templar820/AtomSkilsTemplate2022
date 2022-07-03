import { useCallback, useRef } from 'react';
import { css } from '@emotion/core';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const useExtendedCallback = ({ cb, propCb }) => {
    const cbRef = useRef({ cb, propCb });
    cbRef.current = { cb, propCb };

    return useCallback((curtainProps) => {
        const { cb, propCb } = cbRef.current;
        cb(curtainProps);
        if (propCb) propCb(curtainProps);
    }, []);
};

const getCurtainStyles = (propStyles, vertical, animationDuration, ...restProps) => {
    return ({ isDragging }) => css`
        ${!isDragging &&
            css`
                transition: ${vertical ? 'height' : 'width'} ${animationDuration}ms ease;
            `};

        ${applyEmotionStyle(propStyles, { isDragging, vertical, animationDuration, ...restProps })};
    `;
};

export { useExtendedCallback, getCurtainStyles };
