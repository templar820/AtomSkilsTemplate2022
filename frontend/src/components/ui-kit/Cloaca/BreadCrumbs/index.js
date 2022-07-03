import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { rem } from 'lib-root/utils/units';
import { ColorsContext } from 'lib-root/colors';

import { StyledIcon, StyledItem, StyledLink, StyledText, Wrapper } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Компонент `BreadCrumbs` используется для создания цепочки навигации по каким-либо объектам.
 */
const BreadCrumbs = React.forwardRef(
    ({ items, onLinkClick, linkComponent, lastItemColor, itemStyle, iconStyle, ...rest }, ref) => {
        const colors = useContext(ColorsContext);
        lastItemColor = colors[lastItemColor] || lastItemColor;
        const lastItemIndex = items.length - 1;

        return (
            <Wrapper {...{ ref, ...rest }} className={setClassName({ props: rest, name: 'bread-crumbs' })}>
                {items.map((item, i) => (
                    <StyledItem
                        key={'breadC_' + i}
                        fontSize={rem(12)}
                        color={item.link && i !== lastItemIndex ? lastItemColor : colors.GrayScale_700}
                        {...{ itemStyle }}
                        className={setClassName({ props: rest, name: 'bread-crumbs__item' })}>
                        {i !== lastItemIndex ? (
                            <React.Fragment>
                                {linkComponent ? (
                                    React.cloneElement(linkComponent, { ...item })
                                ) : (
                                    <StyledLink {...{ colors }} disabled={!item.link} onClick={() => onLinkClick(item)}>
                                        {item.title}
                                    </StyledLink>
                                )}
                            </React.Fragment>
                        ) : (
                            <StyledText fontSize={rem(12)} {...{ lastItemColor }}>
                                {item.title}
                            </StyledText>
                        )}
                        {i !== lastItemIndex && (
                            <StyledIcon
                                icon={'Arrow_type_1'}
                                color={i === lastItemIndex - 1 ? lastItemColor : colors.GrayScale_700}
                                w={'24px'}
                                h={'24px'}
                                disabled={!item.link}
                                {...{ iconStyle }}
                            />
                        )}
                    </StyledItem>
                ))}
            </Wrapper>
        );
    }
);

BreadCrumbs.displayName = 'BreadCrumbs';
BreadCrumbs.propTypes = {
    /** size of entire component */
    size: PropTypes.oneOf(['sm', 'lg']),
    /** items to show, example: [{title: 'test', link: '#'}] */
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** color to highlighted (last) component */
    lastItemColor: PropTypes.string,
    /** Callback fire then not disabled link is clicked, func (item) */
    onLinkClick: PropTypes.func,
    /** render function to redefine link component */
    linkComponent: PropTypes.element,
    /** Style group: outer element*/
    wrapStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Style group: each link or text */
    itemStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Style group: icons between links */
    iconStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Define bounds of component */
    width: PropTypes.string,
    /** Define bounds of component */
    height: PropTypes.string
};

BreadCrumbs.defaultProps = {
    items: [{ link: '#', title: '' }],
    size: 'sm',
    lastItemColor: 'secondary'
};

export default BreadCrumbs;
