import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ColorsContext } from 'lib-root/colors';
import Icon from 'lib-ui/InlineIcons';
import { StyledInner, StyledBadgeLabel, StyledOuter } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * `Badge` используется для выделения ключевой информации с предустановленным статусом
 */
const Badge = React.forwardRef(
    ({ className, color, bgColor, icon, text, badgePositionX, children, outerStyle, alignItems, ...rest }, ref) => {
        const colors = useContext(ColorsContext);
        bgColor = colors[bgColor] || bgColor;
        color = colors[color] || color;

        const childrenCount = React.Children.count(children);

        return (
            <StyledOuter {...{ ref, outerStyle }} className={setClassName({ props: { className }, name: 'badge' })}>
                <StyledInner {...{ badgePositionX, alignItems }}>
                    {children}
                    <StyledBadgeLabel
                        {...{
                            colors,
                            color,
                            bgColor,
                            text,
                            icon,
                            badgePositionX,
                            childrenCount
                        }}
                        {...rest}>
                        {icon && (
                            <Icon
                                color={color || colors.errorAccent}
                                width={bgColor ? '16px' : '18px'}
                                height={bgColor ? '16px' : '18px'}
                                icon={icon}
                            />
                        )}
                        {text}
                    </StyledBadgeLabel>
                </StyledInner>
            </StyledOuter>
        );
    }
);

Badge.displayName = 'Badge';
Badge.propTypes = {
    /** Color for badge text */
    color: PropTypes.string,
    /** Color for badge background */
    bgColor: PropTypes.string,
    /** Defines whether badge should be outlined */
    isOutlined: PropTypes.bool,
    /** Defines badge's horisontal position */
    badgePositionX: PropTypes.oneOf(['right', 'middle', 'left']),
    /** Defines badge's horisontal position */
    x: PropTypes.oneOf(['right', 'middle', 'left']),
    /** Defines badge's vertical position */
    badgePositionY: PropTypes.oneOf(['top', 'middle', 'bottom']),
    /** Defines badge's vertical position */
    y: PropTypes.oneOf(['top', 'middle', 'bottom']),
    /** Defines whether any node will be placed in the body of badge */
    children: PropTypes.node,
    /** Style group: badge label */
    extendStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Style group: outer element */
    outerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines allignment of inner items */
    alignItems: PropTypes.string,
    /** Defines badge icon */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

Badge.defaultProps = {
    color: 'GrayScale_0',
    bgColor: 'errorAccent',
    badgePositionX: 'right',
    badgePositionY: 'top',
    alignItems: 'center'
};

export default Badge;
