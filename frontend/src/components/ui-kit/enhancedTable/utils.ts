import { EnhancedTableRow, EnhancedTableSortOrder } from './types';

type Comparator = (a: EnhancedTableRow, b: EnhancedTableRow) => number;

function descendingComparator(a: EnhancedTableRow, b: EnhancedTableRow, orderBy: string) {
  if (b.data[orderBy] < a.data[orderBy]) {
    return -1;
  }
  if (b.data[orderBy] > a.data[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: EnhancedTableSortOrder, orderBy: string): Comparator {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
