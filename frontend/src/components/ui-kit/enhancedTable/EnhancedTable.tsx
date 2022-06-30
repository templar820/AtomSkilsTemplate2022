import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
} from 'ui-kit';

import { EnhancedTableSortOrder, EnhancedTableProps } from './types';
import { getComparator, stableSort } from './utils';
import EnhancedTableHead from './EnhancedTableHead';

export default function EnhancedTable(props: EnhancedTableProps) {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<EnhancedTableSortOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    props.rowsPerPage || Number.MAX_SAFE_INTEGER
  );

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    if (!props.selectable) return;

    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const result = useMemo(() => {
    return stableSort(props.rows, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage + 1)
      .map((row, index) => {
        const isItemSelected = isSelected(row.id);

        return (
          <TableRow
            hover
            className={props.onDoubleClickRow ? 'cursor-pointer' : ''}
            onDoubleClick={() => {
              if (props.onDoubleClickRow) {
                props.onDoubleClickRow(row.id);
              }
            }}
            onClick={(event) => handleClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
          >
            {props.selectable && (
              <TableCell padding="checkbox">
                <Checkbox checked={isItemSelected} />
              </TableCell>
            )}
            {props.headCells.map((headCell) => {
              const cellClassName = row.cellClassNames && row.cellClassNames[headCell.id];
              return (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  scope="row"
                  className={cellClassName || ''}
                >
                  {(row.customContent && row.customContent[headCell.id]) || row.data[headCell.id]}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
  }, [props.rows, order, orderBy, page, rowsPerPage]);

  return (
    <div className="EnhancedTable">
      <TableContainer>
        <Table
          className={props.className}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props.rows.length}
            headCells={props.headCells}
            selectable={props.selectable}
          />
          <TableBody>{result}</TableBody>
        </Table>
      </TableContainer>
      {props.rowsPerPage && props.rows.length > props.rowsPerPage && (
        <TablePagination
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} / ${count !== -1 ? count : `> ${to}`}`
          }
          page={page}
          backIconButtonText={t('commonComponents:enhancedTable.prevPage')}
          nextIconButtonText={t('commonComponents:enhancedTable.nextPage')}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}
