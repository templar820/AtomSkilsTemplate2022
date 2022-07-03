import React from 'react';
import PropTypes from 'prop-types';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { autoAddPx } from 'lib-root/utils/styleMixins';
import { withColors } from 'lib-ui/utils';

import logos from './units';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const Wrapper = styled.span`
    ${({ padding, fontSize, color, css: _css, ...restProps }) => css`
        display: inline-flex;
        padding: ${autoAddPx(padding)};
        font-size: ${autoAddPx(fontSize)};
        color: ${color};
        ${applyEmotionStyle(_css, { padding, fontSize, color, ...restProps })};
    `}
`;

/**
 * Логотипы
 */
const Logotype = React.forwardRef(({ colors, color, logo, fontSize, ...restProps }, ref) => {
    color = colors[color] || color;
    return (
        <Wrapper {...{ ref, color, ...restProps }} className={setClassName({ props: restProps, name: 'logotype' })}>
            {logos(fontSize)[logo]}
        </Wrapper>
    );
});

Logotype.displayName = 'Logotype';
Logotype.propTypes = {
    /** Defines component's font-size */
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines component's padding */
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines component's color */
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines component's logo */
    logo: PropTypes.oneOf(['primary', 'secondary', 'iot']),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines additional component css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};
Logotype.defaultProps = {
    fontSize: '16px',
    padding: '40px',
    color: 'primary',
    logo: 'primary'
};

export default withColors(Logotype);
