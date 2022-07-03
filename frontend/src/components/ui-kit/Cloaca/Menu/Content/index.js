import React from 'react';
import { css } from '@emotion/core';

import InlineIcons from 'lib-ui/InlineIcons';
import { Tree, TreeItem } from 'lib-ui/Tree';
import Hamburger from './Hamburger';
import { StyledWrapper, ContentWrapper, StyledItemText, StyledTextWrapper, overlayStyles, topLineStyle } from './units';

export default React.forwardRef(
    (
        {
            isControlled,
            withCheckbox,
            items,
            isOpen,
            keyField,
            activeItem,
            onClickItem,
            onClickHamburger,
            setActiveItem,
            treeAnimationDuration,
            colors,
            ...restProps
        },
        ref
    ) => {
        const mapMenu = ({ items = [], pIndex = '', hasParent = false }) =>
            items.map((item, index) => {
                const prefix =
                    item.subMenu && !hasParent ? index.toString() : pIndex ? `${pIndex}-${index}` : `${index}`;
                let activeParents = [];
                if (activeItem) {
                    activeParents = activeItem.split('-').reduce((prevItem, item, index) => {
                        const key = index > 0 ? `${prevItem}-${item}` : item;
                        prevItem.push(key);
                        return prevItem;
                    }, []);
                }
                const active = activeItem === prefix;

                const activeParent = activeParents.includes(prefix);
                const activeProps = { active, activeParent };
                if (!isOpen) {
                    activeProps.expanded = false;
                }
                return (
                    <TreeItem
                        title={getItemTitle({ colors, title: item.title, icon: item.icon, active, withCheckbox })}
                        key={item[keyField] || prefix}
                        disabled={item.disabled}
                        overlayStyles={overlayStyles(colors, active, activeParent, isOpen)}
                        dotIconStyles={!withCheckbox && { display: 'none' }}
                        topLineStyle={
                            withCheckbox
                                ? !isOpen && { display: 'none' }
                                : topLineStyle(colors, active, activeParent, withCheckbox, isOpen)
                        }
                        checkboxCaptionStyle={
                            hasParent
                                ? css`
                                      ${!withCheckbox && 'font-size: 14px'};
                                      white-space: nowrap;
                                  `
                                : undefined
                        }
                        {...activeProps}>
                        {item.subMenu &&
                            item.subMenu.length &&
                            mapMenu({ items: item.subMenu, pIndex: prefix, hasParent: true })}
                    </TreeItem>
                );
            });

        const getItemTitle = ({ colors, title, icon, active, withCheckbox }) => {
            const DotIcon = <circle cx="10" cy="10" r="2" fill={active ? colors.primary : colors.GrayScale_700} />;

            return (
                <StyledTextWrapper>
                    {!withCheckbox && (
                        <InlineIcons
                            css={css`
                                margin-right: 15px;
                                fill: ${colors.primary}!important;
                            `}
                            w="20px"
                            h="20px"
                            icon={icon || DotIcon}
                        />
                    )}
                    <StyledItemText>{title}</StyledItemText>
                </StyledTextWrapper>
            );
        };

        return (
            <StyledWrapper {...{ ref }}>
                <Hamburger {...{ isOpen, onClickHamburger, colors }} />
                <ContentWrapper>
                    <Tree
                        listStyle={{ display: 'block' }}
                        checkboxSquareStyle={!withCheckbox && { display: 'none' }}
                        isControlled={!withCheckbox}
                        controlledExpanding={!isOpen}
                        onCheckChange={({ change = {} } = {}) => {
                            const [key] = Object.keys(change);

                            if (!isControlled) {
                                change[key] !== undefined && setActiveItem(key);
                            }

                            if (onClickItem && change[key] !== undefined) {
                                return onClickItem(key);
                            }
                        }}
                        selection={!withCheckbox}
                        {...{
                            isCheckable: true,
                            itemHeight: 45,
                            animationDuration: treeAnimationDuration,
                            ...restProps
                        }}>
                        {mapMenu({ items })}
                    </Tree>
                </ContentWrapper>
            </StyledWrapper>
        );
    }
);
