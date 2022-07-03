import React, { useCallback, useMemo } from 'react';

const useMapHeadings = (rows) =>
    useMemo(() => {
        const array = React.Children.toArray(rows);
        if (!array.length) return [];
        const { children } = array[0].props || { children: [] };
        return Array.from(
            children.reduce(
                (headings, { props: { children, showInColFilter } = {} } = {}, index) =>
                    showInColFilter ? headings.set(index, children) : headings,
                new Map()
            )
        );
    }, [rows]);

const useHandlerCreator = (setFilteredColumns) =>
    useCallback(
        (id) =>
            setFilteredColumns((prevFilteredColumns) => {
                const index = prevFilteredColumns.findIndex((prevId) => prevId === id);
                const newFilteredColumns = prevFilteredColumns.slice();
                if (index === -1) {
                    newFilteredColumns.push(id);
                } else {
                    newFilteredColumns.splice(index, 1);
                }
                return newFilteredColumns;
            }),
        [setFilteredColumns]
    );

export { useMapHeadings, useHandlerCreator };
