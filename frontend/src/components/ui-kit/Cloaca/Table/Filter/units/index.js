import CheckFilter from './CheckFilter';
import SearchFilter from './SearchFilter';
import React from 'react';

const Picker = React.forwardRef(({ filterType, ...restProps }, ref) =>
    filterType === 'oneOf' ? <CheckFilter {...{ ref, ...restProps }} /> : <SearchFilter {...{ ref, ...restProps }} />
);

export { SearchFilter, CheckFilter, Picker };
