import React, {useState} from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import PageCard from '@common/PageCard';
import FilterRow from '@common/FilterRow';
import { MOBXDefaultProps } from '@globalTypes';
import ProductCard from '@pages/Product/ProductCard';
import FormDialog, {FormDialogMode} from "@common/FormDialog";
import {Button} from "@mui/material";
import productSchema from "@pages/Product/productSchema";

function EntityRow(props: MOBXDefaultProps) {
  const store = props.ProductStore;
  const [dialogDefaultValues, setDialogDefaultValues] = useState();
  const [dialogMode, setDialogMode] = useState<FormDialogMode>(null);

  const closeDialog = () => {
    setDialogMode(null);
    setDialogDefaultValues(undefined);
  };
  return (
    <>
      <Button onClick={() => setDialogMode('create')} variant="contained" className='mb-3'>Создать</Button>
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
            <ProductCard product={el} onEdit={() => {
              setDialogMode('update');
              setDialogDefaultValues(el);
            }}/>
          ))}
        </main>
      </PageCard>
      <FormDialog
        close={closeDialog}
        onChange={(value) => {console.log('onChange', value)}}
        onSave={(value) => {
          closeDialog();
          console.log('SAVE', value)
        }}
        onUpdate={(value) => {
          closeDialog();
          console.log('UPDATE', value)
        }}
        mode={dialogMode}
        defaultValues={dialogDefaultValues}
        schema={productSchema}
        title="Продукта"
        width={500}
      />
    </>
  );
}
export default MobXRouterDecorator(EntityRow);
