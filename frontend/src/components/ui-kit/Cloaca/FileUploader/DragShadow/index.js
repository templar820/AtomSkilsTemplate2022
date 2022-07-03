import React, { useCallback, useEffect, useRef } from 'react';
import withColors from 'lib-ui/utils/withColors';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

export const DragShadowElem = withColors(styled.div`
    position: absolute;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    opacity: 0.4;
    background-color: ${({ colors }) => colors.GrayScale_100};
    ${({ shadowStyle, ...restProps }) => applyEmotionStyle(shadowStyle, restProps)};
`);

export const DragShadow = ({ dropzoneRef, ...rest }) => {
    const shadowRef = useRef();

    const handleDragEvent = useCallback(
        (e) => {
            e.preventDefault();
            const rect = dropzoneRef.current.getBoundingClientRect();
            switch (e.type) {
                case 'dragenter':
                case 'dragover':
                    shadowRef.current.style.left = `${e.clientX - rect.left - 65}px`;
                    shadowRef.current.style.top = `${e.clientY - rect.top - 65}px`;
                    break;
                default:
                    break;
            }
        },
        [dropzoneRef]
    );

    useEffect(() => {
        const ref = dropzoneRef.current;
        ref.addEventListener('dragenter', handleDragEvent);
        ref.addEventListener('dragover', handleDragEvent);
        return () => {
            ref.removeEventListener('dragenter', handleDragEvent);
            ref.removeEventListener('dragover', handleDragEvent);
        };
    }, [dropzoneRef, handleDragEvent]);

    return <DragShadowElem ref={shadowRef} role="presentation" {...rest} />;
};
