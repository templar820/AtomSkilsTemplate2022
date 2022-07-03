import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEqual } from 'lib-root/utils';
import { setClassName } from 'lib-root/utils/styleMixins';
import { withColors } from 'lib-ui/utils';

import Field from 'lib-ui/Field';
import { getVTreeTops, updateVTree } from 'lib-ui/Tree';

import getType from 'lib-root/utils/getType';

import {
    StyledSelectIcon,
    StyledSelectWrapper,
    getInputStyles,
    getInnerStyle,
    getInputWrapperStyle,
    NativeSelect,
    NativeIcon,
    StyledOutsideEventContainer
} from './units';

import getDictionary from './config';
import { handlePlaceHolder, valueExistInSelected, getOptionsFromChecked } from './utils.js';
import { Content } from './SelectContent';
import { SelectDropdown } from './DropdownSwitcher';
/**
 * ####Выпадающий список.
 * ######options must have unique values (in value field)!**
 * > replica https://github.com/sanusart/react-dropdown-select
 */
class Select extends Component {
    state = {
        select: null,
        fieldInner: null,
        dropdown: false,
        values: this.props.values,
        stringifiedValues: Select.getStringifiedValue(this.props.values),
        search: '',
        selectBounds: {},
        cursor: null,
        showedChips: this.props.showedChips,
        // used only on single mode, for right overflow
        hideContent: false,
        // options below used for treeSelect only
        vTree: {}
    };

    refUpdate = React.createRef();
    optionsRefs = this.props.options.map(() => React.createRef());

    static getStringifiedValue(values) {
        return JSON.stringify(values.map(({ value }) => value));
    }

    static getDerivedStateFromProps({ isValuesControlled, values }, { values: prevValues }) {
        return isValuesControlled && values !== prevValues
            ? { stringifiedValues: Select.getStringifiedValue(values), values }
            : null;
    }

    updatePositionDropdown = () => {
        try {
            this.refUpdate.current.positionUpdate();
        } catch (e) {
            console.error(e);
        }
    };

    handleValuesChange = ({ values, clear = false }) => {
        if (!this.props.isValuesControlled) {
            this.setState({
                stringifiedValues: Select.getStringifiedValue(values),
                values
            });
        }
        this.props.onChange(values, { clear });
        if (this.props.closeOnSelect) this.dropDown('close');
    };

    getValues = () => (this.props.isValuesControlled ? this.props.values : this.state.values);

    componentDidMount() {
        this.dictionary = getDictionary(this.props.dictionary);

        this.props.onChange(this.getValues(), { mount: true });

        this.dropDown('close');
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            !this.props.isValuesControlled &&
            !isEqual(prevProps.values, this.props.values) &&
            isEqual(prevProps.values, prevState.values)
        ) {
            this.handleValuesChange({ values: this.props.values.slice() });
        }

        if (
            this.props.isSearchable &&
            this.props.unfiltered &&
            prevProps.options.length !== this.props.options.length
        ) {
            this.optionsRefs = this.props.options.map(() => React.createRef());
        }

        if (prevState.dropdown && prevState.dropdown !== this.state.dropdown) this.onDropdownClose();

        if (!prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
            const args = { state: this.state, props: this.props, methods: this.methods };
            this.props.onDropdownOpen(args);
        }
        if (
            this.state.dropdown ||
            (prevState.dropdown !== this.state.dropdown && this.state.dropdown) ||
            this.props.autoFocus
        ) {
            this.state.select.focus();
        }

