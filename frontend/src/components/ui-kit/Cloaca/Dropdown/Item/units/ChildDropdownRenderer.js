import React, { useState, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { usePopper } from 'react-popper';
import { LayersContext } from 'lib-root/layers';

import { Portal } from 'lib-ui/utils';
import { applyPopperProps } from 'lib-root/utils/position';

import config from '../../config';
import { getOffset } from '../utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledChildDropdownWrapper = styled.span`
    ${({ isOpen, childWrapperStyle, zIndex, ...restProps }) => css`
        position: absolute;
        top: 0;
        left: 0;
        z-index: ${zIndex};
        transition: visibility 0.2s, opacity 0.2s;
        visibility: ${isOpen ? 'visible' : 'hidden'};
        opacity: ${+!!isOpen};
        ${applyEmotionStyle(childWrapperStyle, { isOpen, zIndex, ...restProps })};
    `}
`;

const ChildDropdownRenderer = React.forwardRef(
    (
        { referenceElement, childDropdown, childWrapperStyle, isOpen, childDropdownPlacement, popperProps },
        forwardedRef
    ) => {
        const zIndex = useContext(LayersContext);

        const refUpdate = useRef();
        const childDropdownRef = useRef();

        const options = useMemo(() => {
            const placement = childDropdownPlacement || 'right-start';
            const basicOptions = {
                placement,
                modifiers: [
                    ...config.modifiers,
                    {
                        name: 'offset',
                        options: {
                            offset: getOffset
                        }
                    }
                ]
            };
            return applyPopperProps(basicOptions, popperProps);
        }, [childDropdownPlacement, popperProps]);

        const [popperElement, setPopperElement] = useState();
        const { styles, state, update } = usePopper(referenceElement, popperElement, options);
        const { placement: currentPlacement } = state || {};
        refUpdate.current = update;

        useImperativeHandle(forwardedRef, () => ({
            positionUpdate: () => {
                typeof refUpdate.current === 'function' && refUpdate.current();
                childDropdownRef.current && childDropdownRef.current.updatePositionChildren();
            }
        }));

        return (
            <Portal hasLayerControl={false}>
                <StyledChildDropdownWrapper
                    ref={setPopperElement}
                    style={styles.popper}
                    {...{ childWrapperStyle, isOpen, zIndex }}>
                    {React.cloneElement(childDropdown, {
                        isOpen,
                        ref: childDropdownRef,
                        childDropdownPlacement: childDropdown.props.childDropdownPlacement || currentPlacement
                    })}
                </StyledChildDropdownWrapper>
            </Portal>
        );
    }
);

export default ChildDropdownRenderer;
