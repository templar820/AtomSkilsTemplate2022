import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { extractTextFromChildren } from 'lib-root/utils';

const StyledHighlight = styled.span`
    ${({ _css }) => _css};
`;

function wrapOccurrence(string, substring, ref, _css) {
    const match = string.toLowerCase().indexOf(substring.toLowerCase());
    if (match + 1) {
        return (
            <React.Fragment>
                {string.slice(0, match)}
                <StyledHighlight {...{ ref, _css }}>{string.slice(match, match + substring.length)}</StyledHighlight>
                {string.slice(match + substring.length)}
            </React.Fragment>
        );
    } else {
        return string;
    }
}

function wrapObjectOccurrence(children, substring, ref, _css) {
    const string = extractTextFromChildren(children);
    const match = string.toLowerCase().indexOf(substring.toLowerCase());
    if (match + 1) {
        const result = (
            <React.Fragment>
                {string.slice(0, match)}
                <StyledHighlight {...{ ref, _css }}>{string.slice(match, match + substring.length)}</StyledHighlight>
                {string.slice(match + substring.length)}
            </React.Fragment>
        );
        return result;
    } else {
        return string;
    }
}

const defaultHighlight = css`
    font-weight: 500;
`;

const defineResponse = (children, occurrence, highlight, ref) => {
    switch (typeof children) {
        case 'string':
            return wrapOccurrence(children, occurrence, ref, highlight || defaultHighlight);
        case 'object':
            return wrapObjectOccurrence(children, occurrence, ref, highlight || defaultHighlight);
        case 'function':
            return children(occurrence);
        default:
            return children;
    }
};

/**
 * ####Хайлайтер.
 *
 * import { utils as utilsComponents } from 'core-lib-react/components';
 *
 * const { HighlightWrapper, LoaderComponent, EmptyStates, Portal, PortalWithState, withColors, AnimationTransition } = utilsComponents;
 */
const HighlightWrapper = React.forwardRef(({ children, occurrence, highlight, emptyLabel = 'Нет данных' }, ref) =>
    typeof occurrence === 'string' ? defineResponse(children, occurrence, highlight, ref) : children || emptyLabel
);

HighlightWrapper.displayName = 'HighlightWrapper';
HighlightWrapper.propTypes = {
    /** String where should be find occurrence. Or "render props" function receives occurrence string */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /** String of text piece for searching in children */
    occurrence: PropTypes.string,
    /** emotion styles implemented to occurrence text */
    highlight: PropTypes.object,
    /** if component haven't children text */
    emptyLabel: PropTypes.object
};

export default HighlightWrapper;
