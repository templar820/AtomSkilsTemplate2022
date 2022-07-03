import React, { useContext } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';
import { LayersContext } from 'lib-root/layers';
import { hexToRGBA } from 'lib-root/utils/styleMixins';
import { useStateDelayer } from 'lib-root/utils';
import isPropValid from '@emotion/is-prop-valid';

import Spinner from 'lib-root/components/Spinner';

import config from './config';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledLoaderWrap = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isLoading'
})`
    background: ${({ isLoading, colors }) => hexToRGBA(colors.GrayScale_0, isLoading ? 0.8 : 0)};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${({ zIndex }) => zIndex};
    display: flex;
    visibility: ${({ isLoading }) => (isLoading === true ? 'visible' : 'hidden')};
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    transition: background ${config.animation.duration}ms ease-in-out,
        visibility 0.3s ease ${({ isLoading }) => (isLoading ? '0s' : `${config.animation.duration}ms`)};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const FadeChildWrap = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isLoading'
})`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    opacity: ${({ isLoading }) => +isLoading};
    transition: opacity ${config.animation.duration}ms ease-in-out ${({ delay }) => delay}ms;
`;

const StyledSorryText = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 5px;
    opacity: ${({ sorry }) => +sorry};
    transition: opacity ${config.animation.duration}ms ease-in-out;
`;

/**
 * Используется для отображения процесса подгрузки данных.
 *
 * import { utils as utilsComponents } from 'core-lib-react/components';
 *
 * const { HighlightWrapper, LoaderComponent, EmptyStates, Portal, PortalWithState, withColors, AnimationTransition } = utilsComponents;
 */
const LoaderComponent = React.forwardRef(
    ({ className, isLoading, longLoading, longLoadingTimeout, sorryText, wrapperStyle, ...rest }, ref) => {
        const colors = useContext(ColorsContext);
        const zIndex = useContext(LayersContext);

        const sorry = useStateDelayer({ state: isLoading && longLoading, initial: false, appear: longLoadingTimeout });

        return (
            <StyledLoaderWrap
                {...{ colors, ref, isLoading, wrapperStyle, zIndex }}
                className={setClassName({ props: { className }, name: 'loader-component' })}>
                <FadeChildWrap delay={isLoading ? config.animation.duration / 2 : 0} {...{ isLoading }}>
                    <Spinner width={60} {...rest} />
                    {longLoading && <StyledSorryText {...{ sorry }}>{sorryText}</StyledSorryText>}
                </FadeChildWrap>
            </StyledLoaderWrap>
        );
    }
);

LoaderComponent.displayName = 'LoaderComponent';
LoaderComponent.propTypes = {
    /** Sorry text */
    sorryText: PropTypes.string,
    /** Loading state */
    isLoading: PropTypes.bool,
    /** Set true if you need the sorry text */
    longLoading: PropTypes.bool,
    /** Styles for StyledLoaderWrap */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** timeout for long loading */
    longLoadingTimeout: PropTypes.number
};

LoaderComponent.defaultProps = {
    sorryText: 'Загрузка идет дольше обычного',
    longLoading: false,
    longLoadingTimeout: 2000
};

const MemoizedLoaderComponent = React.memo(LoaderComponent);
MemoizedLoaderComponent.displayName = 'MemoizedLoaderComponent';

export default MemoizedLoaderComponent;
export { MemoizedLoaderComponent, LoaderComponent };
