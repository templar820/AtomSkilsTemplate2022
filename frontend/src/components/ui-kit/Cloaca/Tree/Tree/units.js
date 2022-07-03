import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { setClassName } from 'lib-root/utils/styleMixins';

const StyledWrapper = styled.div`
    position: relative;
    &:after {
        content: '';
        opacity: ${({ isFaderShown }) => (isFaderShown ? 1 : 0)};
        transition: 0.1s opacity;
        position: absolute;
        top: 0;
        bottom: 9px;
        right: 0;
        width: 100px;
        pointer-events: none;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    }
`;

const StyledSubWrapper = styled.div`
    padding-bottom: 9px;
    overflow-x: ${({ horizontalOverflow }) => horizontalOverflow};
`;

function checkFader(element, callback) {
    if (element) callback(element.scrollWidth - element.clientWidth - element.scrollLeft > 0);
}

function FadingWrapper({ children, expandedTree, animationDuration, horizontalOverflow }) {
    const [isFaderShown, setIsFaderShown] = useState(true);
    const subWrapperRef = useRef(null);

    useEffect(() => {
        setTimeout(function() {
            checkFader(subWrapperRef.current, setIsFaderShown);
        }, animationDuration);
    }, [expandedTree]);

    return (
        <StyledWrapper {...{ isFaderShown }}>
            <StyledSubWrapper
                {...{ horizontalOverflow, ref: subWrapperRef, children }}
                onScroll={() => checkFader(subWrapperRef.current, setIsFaderShown)}
            />
        </StyledWrapper>
    );
}

function Wrapper(props) {
    const { children, className, horizontalOverflow } = props;
    return horizontalOverflow ? (
        <FadingWrapper {...props} className={setClassName({ props: { className }, name: 'tree__fading-wrapper' })}>
            {children}
        </FadingWrapper>
    ) : (
        children
    );
}

export { Wrapper };