        if (prevState.dropdown !== this.state.dropdown && !this.state.dropdown) {
            this.state.select.blur();
        }
    }

    onBlur = async (e) => {
        const args = { state: this.state, props: this.props, methods: this.methods };

        if (this.props.onBlur(e, args) === false) return;

        if (!this.state.dropdown) {
            await this.setState(() => ({
                hideContent: false
            }));
            return this.state.select.blur();
        }

        return this.state.select.focus();
    };

    onFocus = async (e) => {
        const { autoSuggest, isSearchable, multi } = this.props;
        const searchValue = this.getSearchValue();

        const args = { state: this.state, props: this.props, methods: this.methods };
        const result = await this.props.onFocus(e, args);
        if (result === false) return;

        if (!multi && (autoSuggest || isSearchable)) {
            this.state.select.setSelectionRange(0, searchValue.length);
        }
    };

    onDropdownClose = () => {
        const args = { state: this.state, props: this.props, methods: this.methods };

        this.setState({ cursor: null });
        this.props.onDropdownClose(args);
    };

    getClearedValue = () => (this.props.clearOnBlur ? '' : this.state.search);

    getSearchValue = () => {
        const values = this.getValues() || [];
        const lastValue = values[values.length - 1] || {};
        const tempResult = lastValue[this.props.labelField] || '';

        switch (getType(tempResult)) {
            case 'string':
            case 'number':
                return tempResult;
            default:
                return lastValue[this.props.valueField] || '';
        }
    };

    onClick = (event) => this.dropDown(!this.state.dropdown || this.isEditable ? 'open' : 'close', event);

    dropDown = (action = 'toggle', event) => {
        if (
            this.props.portal &&
            !this.props.closeOnSelect &&
            event &&
            event.srcElement &&
            event.srcElement.offsetParent &&
            event.srcElement.offsetParent.classList.contains(this.props.dropdownClassName)
        ) {
            return;
        }

        if (this.props.keepOpen) return this.setState({ dropdown: true });

        if (action === 'toggle') action = this.state.dropdown ? 'close' : 'open';

        if (action === 'close' && this.state.dropdown) {
            this.state.select.blur();

            return this.setState({
                dropdown: false,
                search: this.getClearedValue(),
                hideContent: false
            });
        }

        if (action === 'open' && !this.state.dropdown) {
            this.state.select.focus();

            const searchValue = this.getSearchValue();

            this.setState(
                () => ({
                    dropdown: action === 'open' ? true : !this.state.dropdown,
                    search: this.state.dropdown ? this.getClearedValue() : this.props.multi ? '' : searchValue,
                    hideContent: !this.props.multi && !this.state.dropdown
                }),
                () => {
                    this.isEditable && this.state.select.setSelectionRange(0, searchValue.length);
                }
            );
        }

        return false;
    };

    getSelectInnerRef = () => this.state.fieldInner;

    setFieldRefs = (field) => {
        this.setState({
            select: field ? field.inputRef.current : null,
            fieldInner: field ? field.fieldInnerRef.current : null
        });
    };

    setCursor = (cursor) => this.setState({ cursor });

    addNativeItem = (e) => {
        if (this.props.multi) {
            const selectedOptions = [...e.target.options]
                .filter((opt) => opt.selected === true)
                .map((opt) => opt.value);
            return this.handleValuesChange({ values: selectedOptions });
        }

        return this.handleValuesChange({ values: [e.target.value] });
    };

    addItem = (item /*, event*/) => {
        const { valueField, keepOpen, closeOnSelect } = this.props;

        if (this.props.multi) {
            if (this.getValues().find((obj) => obj.value === item[valueField])) {
                return this.removeItem(null, item, false);
            }
            this.handleValuesChange({ values: [...this.getValues(), item] });
            this.collapseItems();
        } else {
            this.handleValuesChange({ values: [item] });
            this.setState({
                dropdown: closeOnSelect ? false : !!keepOpen,
                hideContent: false
            });
        }

        this.props.clearOnSelect && this.setState({ search: '' });

        return true;
    };

    //originally created for categories mode with selectAll prop
    //if you wanna override something, please save backward compatibility
    addItems = (e, items, category, isAllOptionsSelected) => {
        const values = this.getValues();
        const valuesByCategory = values.filter((val) => val[this.props.categoryField] === category);

        if (isAllOptionsSelected) {
            return this.removeItem(e, items);
        }

        const filteredItems =
            valuesByCategory.length > 0 && items.length > valuesByCategory.length
                ? items.filter((item) => !values.includes(item))
                : items;

        this.handleValuesChange({ values: [...values, ...filteredItems] });
        this.collapseItems();
    };

    removeItem = (event, item, close = false) => {
        const { onRemoveItem } = this.props;

        if (close) {
            this.dropDown('close');
        }

        item = Array.isArray(item) ? item : [item];

        const filterItems = (_value) => {
            return item.findIndex((_item) => _item[this.props.valueField] === _value[this.props.valueField]);
        };

        this.handleValuesChange({ values: this.getValues().filter((value) => filterItems(value) < 0) });

        if (this.props.treeSelect) {
            this.removeItemFromTree(item);
        }

        onRemoveItem && onRemoveItem({ event, item });
    };

    addItemInTree = ({ getNewVTree }) => {
        const vTree = getNewVTree();
        const values = getOptionsFromChecked(this.props.options, getVTreeTops(vTree, true));
        // update vTree 'n' values
        this.handleValuesChange({ values });
        this.setState({ vTree });
    };

    removeItemFromTree = (items) => {
        const change = items.reduce((result, { value }) => ({ ...result, [value]: false }), {});
        this.setState(({ vTree }) => ({ vTree: updateVTree({ vTree, change }) }));
    };

    expandItems = (/*event*/) => {
        this.setState({
            showedChips: this.getValues().length
        });
    };

    collapseItems = (/*event*/) => {
        if (this.state.showedChips !== this.props.showedChips)
            this.setState({
                showedChips: this.props.showedChips
            });
    };

    setSearch = async (event) => {
        await this.setState({
            search: event.target.value
        });

        const { autoSuggest, unfiltered, caseSensitive, onSearchChange, keepOpen, closeOnSelect } = this.props;

        try {
            await onSearchChange(this.props, this.state, this.methods);
        } catch (err) {
            console.error('Error in Select, method: onSearchChange \n', err);
        }

        const currentOptions = this.searchResults();
        const firstNotDisableIndex = currentOptions.findIndex((item) => !item.disabled);

        if (unfiltered) {
            const regexp = new RegExp(this.methods.safeString(event.target.value), caseSensitive ? '' : 'i');
            const option = currentOptions.find(({ label }) => regexp.test(label));
            if (option && option.ref && option.ref.current) option.ref.current.scrollIntoView();
        } else {
            this.setState({
                cursor: autoSuggest ? firstNotDisableIndex : null,
                dropdown: autoSuggest || (closeOnSelect ? false : !!keepOpen ? true : this.state.dropdown)
            });
        }
    };

    clearAll = (/*event*/) => {
        const args = { state: this.state, props: this.props, methods: this.methods };
        this.props.onClearAll(args);
        this.handleValuesChange({ values: [], clear: true });
        this.setState({
            search: ''
        });
    };

    selectAll = () => {
        const args = { state: this.state, props: this.props, methods: this.methods };

        this.props.onSelectAll(args);
        return this.handleValuesChange({ values: this.props.options.filter((option) => !option.disabled) });
    };

    isSelected = (option) =>
        !!this.getValues().find((value) => value[this.props.valueField] === option[this.props.valueField]);

    areAllSelected = () => this.getValues().length === this.props.options.filter((option) => !option.disabled).length;

    safeString = (string) =>
        (typeof string === 'string' ? string : string.toString()).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    splitToCategories = (options = []) => {
        const { categories, categoryField, sortCategories } = this.props;

        if (!categories) {
            return options;
        }
        let currentCategory = '';

        return options
            .sort((a, b) => {
                if (!sortCategories) {
                    return options;
                }
                if (a[categoryField] < b[categoryField]) {
                    return -1;
                }
                if (a[categoryField] > b[categoryField]) {
                    return 1;
                }
                return 0;
            })
            .reduce((acc, option) => {
                if (currentCategory !== option[categoryField]) {
                    currentCategory = option[categoryField];
                    acc.push([option]);
                } else {
                    acc[acc.length - 1].push(option);
                }

                return acc;
            }, []);
    };

    sortBy = () => {
        const { sortBy, labelField, options } = this.props;

        // [[item],[item]]
        const categorizedOptions = this.splitToCategories(options);

        if (!sortBy) {
            return options;
        }

        return categorizedOptions.reduce((result, item) => {
            const sortedItem = item.sort((a, b) => {
                let fieldA;
                let fieldB;

                const sortA = a[sortBy];
                const sortB = b[sortBy];

                if (a[sortBy] === undefined || sortB === undefined) {
                    return options;
                }

                if (sortA && typeof sortA === 'number') {
                    fieldA = a[sortA ? sortBy : labelField];
                    fieldB = b[sortB ? sortBy : labelField];

                    return fieldA - fieldB;
                }

                fieldA = String(a[sortA ? sortBy : labelField]).toLowerCase();
                fieldB = String(b[sortB ? sortBy : labelField]).toLowerCase();

                if (fieldA < fieldB) {
                    return -1;
                }

                if (fieldA > fieldB) {
                    return 1;
                }

                return 0;
            });
            return [...result, ...sortedItem];
        }, []);
    };

    searchFn = ({ state, props, methods }) => {
        const regexp = new RegExp(methods.safeString(state.search), props.caseSensitive ? '' : 'i');

        return methods
            .sortBy(props.options)
            .filter(
                (item) =>
                    !(props.isSearchable || props.autoSuggest) ||
                    regexp.test(item[props.searchBy] || item[props.labelField])
            );
    };

    searchResults = () => {
        const args = { state: this.state, props: this.props, methods: this.methods };

        if (this.props.unfiltered) {
            return this.methods.sortBy(this.props.options).map((item, index) => {
                item.ref = this.optionsRefs[index];
                return item;
            });
        }

        return this.props.searchFn(args) || this.searchFn(args);
    };

    activeCursorItem = (activeCursorItem) =>
        this.setState({
            activeCursorItem
        });

    createNew = (item) => {
        const args = { state: this.state, props: this.props, methods: this.methods };

        const newValue = {
            [this.props.labelField]: item,
            [this.props.valueField]: item
        };

        const createResult = this.props.onCreateNew(newValue, args);

        if (createResult === false) return;

        this.addItem(typeof createResult === 'object' ? createResult : newValue);

        this.setState({ search: '' }, () => {
            this.setState({});
        });
    };

    onClickOutSide = (event) => this.dropDown('close', event);

    handleKeyDown = (event) => {
        const { cursor, search, hideContent } = this.state;
        const { autoSuggest, isSearchable, isClearable, multi, options } = this.props;
        const values = this.getValues() || [];
        const currentOptions = this.searchResults();

        if (event.key === 'ArrowDown' && cursor === null) {
            const firstNotDisableIndex = currentOptions.findIndex((item) => !item.disabled);
            return this.setState({
                dropdown: true,
                cursor: firstNotDisableIndex >= 0 ? firstNotDisableIndex : null
            });
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }

        if (event.key === 'Escape') {
            this.dropDown('close');
        }

        if (event.key === 'Enter') {
            const currentItem = currentOptions[cursor];

            if (currentItem && !currentItem.disabled) {
                return this.addItem(currentItem);
            }
            const args = { state: this.state, props: this.props, methods: this.methods };

            if (this.props.create && !valueExistInSelected(search, options, args) && search && cursor === null) {
                this.methods.createNew(search);
            }
        }

        if ((event.key === 'Backspace' || event.key === 'Delete') && !search && isClearable) {
            if (values.length > 0) {
                const searchValue = this.getSearchValue();
                const lastValue = values[values.length - 1] || {};

                if (autoSuggest || isSearchable) {
                    this.setState({ search: searchValue, hideContent: !multi ? true : hideContent });
                }

                this.removeItem(null, lastValue, false);
            }
        }

        if (currentOptions.every((option) => option.disabled)) {
            return;
        }

        if (event.key === 'ArrowUp' && cursor !== null) {
            let inc = cursor - 1 >= 0 ? 1 : -1 * (currentOptions.length - 1);

            while (currentOptions[cursor - inc].disabled) {
                if (cursor - inc > 0) {
                    inc++;
                } else {
                    inc = -1 * (currentOptions.length - cursor - 1);
                }
            }

            this.setState((prevState) => ({
                cursor: prevState.cursor - inc >= 0 ? prevState.cursor - inc : currentOptions.length - 1
            }));
        }

        if (event.key === 'ArrowDown') {
            let inc = cursor + 1 <= currentOptions.length - 1 ? 1 : -1 * (currentOptions.length - 1);

            while (currentOptions[cursor + inc].disabled) {
                if (cursor + inc < currentOptions.length - 1) {
                    inc++;
                } else {
                    inc = -1 * cursor;
                }
            }

            this.setState((prevState) => ({
                cursor: prevState.cursor + inc <= currentOptions.length - 1 ? prevState.cursor + inc : 0
            }));
        }
    };

    methods = {
        dropDown: this.dropDown,
        addNativeItem: this.addNativeItem,
        addItem: this.addItem,
        addItems: this.addItems,
        addItemInTree: this.addItemInTree,
        removeItem: this.removeItem,
        removeItemFromTree: this.removeItemFromTree,
        setSearch: this.setSearch,
        clearAll: this.clearAll,
        selectAll: this.selectAll,
        searchResults: this.searchResults,
        getSelectInnerRef: this.getSelectInnerRef,
        isSelected: this.isSelected,
        areAllSelected: this.areAllSelected,
        handleKeyDown: this.handleKeyDown,
        activeCursorItem: this.activeCursorItem,
        createNew: this.createNew,
        sortBy: this.sortBy,
        onBlur: this.onBlur,
        safeString: this.safeString,
        setCursor: this.setCursor,
        onClickOutSide: this.onClickOutSide,
        expandItems: this.expandItems,
        getValues: this.getValues
    };

    renderFieldIcon = () => {
        const { props, state, methods } = this;
        if (props.dropdownHandleRenderer) {
            return props.dropdownHandleRenderer({ props, state, methods });
        } else {
            const isClearBtnEnabled = props.isClearable && this.getValues().length;
            return (
                <>
                    <StyledSelectIcon
                        isClearBtnEnabled={isClearBtnEnabled}
                        w={'20px'}
                        h={'20px'}
                        icon={'Cross_exit'}
                        className={'clear'}
                        tabIndex="-1"
                        closeIcon
                        isOpen={state.dropdown}
                        onClick={this.clearAll}
                        onKeyPress={this.clearAll}
                    />
                    <StyledSelectIcon
                        isClearBtnEnabled={isClearBtnEnabled}
                        w={'32px'}
                        h={'32px'}
                        icon={'Triangle'}
                        tabIndex="-1"
                        onClick={this.onClick}
                        isOpen={state.dropdown}
                        onKeyPress={(event) => this.dropDown('toggle', event)}
                        onKeyDown={(event) => this.dropDown('toggle', event)}
                        className={'dropdown-handle'}
                    />
                </>
            );
        }
    };

    get isEditable() {
        return this.props.isSearchable || this.props.create || this.props.autoSuggest;
    }

    render() {
        const { dictionary, props, state, methods } = this;
        const { fieldInner, hideContent, stringifiedValues } = this.state;
        const {
            native,
            multi,
            disabled,
            isLoading,
            style,
            isSearchable,
            create,
            colors,
            color,
            name,
            values,
            className = '',
            chipProps,
            showedChips,
            onRemoveItem,
            autoSuggest,
            nativeStyle,
            inputStyle: _inputStyle,
            innerStyle: _innerStyle,
            inputWrapperStyle: _inputWrapperStyle,
            selectWrapperStyle,
            hideDropdown,
            showNativeTitleForOptions,
            ...restProps
        } = this.props;

        const inputWrapperStyle = getInputWrapperStyle(_inputWrapperStyle, props, state);
        const inputStyle = getInputStyles(_inputStyle, props);
        const innerStyle = getInnerStyle(_innerStyle, props);
        const _color = colors[color] || color;
        return native ? (
            <StyledSelectWrapper style={{ position: 'relative' }} {...{ selectWrapperStyle }}>
                <NativeSelect
                    customStyles={nativeStyle}
                    multiple={multi}
                    onChange={this.addNativeItem}
                    {...{ disabled, colors }}>
                    {props.options.map((option) => {
                        return (
                            <option
                                key={option[props.valueField]}
                                value={option[props.valueField]}
                                disabled={option.disabled}
                                aria-disabled={option.disabled}>
                                {option[props.labelField]}
                            </option>
                        );
                    })}
                </NativeSelect>
                {!multi && <NativeIcon />}
            </StyledSelectWrapper>
        ) : (
            <StyledOutsideEventContainer
                callback={this.onClickOutSide}
                {...{ selectWrapperStyle }}
                className={setClassName({ props: this.props, name: 'select' })}>
                {props.inputRenderer ? (
                    props.inputRenderer({ props, state, methods })
                ) : (
                    <Field
                        {...restProps}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onClick={this.onClick}
                        tabIndex="0"
                        placeholder={handlePlaceHolder(this.props, this.state)}
                        ref={this.setFieldRefs}
                        icon={this.renderFieldIcon}
                        onChange={this.setSearch}
                        value={this.state.search}
                        {...{
                            disabled,
                            isLoading,
                            style,
                            inputStyle,
                            innerStyle,
                            inputWrapperStyle,
                            readOnly: !isSearchable && !create && !autoSuggest,
                            color: _color,
                            className: 'input ' + className
                        }}
                        prefix={hideContent ? undefined : <Content {...{ dictionary, props, state, methods }} />}>
                        {!hideDropdown && (
                            <SelectDropdown
                                {...{
                                    dictionary,
                                    props,
                                    state,
                                    methods,
                                    showNativeTitleForOptions,
                                    referenceElement: fieldInner,
                                    ref: this.refUpdate
                                }}
                            />
                        )}
                    </Field>
                )}
                {name && <input name={name} type="hidden" value={stringifiedValues} />}
            </StyledOutsideEventContainer>
        );
    }
}

