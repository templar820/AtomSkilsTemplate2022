import React, { memo, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import MaskedField from 'lib-ui/MaskedField';
import { ColorsContext } from 'lib-root/colors';

import RenderPrefix from '../RenderPrefix';
import config from '../../config';

import { useFieldChangeHandler } from './utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const fieldInnerStyle = ({ isOpen, colors, userStyle }) => css`
    ${isOpen && `background-color: ${colors.GrayScale_100}`};
    ${userStyle}
`;

const StyledField = styled(MaskedField, { shouldForwardProp: (prop) => prop !== 'wrapperStyle' })`
    min-width: 254px;
    padding-right: 16px;
    ${({ wrapperStyle }) => applyEmotionStyle(wrapperStyle)}
    &::-ms-clear {
        display: none;
    }
`;

const DateField = memo(
    React.forwardRef(
        (
            {
                isOpen,
                isClearable,
                clearHandler,
                clearIconRef,
                wrapperStyle,
                innerStyle,
                fieldInnerRef,
                type,
                values,
                setValues,
                withTime,
                showHours,
                showMinutes,
                showSeconds,
                ...restProps
            },
            ref
        ) => {
            const colors = useContext(ColorsContext);
            const { placeholder, createFieldValue, mask: maskFunc } = config.types[type];
            const mask = useMemo(() => maskFunc({ withTime, showHours, showMinutes, showSeconds }), [
                type,
                withTime,
                showHours,
                showMinutes,
                showSeconds
            ]);

            const onChange = useFieldChangeHandler(setValues, type, {
                withTime,
                showHours,
                showMinutes,
                showSeconds
            });

            const value = createFieldValue(values, { withTime, showHours, showMinutes, showSeconds });

            const iconViewObject = useMemo(() => {
                const view = type === 'time' ? 'icon' : 'prefix';
                const icon = type === 'time' ? 'Clock' : undefined;
                return { [view]: <RenderPrefix {...{ isClearable, clearHandler, clearIconRef, icon }} /> };
            }, [type, value]);

            const _innerStyle = useMemo(() => fieldInnerStyle({ isOpen, colors, userStyle: innerStyle }), [
                isOpen,
                colors,
                innerStyle
            ]);
            return (
                <StyledField
                    wrapperStyle={wrapperStyle}
                    innerStyle={_innerStyle}
                    showMask={false}
                    keepCharPositions={true}
                    mB={0}
                    inputType={type}
                    {...{ ref, placeholder, mask, value, isClearable, onChange, ...iconViewObject, ...restProps }}
                />
            );
        }
    )
);

export default DateField;
