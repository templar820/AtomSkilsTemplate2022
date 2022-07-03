import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { withColors } from 'lib-ui/utils';

import icons from './config';
import { autoAddPx, setClassName } from 'lib-root/utils/styleMixins';
import { resolveProps } from 'lib-root/utils';

const isSystemIcon = (icon) => typeof icon === 'string' && icon.startsWith('Sys_');

const getDefaultIconSize = (icon) => (isSystemIcon(icon) ? '20px' : '32px');

const useIconCreator = (type) =>
    useMemo(
        () => styled(type)`
            ${({ colors, color, disabled, width, height, css: _css }) => css`
                fill: ${!disabled ? colors[color] || color || 'currentColor' : colors.GrayScale_200};
                width: ${width};
                min-width: ${width};
                height: ${height};
                ${_css};
            `};
        `,
        [type]
    );

/**
 *  Компонент для вывода svg-иконки.
 */
const InlineIcons = React.forwardRef(
    ({ disabled: propDisabled, isDisabled, icon, w, h, width, height, ...restProps }, ref) => {
        const disabled = resolveProps(propDisabled, isDisabled);

        const isCustomIcon = !icons[icon];

        const type = !isCustomIcon ? 'svg' : React.isValidElement(icon) ? icon.type : icon;
        const StyledSvg = useIconCreator(type);

        return (
            <StyledSvg
                width={autoAddPx(w || width || getDefaultIconSize(icon))}
                height={autoAddPx(h || height || getDefaultIconSize(icon))}
                fill={undefined}
                {...{ ref, disabled, ...restProps }}
                className={setClassName({ props: restProps, name: 'inline-icons' })}>
                {!isCustomIcon && <use xlinkHref={`#${icon}`} />}
            </StyledSvg>
        );
    }
);

InlineIcons.displayName = 'InlineIcons';
InlineIcons.propTypes = {
    /** There is an opportunity to throw a custom icon https://megawiki.megafon.ru/pages/viewpage.action?pageId=580035528 */
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.string]).isRequired,
    /** Defines whether component is disabled
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** Defines width of component */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines height of component */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for width */
    w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for height */
    h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines color of component */
    color: PropTypes.string,
    /** Defines additional className */
    className: PropTypes.string
};
InlineIcons.defaultProps = {
    disabled: false,
    width: null,
    height: null,
    w: null,
    h: null,
    color: 'currentColor',
    icon: 'Logo'
};

export default withColors(InlineIcons);
