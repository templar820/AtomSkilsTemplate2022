import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LayersContext } from 'lib-root/layers';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { OutsideEventContainer } from 'react-on-outside-event';

import { LoaderComponent, withColors, AnimationTransition } from 'lib-ui/utils';

import { extendedCloneElement, debounce } from 'lib-root/utils';

import {
    StyledPaperWrapper,
    StyledPaper,
    StyledList,
    StyledLoadingWrapper,
    wrapperStyle,
    StyledTrigger,
    Positioner,
    StyledVirtualList,
    OutsideContainer
} from './units';

import { setClassName } from 'lib-root/utils/styleMixins';
import conf from '../config';

const { overscanRowCount, rowHeight, dropdownPadding } = conf;

/**
 * Используется для реализации составного блока, который объединяет всплывающий блок (popup) и вызывающий его управляющий компонент (например, кнопку или ссылку).
 *
 * import { Dropdown as DropdownComponents } from 'core-lib-react/components';
 *
 * const { Dropdown, Item as DropdownItem } = DropdownComponents;
 */
class Dropdown extends Component {
    state = { isOpenMain: !this.props.triggerElement, childrenRefs: [] };

    static contextType = LayersContext;
    zIndex = this.context;
    virtualListScrollIndex;
    triggerRef = React.createRef();
    virtualListRef = React.createRef();
    positionUpdater = React.createRef();

    updatePosition = () => this.positionUpdater.current && this.positionUpdater.current();

    // use this for update Popper position in children /
    updatePositionChildren = () => {
        this.state.childrenRefs.forEach((ref = {}) => {
            const { positionUpdate } = ref.current || {};
            if (positionUpdate) positionUpdate();
        });
    };

    static getDerivedStateFromProps(props, state) {
        const stateUpdate = {};
        if (React.Children.count(props.children) !== state.childrenRefs.length) {
            stateUpdate.childrenRefs = React.Children.map(props.children, () => React.createRef(), null);
        }
        return Object.keys(stateUpdate).length > 0 ? stateUpdate : null;
    }

    get isDropdownOpen() {
        return this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpenMain;
    }

    setDropdownOpen = (isOpen) => {
        const newIsOpen = this.props.isOpen !== undefined ? this.props.isOpen : isOpen;
        if (newIsOpen !== this.isDropdownOpen) {
            this.setState({
                isOpenMain: newIsOpen
            });
        }
    };

    saveVirtualListScrollIndex = ({ startIndex }) => (this.virtualListScrollIndex = startIndex);

    performScrollSnappingOnVirtualList = debounce(() => {
        this.virtualListRef.current.scrollToRow(this.virtualListScrollIndex);
    }, 250);

    componentDidUpdate(prevProps, prevState) {
        const { onTriggerDropdownOpenStateChange } = this.props;
        if (prevState.isOpenMain !== this.state.isOpenMain) {
            if (onTriggerDropdownOpenStateChange) onTriggerDropdownOpenStateChange(this.isDropdownOpen);
            if (this.isDropdownOpen) this.updatePosition();
        }
    }

    onClick = (e) => {
        if (this.props.triggerAction === 'click' && !this.props.disableTriggerElement) {
            const ignoreClick =
                this.props.ignoreClicksOnRefs &&
                this.props.ignoreClicksOnRefs.some(
                    ({ current }) => current && (current === e.target || (current && current.contains(e.target)))
                );
            !ignoreClick && this.setDropdownOpen(!this.isDropdownOpen);
        }
    };
    onKeyUp = ({ nativeEvent = {} }) => {
        if (this.props.disableTriggerElement) return;

        if (nativeEvent.code === 'Enter' || nativeEvent.code === 'Space') this.setDropdownOpen(!this.isDropdownOpen);
    };
    onMouseEnter = () => {
        if (this.props.triggerAction === 'hover' && !this.props.disableTriggerElement) this.setDropdownOpen(true);
    };
    onMouseLeave = () => {
        if (this.props.triggerAction === 'hover') this.setDropdownOpen(false);
    };
    handleClickOutside = () => {
        if (this.props.triggerAction === 'click' && this.isDropdownOpen) {
            this.setDropdownOpen(false);
        }
    };

    _renderVirtualizedItem({ index, style }) {
        return React.cloneElement(this.props.children[index], { index, style });
    }

    dropdownControls = {
        updatePosition: this.updatePosition,
        setIsOpenMain: (newState) => {
            this.setDropdownOpen(typeof newState === 'function' ? newState(this.isDropdownOpen) : newState);
        }
    };

    _getChildrenCloneProps = (child, index = 0) => {
        const { props: { childDropdownPlacement: grandchildDropdownPlacement } = {} } =
            typeof child === 'object' ? child : {};
        return {
            ref: this.state.childrenRefs[index],
            childDropdownPlacement: grandchildDropdownPlacement || this.props.childDropdownPlacement
        };
    };

