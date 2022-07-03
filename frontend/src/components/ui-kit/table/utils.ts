import {FilterFn, SortingFn, sortingFns} from "@tanstack/react-table";
import {compareItems, rankItem} from "@tanstack/match-sorter-utils";

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the ranking info
    addMeta(itemRank)

    // Return if the item should be filtered in/out
    return itemRank.passed
}

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]!,
            rowB.columnFiltersMeta[columnId]!
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
