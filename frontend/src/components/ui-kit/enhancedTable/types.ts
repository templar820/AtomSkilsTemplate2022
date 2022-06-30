import React from 'react';

export type EnhancedTableSortOrder = 'asc' | 'desc';

export interface EnhancedTableHeadCell {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  cellClassNames?: string;
  noWrap?: boolean;
}

export interface EnhancedTableRow {
  cellClassNames?: { [key: string]: string };
  id: string;
  data: object;
  customContent?: { [key: string]: React.ReactNode };
}

export interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: EnhancedTableSortOrder;
  orderBy: string;
  rowCount: number;
  selectable?: boolean;
  headCells: EnhancedTableHeadCell[];
}

export interface EnhancedTableProps {
  onDoubleClickRow?: (rowId: string) => void;
  headCells: EnhancedTableHeadCell[];
  rows: EnhancedTableRow[];
  rowsPerPage?: number;
  selectable?: boolean;
  className?: string;
}
