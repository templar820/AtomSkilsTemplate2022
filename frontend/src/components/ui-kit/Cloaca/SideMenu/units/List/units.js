import { useEffect } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import { getSize } from '../../utils';

export const StyledUl = styled.ul(({ listStyle, ...props }) => {
    const { isOpen, openWidth, state, level, openAnimationDuration, closeAnimationDuration, ulRef: ref } = props;
    return css`
        margin: 0;
        padding: 0;
        list-style: none;
        flex-shrink: 0;
        overflow: hidden;
        overflow-y: ${state === 'entered' || level === 0 ? 'auto' : 'hidden'};
        position: relative;
        background-color: inherit;
        transition: height ${isOpen ? openAnimationDuration : closeAnimationDuration}ms ease;
        min-width: 100%;
        max-width: ${openWidth !== 'auto' && isOpen ? '100%' : 'none'};
        height: ${getSize({ state, isOpen, ref, direction: 'Height', min: '0px', max: 'auto' })};
        ${applyEmotionStyle(listStyle, props)};
    }
    `;
});

export const EffectTrigger = ({ state, effect, children }) => {
    useEffect(() => {
        effect();
    }, [state, effect]);
    return children;
};
