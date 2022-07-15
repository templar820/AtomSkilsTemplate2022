import React from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import PageCard from '@common/PageCard';
import FilterRow from '@common/FilterRow';
import { MOBXDefaultProps } from '@globalTypes';

function EntityRow(props: MOBXDefaultProps) {
  const store = props.ProductStore;

  return (
    <PageCard>
      <header className="d-flex flex-row justify-content-between align-items-center">
        <FilterRow
          filterNames={store.filterNames}
          onChange={order => store.setFilterNames(order)}
        />
      </header>
      <main>
        {store.productList.length
          && store.productList.map((el, index) => (<div>{el.name}</div>
          ))}
      </main>
    </PageCard>
  );
}
export default MobXRouterDecorator(EntityRow);
