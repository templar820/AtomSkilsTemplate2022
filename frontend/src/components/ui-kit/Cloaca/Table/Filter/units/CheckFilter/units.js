import React, { isValidElement } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { withProps } from 'hoc-with-props';

import { Dropdown } from 'lib-ui/Dropdown';
import Icon from '../Icon';
import Button from 'lib-ui/Button';
import Checkbox from 'lib-ui/Checkbox';

const Li = styled.li`
    padding: 7px 0;
`;

const Ul = styled.ul`
    display: block;
    list-style: none;
    max-height: 340px;
    overflow: auto;
    padding: 0;
`;

const CheckList = ({ uniques, onCheckChange, value, render }) => {
    const renderType = Array.isArray(render) ? 'array' : typeof render;
    let items;
    switch (renderType) {
        case 'undefined':
            items = uniques.map((checkItem) => ({
                key: isValidElement(checkItem) ? checkItem.key : checkItem,
                children: checkItem,
                checked: value.includes(checkItem),
                onCheckChange: () => onCheckChange(checkItem)
            }));
            break;
        case 'array':
            items = render.map(({ onCheckChange: itemOnChange, ...item }, index) => ({
                key: index,
                onCheckChange: () => (typeof itemOnChange === 'function' ? itemOnChange : onCheckChange)(item),
                ...item
            }));
            break;
        case 'function':
            return render({ onCheckChange, uniques });
        default:
            console.error(new Error('customRender prop must be array or function'));
            return null;
    }
    return (
        <Ul>
            {items.map(({ onCheckChange, checked, children, key, ...restProps }) => (
                <Li {...{ key, ...restProps }}>
                    <Checkbox {...{ onCheckChange, checked, children }} />
                </Li>
            ))}
        </Ul>
    );
};

const StyledWrapper = styled.div`
    padding: 20px 25px;
`;

const Wrapper = React.forwardRef(({ dropdownControls, children, ...restProps }, ref) => (
    <StyledWrapper {...{ ref, ...restProps }}>{children(dropdownControls)}</StyledWrapper>
));

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0 10px;
`;

const StyledButton = withProps({ size: 'sm' })(styled(Button)`
    min-width: 115px;
    &:last-of-type {
        margin-left: 15px;
    }
`);

const paperStyle = css`
    max-height: none;
    padding: 0;
`;
const listStyle = css`
    padding: 0;
`;

const StyledDropdown = React.forwardRef(
    (
        {
            virtualization,
            setIsOpen,
            isOpen,
            isActive,
            icon,
            colors,
            disabled,
            closeOnOutsideClick,
            iconWidth = '20px',
            iconHeight = '20px',
            ...restProps
        },
        ref
    ) => (
        <Dropdown
            triggerElement={<Icon {...{ ref, isOpen, isActive, icon, iconWidth, iconHeight }} />}
            {...{
                paperStyle,
                listStyle,
                disableTriggerElement: disabled,
                closeOnOutside: closeOnOutsideClick,
                ...restProps
            }}
        />
    )
);

export { StyledDropdown, Wrapper, CheckList, ButtonsWrapper, StyledButton };
