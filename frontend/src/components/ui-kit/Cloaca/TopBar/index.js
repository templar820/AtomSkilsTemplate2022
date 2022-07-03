import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from '@emotion/core';

import { positionUtils, debounce } from 'lib-root/utils';
import { Dropdown, Item as DropdownItem } from 'lib-ui/Dropdown';

import { withColors } from 'lib-ui/utils';
import { StyledLeftMenuItem, StyledRightMenuItem, StyledShowMoreMenuItem, StyledTopBar } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Контейнер для выпадающих меню.
 */
class TopBar extends Component {
    topBarRef = React.createRef();
    menuItemsRef = {
        left: [],
        more: [],
        right: []
    };

    state = {
        lastShowedMenuIndex: Infinity
    };

    renderLeftMenu = (items, colors) =>
        items.map((item, index) => {
            if (!item.props.disabled) {
                return (
                    <StyledLeftMenuItem
                        {...{ colors }}
                        isHidden={index > this.state.lastShowedMenuIndex}
                        key={index}
                        ref={(menuItem) => (this.menuItemsRef.left[index] = menuItem)}>
                        {item}
                    </StyledLeftMenuItem>
                );
            }
            return null;
        });

    renderShowMoreMenu = (items, colors) =>
        items.map((item, index) => (
            <StyledShowMoreMenuItem
                {...{ colors }}
                isHidden={this.state.lastShowedMenuIndex >= Object.keys(this.menuItemsRef.left).length}
                key={index}
                ref={(menuItem) => (this.menuItemsRef.more[index] = menuItem)}>
                {item}
            </StyledShowMoreMenuItem>
        ));

    renderRightMenu = (items, colors) => {
        if (items.length) {
            return items.map(
                (item, index) =>
                    !item.props.disabled && (
                        <StyledRightMenuItem
                            {...{ colors }}
                            key={index}
                            ref={(menuItem) => (this.menuItemsRef.right[index] = menuItem)}>
                            {item}
                        </StyledRightMenuItem>
                    )
            );
        }
        /* if right menu item doesn't exist, render blank div */
        return <div ref={(menuItem) => (this.menuItemsRef.right[0] = menuItem)}> </div>;
    };

    mapItems = (array, wrap) =>
        array.map((element) => (
            <DropdownItem
                key={element.text}
                occurrence={wrap ? this.props.occurrence : ''}
                leftIcon={element.leftIcon}
                rightIcon={element.rightIcon}
                childDropdown={
                    element.childDropdown && <Dropdown>{this.mapItems(element.childDropdown, false)}</Dropdown>
                }
                childDropdownPlacement={wrap ? 'bottom' : 'right-start'}
                childWrapperStyle={
                    wrap
                        ? css`
                              padding-top: 5px;
                          `
                        : undefined
                }
                value={element.value}
                onClick={element.onClick || (() => {})}
                disabled={element.disabled}>
                {element.text}
            </DropdownItem>
        ));

    getMaxLeftItems = () => {
        const { menuItemsRef, topBarRef } = this;
        const { lastShowedMenuIndex } = this.state;

        if (!(topBarRef && menuItemsRef.left.length && menuItemsRef.more.length && menuItemsRef.right.length)) {
            return;
        }

        const positionOfTopBar = positionUtils.getPositionOnPage(topBarRef.current);
        const positionOfRightMenu = positionUtils.getPositionOnPage(menuItemsRef.right[0]);
        const positionOfMoreItem = positionUtils.getPositionOnPage(menuItemsRef.more[0]);

        if (
            positionOfRightMenu.right > positionOfTopBar.right - 8 ||
            lastShowedMenuIndex < Object.keys(menuItemsRef.left).length
        ) {
            let lastIndex = -1;
            let freeSpace = 0;

            // if shrinks
            if (positionOfRightMenu.right > positionOfTopBar.right - 8) {
                freeSpace = positionOfTopBar.width - 16 - positionOfMoreItem.width - positionOfRightMenu.width;
            } else {
                // if extends
                freeSpace =
                    lastShowedMenuIndex === Object.keys(menuItemsRef.left).length - 1
                        ? // if only last element is hidden, calc without more menu item
                          positionOfTopBar.width - 16 - positionOfRightMenu.width
                        : positionOfTopBar.width - 16 - positionOfMoreItem.width - positionOfRightMenu.width;
            }

            // get last showed item
            menuItemsRef.left.reduce((acc, item, index) => {
                const sumWidth = acc + positionUtils.getPositionOnPage(item).width;

                if (sumWidth <= freeSpace) lastIndex = index;

                return sumWidth;
            }, 0);

            this.setState({ lastShowedMenuIndex: lastIndex });
        }
    };

    componentDidMount = () => {
        this.getMaxLeftItems();
        window.addEventListener('resize', debounce(this.getMaxLeftItems, 50));
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', debounce(this.getMaxLeftItems, 50));
    };

    render() {
        const { leftItems = [], rightItems = [], leftMenuOverTitle, colors } = this.props;
        const { mapItems, renderLeftMenu, renderRightMenu, renderShowMoreMenu } = this;
        const { lastShowedMenuIndex } = this.state;

        const showMoreItems = [{ text: leftMenuOverTitle, childDropdown: leftItems.slice(lastShowedMenuIndex + 1) }];

        return (
            <StyledTopBar
                ref={this.topBarRef}
                {...{ colors, ...this.props }}
                className={setClassName({ props: this.props, name: 'top-bar' })}>
                {leftItems.length && renderLeftMenu(mapItems(leftItems, true), colors)}
                {renderShowMoreMenu(mapItems(showMoreItems, true), colors)}
                {renderRightMenu(mapItems(rightItems, true), colors)}
            </StyledTopBar>
        );
    }
}

TopBar.displayName = 'TopBar';
TopBar.defaultProps = {
    leftMenuOverTitle: 'Other'
};

TopBar.propTypes = {
    /** Defines left items */
    leftItems: PropTypes.array,
    /** Defines left menu title */
    leftMenuOverTitle: PropTypes.string,
    /** Defines occurence */
    occurrence: PropTypes.string,
    /** Defines right items */
    rightItems: PropTypes.array,
    /** Defines component's additional styles */
    style: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines component's additional css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

export default withColors(TopBar);
