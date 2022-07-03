import React from 'react';
import styled from '@emotion/styled';

import { Item } from 'lib-ui/Dropdown';
import Checkbox from 'lib-ui/Checkbox';
import { EmptyStates } from 'lib-ui/utils';

export const StyledNoData = styled(EmptyStates)`
    position: static;
    transform: none;
    margin: 20px 0;
`;

export const HeadingItem = styled(Item)`
    & > span {
        color: rgba(51, 51, 51, 0.5);
        padding: 10px 20px;
        font-weight: 500;
        cursor: default;
        &:hover {
            background: transparent;
        }
    }
`;

//checkbox for select all items by category
export const CategoryCheckbox = ({ addItems, category, colors, dictionary, field, options, values }) => {
    const cValues = values.filter((val) => val[field] === category);
    const cOptions = options.filter((opt) => !opt.disabled && opt[field] === category);
    const isAllOptionsSelected = cValues.length === cOptions.length;

    return (
        <Checkbox
            checked={cValues.length > 0 && !isAllOptionsSelected ? 'indeterminate' : isAllOptionsSelected}
            css={{ display: 'flex', color: colors.GrayScale_700, fontWeight: 'normal' }}
            onCheckChange={(e) => addItems(e, cOptions, category, isAllOptionsSelected)}
            squareStyle={{ flex: 'none', margin: '0 14px 0 0' }}>
            {dictionary.selectAllByCategory}
        </Checkbox>
    );
};
