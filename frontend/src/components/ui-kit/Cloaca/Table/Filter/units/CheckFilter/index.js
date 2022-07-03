import React, { useCallback, useContext, useMemo } from 'react';

import { ColorsContext } from 'lib-root/colors';

import { createOnCheckHandler, createOnCancelHandler, createOnOkHandler } from './utils';

import { StyledDropdown, Wrapper, CheckList, ButtonsWrapper, StyledButton } from './units';

const CheckFilter = React.forwardRef(
    (
        {
            updateFilter,
            filterOnOptionPick,
            revertOnCancel,
            closeOnCancel,
            closeOnOk,
            stableFilter,
            setValue,
            options,
            value: propValue,
            onOk,
            onCancel,
            icon = 'Funnel',
            customRender,
            onChange,
            isActive: propIsActive,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);
        const uniques = useMemo(() => [...new Set(options.map(({ original }) => original))], [options]);
        const value = propValue || uniques;

        let isActive = propIsActive;
        if (isActive === undefined) {
            isActive = propValue && propValue.length !== uniques.length;
        }

        const onCheckChange = useCallback(
            createOnCheckHandler({
                updateFilter,
                filterOnOptionPick,
                revertOnCancel,
                uniques,
                setValue,
                customRender,
                onChange
            }),
            [updateFilter, filterOnOptionPick, revertOnCancel, setValue, onChange, customRender]
        );
        const handleCancel = createOnCancelHandler({
            updateFilter,
            revertOnCancel,
            closeOnCancel,
            stableFilter,
            onCancel
        });
        const handleOk = createOnOkHandler({
            updateFilter,
            closeOnOk,
            value,
            onOk
        });

        return (
            <StyledDropdown {...{ ...restProps, ref, colors, icon, isActive }}>
                <Wrapper>
                    {(controls) => (
                        <>
                            <CheckList
                                {...{
                                    uniques,
                                    onCheckChange,
                                    value,
                                    render: customRender
                                }}
                            />
                            <ButtonsWrapper>
                                <StyledButton
                                    onClick={() => handleCancel(controls)}
                                    {...{ color: colors.info, colorScheme: 'outline' }}>
                                    Отменить
                                </StyledButton>
                                <StyledButton onClick={() => handleOk(controls)}>Применить</StyledButton>
                            </ButtonsWrapper>
                        </>
                    )}
                </Wrapper>
            </StyledDropdown>
        );
    }
);

export default CheckFilter;
