import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, SvgIcons } from 'ui-kit';
import { EnhancedTableHeadProps } from './types';

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    selectable,
  } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const sortIcon = () => <SvgIcons name="sort" />;

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            className={headCell.cellClassNames || ''}
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                IconComponent={sortIcon}
              >
                <div className="mr-4" style={headCell.noWrap && { 'white-space': 'nowrap' }}>
                  {headCell.label}
                </div>
              </TableSortLabel>
            ) : (
              <div className="mr-4">{headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