Select.displayName = 'Select';
Select.propTypes = {
    ...Field.propTypes,
    /** Callback fired on every values change, func: (values, metaInfo) => {} */
    onChange: PropTypes.func.isRequired,
    /** Callback fired on every search change, func: (props,state,methods) => {} */
    onSearchChange: PropTypes.func,
    /** Select options array */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
            styles: PropTypes.shape({
                chipStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                highlightStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                childWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                listStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                itemStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                topLineStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                checkboxStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                checkboxSquareStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                checkboxCaptionStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                overlayStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
                dotIconStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
            }),
            disabled: PropTypes.bool
        })
    ).isRequired,
    /** Callback fired on select close, func: ({props,state,methods}) => {} */
    onDropdownClose: PropTypes.func,
    /** Callback fired on field blur, func: (e = syntheticEvent,{props,state,methods}) => {} */
    onBlur: PropTypes.func,
    /** Callback fired on field focus, func: (e,{props,state,methods}) => {} */
    onFocus: PropTypes.func,
    /** Callback fired on search change, func: ({props,state,methods}) => {} */
    searchFn: PropTypes.func,
    /** Callback fired to check is search in values or options, func: (search, options, {props,state,methods}) => {} */
    valueExistFn: PropTypes.func,
    /** Callback fired on create new option, func: (enwValue,{props,state,methods}) => {}*/
    onCreateNew: PropTypes.func,
    /** Callback fired on select open, func: ({props,state,methods}) => {} */
    onDropdownOpen: PropTypes.func,
    /** Callback fired on clear all selected options call, func: ({props,state,methods}) => {} */
    onClearAll: PropTypes.func,
    /** Callback fired on select all options call, func: ({props,state,methods}) => {} */
    onSelectAll: PropTypes.func,
    /** Callback for removeItem func */
    onRemoveItem: PropTypes.func,
    /** Array of selected value/values */
    values: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
            disabled: PropTypes.bool,
            styles: PropTypes.shape({
                chipStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
            })
        })
    ),
    /** Key of option/value object that must be taken as label */
    labelField: PropTypes.string,
    /** Key of option/value object that must be taken as value */
    valueField: PropTypes.string,
    /** Key of option/value object that must be taken as category */
    categoryField: PropTypes.string,
    /** If `true`, Select will be opened all the time */
    keepOpen: PropTypes.bool,
    /** element or bool for Portal */
    portal: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    /** Multiselect mode: allows to select more than 1 option */
    multi: PropTypes.bool,
    /** Autosuggest mode: select tries to suggest desired option by search string */
    autoSuggest: PropTypes.bool,
    /** Placeholder for Field input */
    placeholder: PropTypes.string,
    /** Placeholder on add new option */
    addPlaceholder: PropTypes.string,
    /** Placeholder on search for value */
    searchPlaceholder: PropTypes.string,
    /** Disabled mode: select becomes inactive and changes styling accordingly */
    disabled: PropTypes.bool,
    /** Create mode: allows user to create new options for select if search doesn't get any result */
    create: PropTypes.bool,
    /** Classname for Select component */
    className: PropTypes.string,
    /** Classname for Select Dropdown component */
    dropdownClassName: PropTypes.string,
    /** Set open position.
     * Auto refers to behavior when Select tries to render Dropdown top or bottom depends of free space in viewport*/
    dropdownPosition: PropTypes.oneOf(['top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'auto']),
    /** Dictionary of string constants to override default text variables */
    dictionary: PropTypes.object,
    /** options that will be passed to the usePopper hook (see more - https://popper.js.org/docs/v2/)
     * or function that will receive current options and should return new ones for hook */
    popperProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** Sets dropdown height in number of options visible to user */
    maxNumberOfVisibleOptions: PropTypes.number,
    /** Defines if loader should be rendered within Select field */
    isLoading: PropTypes.bool,
    /** Clearable mode: allows to clear Select if any option is selected, renders specific control to clear all */
    isClearable: PropTypes.bool,
    /** Search mode: allows user typing in Field to search for desired option */
    isSearchable: PropTypes.bool,
    /** Controlled mode: switches off built-in values handling so that values will be handled only by passed values and onChange props */
    isValuesControlled: PropTypes.bool,
    /** Defines if Select should highlight parts of option label that match search string */
    highlight: PropTypes.bool,
    /** Defines if Select should always keep all options in list (on search) */
    keepSelectedInList: PropTypes.bool,
    /** Turns on rightIcon view */
    dropdownHandle: PropTypes.bool,
    /** If `true`, Select will be closed after user selects an option */
    closeOnSelect: PropTypes.bool,
    /** If `true`, Select's search field will be cleared on blur */
    clearOnBlur: PropTypes.bool,
    /** If `true`, Select's search field will be cleared after user selects an option */
    clearOnSelect: PropTypes.bool,
    /** If `true`, Select will be focused on mount */
    autoFocus: PropTypes.bool,
    /** If `true`, Select will render additional option in list that allows to select all options */
    selectAll: PropTypes.bool,
    /** Defines by what option/value object key search should be performed, when search mode on */
    searchBy: PropTypes.string,
    /** Defines by what option/value object key options should be sorted */
    sortBy: PropTypes.string,
    /** Empty state label */
    noDataLabel: PropTypes.string,
    /** Label for option of a new option creation, when create mode on*/
    createNewLabel: PropTypes.string,
    /** Color to all select */
    color: PropTypes.string,
    /** Style for Field component */
    style: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to the wrapper of select component. */
    selectWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Props for Chip components */
    chipProps: PropTypes.object,
    /** Props for Dropdown components */
    dropdownProps: PropTypes.object,
    /** Props for Dropdown item components */
    dropdownItemProps: PropTypes.object,
    /** Render func for Field prefix ({ props, state, methods }) */
    contentRenderer: PropTypes.func,
    /** Render func for dropdown ({ props, state, methods }) */
    dropdownRenderer: PropTypes.func,
    /** Render func for item in Field prefix ({ props, state, methods }) */
    itemRenderer: PropTypes.func,
    /** Render func for no data state ({ props, state, methods }) */
    noDataRenderer: PropTypes.func,
    /** Render func for item in dropdown ({ props, state, methods }) */
    optionRenderer: PropTypes.func,
    /** Render func for Field ({ props, state, methods }) */
    inputRenderer: PropTypes.func,
    /** Render func for right icon on clearable ({ props, state, methods }) */
    clearRenderer: PropTypes.func,
    /** Render func for right icon ({ props, state, methods }) */
    dropdownHandleRenderer: PropTypes.func,
    /** TreeSelect mode: options will be rendered to a tree-like structure, requires specific options formatting */
    treeSelect: PropTypes.bool,
    /** Max number of chips on field before collapse */
    showedChips: function(props, propName, componentName) {
        componentName = componentName || 'anon';
        if (props[propName]) {
            let value = props[propName];
            if (typeof value === 'number') {
                return value >= 0 && Number.isInteger(value)
                    ? null
                    : new Error(propName + ' in ' + componentName + " must be 'integer && > 0'");
            }
        }
        // assume all ok
        return null;
    },
    /** Categories mode: select options will be groupped by category, requires specific options formatting */
    categories: PropTypes.bool,
    /** If `true` categories will be sortred alphabetically when catagories mode is on */
    sortCategories: PropTypes.bool,
    /** Native mode: select will be rendered as native html select element*/
    native: PropTypes.bool,
    /** Styles for native select */
    nativeStyle: PropTypes.object,
    /** Defines whether selected items should have check marks */
    checkedIcon: PropTypes.bool,
    /** Defines whether search should be case sensitive */
    caseSensitive: PropTypes.bool,
    /** Unfiltered mode: list of options won't be filtered by search string */
    unfiltered: PropTypes.bool,
    /** Props that will be passed to Tree component, when treeSelect mode is on */
    treeProps: PropTypes.object,
    /** Dropdown will always be hidden while hideDropdown is `true` */
    hideDropdown: PropTypes.bool,
    /** Virtualization for a list of values */
    virtualization: PropTypes.bool,
    /** If true, native title will be shown on hover on option in dropdown
     *  By default shows options label
     *  If need custom title, pass `nativeTitle` prop in option
     * */
    showNativeTitleForOptions: PropTypes.bool
};

Select.defaultProps = {
    addPlaceholder: 'Добавить',
    searchPlaceholder: 'Искать',
    placeholder: 'Выберите...',
    values: [],
    options: [],
    multi: false,
    disabled: false,
    searchBy: 'label',
    sortBy: null,
    isClearable: false,
    isSearchable: false,
    isValuesControlled: false,
    highlight: true,
    dropdownHandle: true,
    keepOpen: undefined,
    noDataLabel: 'Нет данных',
    createNewLabel: 'Создать {search}',
    labelField: 'label',
    valueField: 'value',
    categoryField: 'category',
    color: 'GrayScale_700',
    keepSelectedInList: true,
    closeOnSelect: false,
    clearOnBlur: true,
    clearOnSelect: true,
    dropdownPosition: 'bottom-start',
    popperProps: {},
    dropdownClassName: 'dropdown',
    maxNumberOfVisibleOptions: 5,
    showNativeTitleForOptions: false,
    autoFocus: false,
    portal: true,
    create: true,
    name: null,
    onBlur: () => undefined,
    onFocus: () => undefined,
    onChange: () => undefined,
    onSearchChange: () => undefined,
    onDropdownOpen: () => undefined,
    onDropdownClose: () => undefined,
    onClearAll: () => undefined,
    onSelectAll: () => undefined,
    onCreateNew: () => undefined,
    searchFn: () => undefined,
    treeSelect: false,
    showedChips: 0,
    categories: false,
    sortCategories: true,
    native: false,
    selectAll: false,
    hideDropdown: false,
    virtualization: false
};

export default withColors(Select);
