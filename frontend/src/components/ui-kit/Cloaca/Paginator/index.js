import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';

import { Arrow, PaginatorItems, StyledPaginator } from './units';
import PaginatorMarginItem from './PaginatorMarginItem';
import { getPaginatorConfig } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Навигация по длинному списку, который разбит на части (страницы).
 */
const Paginator = React.forwardRef((props, ref) => {
    let { activePage, onPageChange, pagesCount, displayedPagesCount, highlightingColor, size, ...restProps } = props;
    const colors = useContext(ColorsContext);
    highlightingColor = colors[highlightingColor] || highlightingColor;

    const handlePageChange = useCallback((page) => onPageChange && onPageChange(page), [onPageChange]);

    const { showLeftMarginItem, showRightMarginItem, paginatorItemsCount, startPoint } = getPaginatorConfig(
        activePage,
        pagesCount,
        displayedPagesCount
    );

    const commonProps = { handlePageChange, highlightingColor, activePage, colors, size };

    return (
        <StyledPaginator {...{ ref, ...restProps }} className={setClassName({ props: restProps, name: 'paginator' })}>
            <Arrow {...{ ...commonProps, pagesCount, position: 'left' }} />
            <PaginatorMarginItem {...{ ...props, ...commonProps, show: showLeftMarginItem, position: 'left' }} />
            <PaginatorItems {...{ ...props, ...commonProps, startPoint, paginatorItemsCount }} />
            <PaginatorMarginItem {...{ ...props, ...commonProps, show: showRightMarginItem, position: 'right' }} />
            <Arrow {...{ ...commonProps, pagesCount, position: 'right' }} />
        </StyledPaginator>
    );
});

Paginator.displayName = 'Paginator';
Paginator.propTypes = {
    /** Defines active page */
    activePage: PropTypes.number,
    /** Defines number of pages */
    pagesCount: PropTypes.number.isRequired,
    /** Defines how many pages numbers shown in Paginator. marginal and arrow numbers excluded */
    displayedPagesCount: PropTypes.number,
    /** Defines highlighting color */
    highlightingColor: PropTypes.string,
    /** Defines size of the component */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines step of paginator */
    step: PropTypes.number,
    /** Defines callback function fires on user changing page, func(page) */
    onPageChange: PropTypes.func
};
Paginator.defaultProps = {
    activePage: 1,
    pagesCount: 10,
    displayedPagesCount: 10,
    highlightingColor: 'primary',
    size: '16px',
    step: 5
};

export default Paginator;
