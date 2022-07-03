import React from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';
import Icon from 'lib-ui/InlineIcons';
import Select from 'lib-ui/Select';
import Button from 'lib-ui/Button';

import { StyledFilterWrap, StyledButtonBox, StyledFilterWrapLeft, StyledFilterWrapRight, wrapperStyle } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: this.props.values
        };
    }
    selectStuff = React.createRef();

    iconRender = () => {
        const { fieldIcon, fieldIconWidth, fieldIconHeight } = this.props;
        return <Icon w={fieldIconWidth} h={fieldIconHeight} icon={fieldIcon} />;
    };

    clearAll = (event) => {
        this.props.onClearAll && this.props.onClearAll(event, this.props.dropdownControls);
        this.setState(() => ({
            values: []
        }));
    };

    changeFunc = (values) => {
        this.props.onChange && this.props.onChange(values, this.props.dropdownControls);
        this.setState(() => ({
            values: this.selectStuff.current.state.values
        }));
    };

    onOk = (event) => {
        const { values } = this.selectStuff.current.state;

        this.setState(() => ({ values }));

        this.props.onOk &&
            this.props.onOk(values, this.props.dropdownControls, {
                event,
                select: this.selectStuff.current
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.values !== this.props.values) {
            this.setState({ values: this.props.values });
        }
    }

    render() {
        const {
            options,
            isClearable,
            autoSuggest,
            highlight,
            isSearchable,
            multi,
            isLoading,
            propsForSelect,
            filterWrapStyles,
            create
        } = this.props;

        const { values } = this.state;

        return (
            <ColorsContext.Consumer>
                {(colors) => (
                    <StyledFilterWrap
                        {...{ filterWrapStyles }}
                        className={setClassName({ props: this.props, name: 'search-filter' })}>
                        <StyledFilterWrapLeft>
                            <Select
                                ref={this.selectStuff}
                                onChange={this.changeFunc}
                                wrapperStyle={wrapperStyle}
                                dropdownHandleRenderer={this.iconRender}
                                {...{
                                    values,
                                    options,
                                    isClearable,
                                    autoSuggest,
                                    highlight,
                                    isSearchable,
                                    multi,
                                    isLoading,
                                    create,
                                    ...propsForSelect
                                }}
                            />
                        </StyledFilterWrapLeft>
                        <StyledFilterWrapRight>
                            <StyledButtonBox>
                                <Button onClick={this.onOk} colorScheme={'primary'} size={'sm'} icon={'Success'} />
                                <Button
                                    onClick={this.clearAll}
                                    colorScheme={'primary'}
                                    size={'sm'}
                                    icon={'Cross_exit'}
                                    color={colors.errorAccent}
                                />
                            </StyledButtonBox>
                        </StyledFilterWrapRight>
                    </StyledFilterWrap>
                )}
            </ColorsContext.Consumer>
        );
    }
}

SearchFilter.displayName = 'SearchFilter';
SearchFilter.propTypes = {
    /** Callback fires on ok press */
    onOk: PropTypes.func.isRequired,
    /** Select option array */
    options: PropTypes.array.isRequired,
    /** Array of multi values */
    values: PropTypes.array,
    /** Turn on clearAll mode */
    isClearable: PropTypes.bool,
    /** Create new item for select */
    create: PropTypes.bool,
    /** Turn on autosuggest mode */
    autoSuggest: PropTypes.bool,
    /** Turn on highlight mode */
    highlight: PropTypes.bool,
    /** Turn on search mode */
    isSearchable: PropTypes.bool,
    /** Turn on multiselect mode */
    multi: PropTypes.bool,
    /** Turn on loading Field mode */
    isLoading: PropTypes.bool,
    /** Stay Select open all time or not */
    keepOpen: PropTypes.bool,
    /** Icon image */
    fieldIcon: PropTypes.string,
    /** Icon width */
    fieldIconWidth: PropTypes.string,
    /** Icon height */
    fieldIconHeight: PropTypes.string,
    /** Callback fired on every search change */
    onSearchChange: PropTypes.func,
    /** Callback fired on select open */
    onDropdownOpen: PropTypes.func,
    /** Callback fired on select close */
    onDropdownClose: PropTypes.func,
    /** Callback fired on clear all selected options call */
    onClearAll: PropTypes.func,
    /** Callback fired on select all options call */
    onSelectAll: PropTypes.func,
    /** Wrapper styles */
    filterWrapStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

SearchFilter.defaultProps = {
    options: [],
    isClearable: false,
    create: true,
    highlight: true,
    isSearchable: false,
    multi: false,
    addPlaceholder: 'Добавить',
    searchPlaceholder: 'Искать',
    placeholder: 'Выберите...',
    values: [],
    disabled: false,
    name: null,
    fieldIcon: 'Search',
    fieldIconWidth: '32px',
    fieldIconHeight: '32px',
    propsForSelect: { marginBottom: 0 },

    onChange: () => undefined,
    onOk: () => undefined,
    onSearchChange: () => undefined,
    onDropdownOpen: () => undefined,
    onDropdownClose: () => undefined,
    onClearAll: () => undefined,
    onSelectAll: () => undefined,
    onCreateNew: () => undefined,
    searchFn: () => undefined
};

export default SearchFilter;