    renderChildren = () => {
        const {
            dropdownControls,
            props: { childDropdownPlacement, isOpen, children, virtualization, maxNumberOfVisibleOptions }
        } = this;

        const basicProps = { isOpenMain: this.isDropdownOpen, isOpen, dropdownControls, childDropdownPlacement };

        if (virtualization) {
            const countOfChildren = React.Children.count(children);
            const defaultHeight = maxNumberOfVisibleOptions * rowHeight + dropdownPadding;
            const contentHeight = countOfChildren * rowHeight + dropdownPadding * 2;
            return (
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <StyledVirtualList
                            height={defaultHeight > contentHeight ? contentHeight : defaultHeight}
                            ref={this.virtualListRef}
                            rowCount={countOfChildren}
                            rowHeight={rowHeight}
                            overscanRowCount={overscanRowCount}
                            scrollToAlignment={'start'}
                            onScroll={this.props.scrollSnapping ? this.performScrollSnappingOnVirtualList : undefined}
                            onRowsRendered={this.props.scrollSnapping ? this.saveVirtualListScrollIndex : undefined}
                            width={width}
                            rowRenderer={this._renderVirtualizedItem.bind(this)}
                        />
                    )}
                </AutoSizer>
            );
        } else {
            return extendedCloneElement(children, basicProps, {
                array: this._getChildrenCloneProps,
                reactElement: this._getChildrenCloneProps
            });
        }
    };

    render() {
        const {
            className,
            colors,
            paperWrapperStyle,
            listStyle,
            isLoading,
            gap,
            triggerAction,
            triggerClassName,
            triggerElement,
            triggerElementRef,
            disableTriggerElement,
            triggerPlacement,
            triggerPopperProps,
            triggerStyle,
            closeOnOutside,
            withOutsideContainer,
            clickOutsideProps,
            listRef,
            tabIndex,
            zIndex,
            animationTransitionProps,
            virtualization,
            renderPrimaryDropdownInPortal,
            scrollSnapping,
            ...restProps
        } = this.props;
        const { onMouseEnter, onMouseLeave, onClick, onKeyUp, positionUpdater, dropdownControls, triggerRef } = this;
        const isOpenMain = this.isDropdownOpen;
        const withContainer = isOpenMain && withOutsideContainer;
        const paperHeight = dropdownPadding + rowHeight * restProps.maxNumberOfVisibleOptions;
        return (
            <>
                {triggerElement && (
                    <StyledTrigger
                        {...{
                            className: setClassName({ props: { triggerClassName }, name: 'dropdown-trigger' }),
                            onMouseEnter,
                            onClick,
                            onKeyUp,
                            triggerAction,
                            triggerStyle,
                            tabIndex,
                            disableTriggerElement,
                            ref: triggerElementRef ? undefined : triggerRef
                        }}>
                        {extendedCloneElement(triggerElement, { isOpenMain, dropdownControls })}
                    </StyledTrigger>
                )}
                {isOpenMain && (
                    <Positioner
                        {...{
                            triggerRef: triggerElementRef ? triggerElementRef : triggerRef,
                            triggerElement: renderPrimaryDropdownInPortal ? triggerElement : false,
                            triggerPlacement,
                            triggerPopperProps: {
                                ...triggerPopperProps,
                                modifiers: [{ name: 'offset', options: { offset: [0, gap] } }]
                            },
                            positionUpdater
                        }}>
                        {({ setPopperElement, popperStyle, opposite }) => (
                            <AnimationTransition
                                animationState={isOpenMain}
                                animationStateOnMount={true}
                                {...animationTransitionProps}>
                                {(animationStyles) => (
                                    <>
                                        {withContainer && <OutsideContainer />}
                                        <OutsideEventContainer
                                            callback={closeOnOutside ? this.handleClickOutside : () => {}}
                                            {...clickOutsideProps}>
                                            <StyledPaperWrapper
                                                {...{
                                                    className: setClassName({ props: { className }, name: 'dropdown' }),
                                                    ref: setPopperElement,
                                                    style: popperStyle,
                                                    opposite,
                                                    paperWrapperStyle,
                                                    gap,
                                                    triggerElement,
                                                    animationStyles,
                                                    onMouseEnter,
                                                    onMouseLeave
                                                }}>
                                                <StyledPaper
                                                    {...{
                                                        colors,
                                                        paperHeight,
                                                        triggerElement,
                                                        dropdownPadding,
                                                        ...restProps
                                                    }}>
                                                    <StyledList
                                                        {...{
                                                            listStyle,
                                                            isLoading,
                                                            ref: listRef,
                                                            virtualization,
                                                            scrollSnapping
                                                        }}>
                                                        {this.renderChildren()}
                                                        {isLoading && (
                                                            <StyledLoadingWrapper>
                                                                <LoaderComponent {...{ wrapperStyle, isLoading }} />
                                                            </StyledLoadingWrapper>
                                                        )}
                                                    </StyledList>
                                                </StyledPaper>
                                            </StyledPaperWrapper>
                                        </OutsideEventContainer>
                                    </>
                                )}
                            </AnimationTransition>
                        )}
                    </Positioner>
                )}
            </>
        );
    }
}

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
    /** Children for render in opened dropdown. Usually DropdownItems.
     * Also could be a render function, receiving { isOpenMain, isOpen, dropdownControls, childDropdownPlacement } */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /** defines how many rows will be visible in list (others might be revealed on scroll) */
    maxNumberOfVisibleOptions: PropTypes.number,
    /** Shows Loading state if component if set true */
    isLoading: PropTypes.bool,
    /** Defines if main dropdown will be opened or not
     * Shows to dropdown items, is dropdown open or not (if it be controlled component) */
    isOpen: PropTypes.bool,
    /** turn off part of shadow */
    disableSideShadow: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** margin-bottom for trigger elem */
    gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Enables scroll snapping. Defaults to true*/
    scrollSnapping: PropTypes.bool,
    /** event for show dropdown relative trigger */
    triggerAction: PropTypes.oneOf(['click', 'hover']),
    /** Custom class for trigger element */
    triggerClassName: PropTypes.string,
    /** React node (or render function returning react node) that opens/closes Dropdown.
     * Element will receive { isOpenMain and dropdownControls } as props. Function - as argument. */
    triggerElement: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.node, PropTypes.func]),
    /** the element ref to customize ref ro popper that opens the dropdown */
    triggerElementRef: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.object]),
    /** defines will the trigger opens on action and some styling */
    disableTriggerElement: PropTypes.bool,
    /** position of the dropdown relative to the trigger */
    triggerPlacement: PropTypes.oneOf([
        'auto',
        'top',
        'right',
        'bottom',
        'left',
        'auto-start',
        'auto-end',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end'
    ]),
    /** options that will be passed to the usePopper hook of triggered dropdown
     * (more - https://popper.js.org/docs/v2/) or fn that will receive current options and should return new ones */
    triggerPopperProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** custom styles for Paper */
    paperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** custom styles for PaperWrapper */
    paperWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** custom styles for StyledList */
    listStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** custom styles for trigger wrapper */
    triggerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** prop for disable outside click */
    closeOnOutside: PropTypes.bool,
    /** defines should the opened dropdown closes on trigger click */
    closeOnTriggerClick: PropTypes.bool,
    /** Callback fired when trigger dropdown closes or opens. Receives boolean value showing is trigger dropdown open, func(this.state.isOpenMain) */
    onTriggerDropdownOpenStateChange: PropTypes.func,
    /** Defines to OutsideEventContainer Container */
    withOutsideContainer: PropTypes.bool,
    /** Custom props to OutsideEventContainer component in dropdown */
    clickOutsideProps: PropTypes.object,
    /** Ref to children list wrapper */
    listRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** set sequence in navigation */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Position of nester dropDowns relative to their items. Undefined default value helps to keep opening direction.
     * Top level items with undefined will be interpreted as 'right-start'.
     * Placement might be overridden by exact item props.
     * Please keep this prop undefined for nesting direction sustain */
    childDropdownPlacement: PropTypes.oneOf([
        'auto',
        'top',
        'right',
        'bottom',
        'left',
        'auto-start',
        'auto-end',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end'
    ]),
    /** Props for AnimationTransition component. Look AnimationTransition spec.  */
    animationTransitionProps: PropTypes.object,
    /** Virtualization for a list of values */
    virtualization: PropTypes.bool,
    /** Defines if primary dropdown will be rendered in portal after body
     * true - in portal after body
     * false -right next to trigger element
     * Be aware: being rendered without portal, dropdown will calculate its width and position based on its wrapper */
    renderPrimaryDropdownInPortal: PropTypes.bool,
    /** Array of elements that will not cause open/close state change */
    ignoreClicksOnRefs: PropTypes.array
};

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
    maxNumberOfVisibleOptions: 6,
    triggerAction: 'click',
    triggerElement: null,
    disableTriggerElement: false,
    triggerPlacement: 'bottom-start',
    closeOnOutside: false,
    closeOnTriggerClick: true,
    tabIndex: 1,
    childDropdownPlacement: undefined,
    virtualization: false,
    renderPrimaryDropdownInPortal: true,
    scrollSnapping: true
};

export default withColors(Dropdown);
