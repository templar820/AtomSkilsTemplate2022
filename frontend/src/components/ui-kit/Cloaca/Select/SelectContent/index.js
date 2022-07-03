import React, { useContext } from 'react';

import Chips from 'lib-ui/Chips';

import { ColorsContext } from 'lib-root/colors';
import { hexToRGBA } from 'lib-root/utils/styleMixins';

import { StyledContentValue } from '../units';

const Content = ({ dictionary = {}, props, state, methods, className }) => {
    const colors = useContext(ColorsContext);
    const values = methods.getValues();
    const visibleChips = values.filter((_, index) => index <= state.showedChips - 1);
    const otherChips = values.filter((_, index) => index > state.showedChips - 1);

    const renderValue = (value) => {
        const { labelField } = props;
        const label = value[labelField];
        return typeof label === 'function' ? label() : label;
    };

    const customChip = ({ isCollapse = false, item, key }) => {
        return (
            <Chips
                style={{ marginTop: 4, marginBottom: 4, marginRight: 4 }}
                css={item.styles?.chipStyle}
                key={key}
                role="listitem"
                closeBtnProps={{ color: hexToRGBA(colors.GrayScale_700, 0.5) }}
                colorScheme={'gray'}
                disabled={props.disabled}
                color={colors.GrayScale_100}
                className={'option ' + className}
                onClick={isCollapse ? (event) => methods.expandItems(event) : () => {}}
                onClose={(event) => methods.removeItem(event, item, props.closeOnSelect)}
                {...props.chipProps}>
                {isCollapse
                    ? state.showedChips === 0 || undefined
                        ? methods.areAllSelected()
                            ? dictionary.chipAllSelected
                            : `${dictionary.chipSelected} ${values.length}`
                        : `Еще ${values.length - state.showedChips}`
                    : renderValue(item)}
            </Chips>
        );
    };

    return (
        <React.Fragment>
            {props.contentRenderer ? (
                props.contentRenderer({ props, state, methods })
            ) : (
                <React.Fragment>
                    {props.multi ? (
                        <React.Fragment>
                            {values &&
                                visibleChips.map((item) =>
                                    props.optionRenderer
                                        ? props.optionRenderer({ item, props, state, methods })
                                        : customChip({
                                              item,
                                              key: `${item[props.valueField]}${item[props.labelField]}`
                                          })
                                )}
                            {state.showedChips < values.length && customChip({ isCollapse: true, item: otherChips })}
                        </React.Fragment>
                    ) : (
                        values &&
                        values.length > 0 && (
                            <StyledContentValue style={{ display: 'inline-block' }} className={'option ' + className}>
                                {renderValue(values[0])}
                            </StyledContentValue>
                        )
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export { Content };
