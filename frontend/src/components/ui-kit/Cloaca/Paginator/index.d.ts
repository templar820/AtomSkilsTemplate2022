import * as React from 'react';

export interface PaginatorProps {
    /** Defines active page */
    activePage?: number;
    /** Defines number of pages */
    pagesCount: number;
    /** Defines how many pages numbers shown in Paginator. marginal and arrow numbers excluded */
    displayedPagesCount?: number;
    /** Defines highlighting color */
    highlightingColor?: string;
    /** Defines font-size */
    size?: string | number;
    /** Defines additional className */
    className?: string;
    /** Defines step of paginator */
    step?: number;
    /** Defines callback function fires on user changing page, func(page) */
    onPageChange?: (page: number) => void;
}

declare const Paginator: React.ComponentType<PaginatorProps>;

export default Paginator;
