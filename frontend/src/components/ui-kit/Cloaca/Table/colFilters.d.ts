import * as React from 'react';

declare type Filter = (options: { cells: Array<React.ReactNode> }) => Array<React.ReactNode>;

declare const colFilters: {
    byIndexes: Filter;
};

export default colFilters;
