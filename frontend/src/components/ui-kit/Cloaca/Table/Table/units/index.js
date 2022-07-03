import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { autoAddPx } from 'lib-root/utils/styleMixins';

import { LoaderComponent } from 'lib-ui/utils';

export { Resizer } from './Resizer';
export { Wrapper } from './Wrapper';

const StyledCol = styled.col`
    ${({ cellWidth, minCellWidth, maxCellWidth }) => css`
        width: ${cellWidth ? autoAddPx(cellWidth) : 'auto'};
        min-width: ${minCellWidth ? autoAddPx(minCellWidth) : 'auto'};
        max-width: ${maxCellWidth ? autoAddPx(maxCellWidth) : 'auto'};
    `};
`;

const Colgroup = React.memo(({ columnsCount, cellWidths, minCellWidths, maxCellWidths }) => (
    <colgroup>
        {new Array(columnsCount).fill(undefined).map((_, key) => (
            <StyledCol
                {...{
                    key,
                    cellWidth: cellWidths[key],
                    minCellWidth: minCellWidths[key],
                    maxCellWidth: maxCellWidths[key]
                }}
            />
        ))}
    </colgroup>
));

const LoaderComponentTable = ({ isLoading, wrapperRef }) => {
    const heightWrapper = wrapperRef.current && wrapperRef.current.offsetHeight;
    return isLoading && <LoaderComponent {...{ isLoading, wrapperStyle: { height: heightWrapper } }} />;
};

const ContextMenuWrapper = styled.div`
    position: fixed;
    top: ${({ coords }) => `${coords.y}px`};
    left: ${({ coords }) => `${coords.x}px`};
    z-index: 3;
`;

export { Colgroup, LoaderComponentTable, ContextMenuWrapper };
