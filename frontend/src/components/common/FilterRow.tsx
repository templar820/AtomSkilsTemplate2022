import React from 'react';
import SortIcon from '@mui/icons-material/Sort';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { Typography } from '@mui/material';

interface FilterRowProps extends MOBXDefaultProps{
  filterNames: any[];
  onChange: (filterNames: any[]) => void;
}

class FilterRow extends React.Component<FilterRowProps> {
  handleClick(index) {
    const filterNames = [...this.props.filterNames];
    const prop = filterNames[index];
    if (!prop.active) {
      filterNames.forEach(el => el.active = false);
      prop.active = true;
      filterNames[index] = prop;
    } else {
      if (prop.ascending) {
        prop.ascending = (prop.ascending === 'top') ? 'bottom' : 'top';
      }
      filterNames[index] = prop;
    }
    this.props.onChange(filterNames);
  }

  render() {
    return (
      <div className="filterRow d-flex flex-row">
        <span className="n-filter-sorter__label user-select-none">Сортировать:</span>
        {this.props.filterNames.map((el, index) => (
          <div key={index} className="mx-2">
            <Typography
              variant="button"
              className={`filters me-2 user-select-none cursor-pointer ${el.active && 'activeFilters'}`}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                this.handleClick(index);
              }}
            >
              {el.name}
            </Typography>
            {el.active && el.ascending === 'top' && <SortIcon fontSize="small" />}
            {el.active && el.ascending === 'bottom' && <SortIcon fontSize="small" style={{ transform: 'scale(1, -1)' }} />}
          </div>
        ))}
      </div>
    );
  }
}

export default MobXRouterDecorator(FilterRow);
