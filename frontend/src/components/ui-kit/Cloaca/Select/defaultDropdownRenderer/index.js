import React from 'react';
import { Item } from 'lib-ui/Dropdown';
import InlineIcons from 'lib-ui/InlineIcons';

import { valueExistInSelected } from '../utils';
import { HeadingItem, CategoryCheckbox, StyledNoData } from './units';

const setCallback = (disabled, callback) => (disabled ? undefined : callback);

const defaultDropdownRenderer = ({ showTitles, dictionary, props, state, methods, showNativeTitleForOptions }) => {
    const searchResults = methods.searchResults();
    const arrayForRender = [];
    // adding create item
    if (props.create && state.search && !valueExistInSelected(state.search, props.options, { props, state, methods })) {
        const label = props.createNewLabel.replace('{search}', `"${state.search}"`);
        arrayForRender.push(
            <Item
                title={showTitles || showNativeTitleForOptions ? label : undefined}
                key={`dropdown-add-new`}
                className={`dropdown-add-new`}
                color={props.color}
                onClick={() => methods.createNew(state.search)}
                {...props.dropdownItemProps}>
                {label}
            </Item>
        );
    }

    // adding no-data item
    if (searchResults.length === 0) {
        arrayForRender.push(
            props.noDataRenderer ? (
                props.noDataRenderer({ props, state, methods })
            ) : (
                <StyledNoData key={`no-data`} className={`no-data`} text={''} header={props.noDataLabel} />
            )
        );
        return arrayForRender;
    }

    // adding select-all item
    if (props.selectAll && props.multi && searchResults.length > 1 && !props.categories) {
        const label = methods.areAllSelected() ? dictionary.allSelected : dictionary.selectAll;
        arrayForRender.push(
            <Item
                title={showTitles || showNativeTitleForOptions ? label : undefined}
                key={'select-all'}
                active={state.cursor === -1}
                itemIndex={-1}
                rightIcon={methods.areAllSelected() && <InlineIcons icon={'Success'} color={'primary'} />}
                role="option"
                isSelected={methods.areAllSelected()}
                tabIndex="-1"
                onClick={() => {
                    methods.selectAll();
                    methods.dropDown('close');
                }}
                onMouseEnter={() => methods.setCursor(-1)}
                onMouseLeave={() => methods.setCursor(null)}
                onKeyPress={() => methods.selectAll()}
                className={`item ${state.cursor === -1 ? 'item-active' : ''}`}
                color={props.color}>
                {label}
            </Item>
        );
    }

    // looping over search results
    let currentCategory = '';
    searchResults.forEach((item, itemIndex) => {
        // if passed custom item-renderer, use it
        if (props.itemRenderer) arrayForRender.push(props.itemRenderer({ item, itemIndex, props, state, methods }));

        // all situation when we do not add default item
        if (props.itemRenderer || (!props.keepSelectedInList && methods.isSelected(item))) return;

        const { disabled } = item;

        // add category item
        if (props.categories && currentCategory !== item[props.categoryField]) {
            currentCategory = item[props.categoryField];
            const optionsByCategory = props.options.filter(
                (op) => !op.disabled && op[props.categoryField] === currentCategory
            );
            arrayForRender.push(
                <HeadingItem
                    title={
                        showTitles || showNativeTitleForOptions
                            ? item.nativeTitle || item[props.categoryField]
                            : undefined
                    }
                    key={`${item[props.categoryField]}`}
                    selected={false}
                    rightIcon={
                        props.selectAll &&
                        optionsByCategory.length > 1 && (
                            <CategoryCheckbox
                                dictionary
                                category={currentCategory}
                                colors={props.colors}
                                field={props.categoryField}
                                options={props.options}
                                values={state.values}
                                addItems={methods.addItems}
                            />
                        )
                    }
                    role="heading"
                    itemIndex={itemIndex}
                    disabled={false}
                    {...item.styles}>
                    {item[props.categoryField]}
                </HeadingItem>
            );
        }

        // add good-old item)
        arrayForRender.push(
            <Item
                title={showTitles || showNativeTitleForOptions ? item.nativeTitle || item[props.labelField] : undefined}
                key={'search' + itemIndex}
                active={state.cursor === itemIndex}
                itemIndex={itemIndex}
                role="option"
                isSelected={(!methods.areAllSelected() || props.categories) && methods.isSelected(item)}
                aria-selected={methods.isSelected(item)}
                aria-disabled={disabled}
                disabled={disabled}
                occurrence={(props.highlight && state.search) || ''}
                aria-label={item[props.labelField]}
                tabIndex="-1"
                className={`item ${methods.isSelected(item) ? `item-selected` : ''} ${
                    state.cursor === itemIndex ? `item-active` : ''
                } ${disabled ? `item-disabled` : ''}`}
                onClick={setCallback(disabled, (e) => methods.addItem(item, e))}
                onMouseEnter={setCallback(disabled, () => methods.setCursor(itemIndex))}
                onMouseLeave={setCallback(disabled, () => methods.setCursor(null))}
                onKeyPress={setCallback(disabled, () => methods.addItem(item))}
                color={props.color}
                rightIcon={
                    (props.categories || props.checkedIcon) &&
                    methods.isSelected(item) && <InlineIcons icon={'Success'} color={'primary'} w={'20px'} h={'20px'} />
                }
                itemRef={item.ref}
                {...props.dropdownItemProps}
                {...item.styles}>
                {item[props.labelField]}
            </Item>
        );
    });

    return arrayForRender;
};

export default defaultDropdownRenderer;
