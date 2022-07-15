import React from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import PageCard from '@common/PageCard';
import FilterRow from '@common/FilterRow';
import { MOBXDefaultProps } from '@globalTypes';
import ProductCard from '@pages/Product/ProductCard';

function EntityRow(props: MOBXDefaultProps) {
  const store = props.ProductStore;

  console.log(store.productList);
  return (
    <PageCard>
      <header className="d-flex flex-row justify-content-between align-items-center">
        <FilterRow
          filterNames={store.filterNames}
          onChange={order => store.setFilterNames(order)}
        />
      </header>
      <main className="d-flex flex-column w-100 productList">
        {store.productList.length
          && store.productList.map((el, index) => (
            <ProductCard product={el} />
          ))}
      </main>
    </PageCard>
  );
}
export default MobXRouterDecorator(EntityRow);
