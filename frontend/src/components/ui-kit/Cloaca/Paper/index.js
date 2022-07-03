import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import { ColorsContext } from 'lib-root/colors';
import { hexToRGBA, autoAddPx } from 'lib-root/utils/styleMixins';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledPaper = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size'
})`
    background-color: ${({ colors }) => colors.GrayScale_0};
    box-shadow: 0 0 ${({ colors, size }) => `${autoAddPx(size)} ${hexToRGBA(colors.GrayScale_700, 0.2)}`};
    ${({ css, ...restProps }) => applyEmotionStyle(css, restProps)};
`;

const Paper = React.forwardRef((props, ref) => {
    const colors = useContext(ColorsContext);
    return <StyledPaper {...{ colors, ref, ...props }} className={setClassName({ props: props, name: 'paper' })} />;
});

Paper.propTypes = {
    /** Defines font-size */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines additional component css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node
};
Paper.defaultProps = {
    size: '16px'
};

Paper.displayName = 'Paper';
export default Paper;
