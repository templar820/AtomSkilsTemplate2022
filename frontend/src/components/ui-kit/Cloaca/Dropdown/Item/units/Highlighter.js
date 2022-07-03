import React from 'react';

import HighlightWrapper from 'lib-ui/utils/HighlightWrapper';
import getType from 'lib-root/utils/getType';

const Highlighter = ({ children, occurrence, highlightStyle }) => {
    switch (getType(children)) {
        case 'number':
        case 'string':
            return (
                <HighlightWrapper {...{ occurrence, highlight: highlightStyle }}>
                    {children && children.toString()}
                </HighlightWrapper>
            );
        case 'function':
            return children(occurrence);
        case 'undefined':
            return null;
        default:
            return children;
    }
};

export default Highlighter;
