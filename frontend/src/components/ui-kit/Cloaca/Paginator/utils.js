function getPaginatorConfig(activePage, pagesCount, displayedPagesCount) {
    if (pagesCount < displayedPagesCount + 4) {
        return {
            showLeftMarginItem: false,
            showRightMarginItem: false,
            paginatorItemsCount: pagesCount,
            startPoint: 1
        };
    }

    let paginatorItemsCount = Math.min(displayedPagesCount, pagesCount);

    const leftPad = Math.floor((paginatorItemsCount - 1) / 2);
    const rightPad = paginatorItemsCount - leftPad - 1;

    const rightOverflow = activePage + rightPad - pagesCount;
    const leftOverflow = activePage - leftPad - 1;

    if (rightOverflow === -1 || rightOverflow === -2) paginatorItemsCount -= rightOverflow;

    const startPointPad = rightOverflow > -1 ? leftPad + rightOverflow : leftPad;
    let startPoint = activePage - startPointPad > 1 ? activePage - startPointPad : 1;

    if (leftOverflow === 1 || leftOverflow === 2) {
        paginatorItemsCount += leftOverflow;
        startPoint -= leftOverflow;
    }

    return {
        showLeftMarginItem: leftOverflow > 2,
        showRightMarginItem: rightOverflow < -2,
        paginatorItemsCount,
        startPoint
    };
}

export { getPaginatorConfig };
