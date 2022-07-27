import React, {useEffect, useState} from 'react';
import Form from '@components/common/Form';
import {Button} from "@mui/material";
import FormDialog, {FormDialogMode} from "@common/FormDialog";
import exampleSchema from "@pages/FormGenerator/exampleSchema";
import {formatDate} from "../../utils/getDataSet";

const FormGenerator = () => {
  const [dialogMode, setDialogMode] = useState<FormDialogMode>(null);
  const options = [{name: 'Чиковани', value: 'name1'}, {name: 'Иванов', value: 'name2'}, {name: 'Кузнецов', value: 'name3'}];

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <h3 className="me-3">Генератор форм</h3>
        <Button className="me-3" onClick={() => setDialogMode('create')}>Создать</Button>
        <Button className="me-3" onClick={() => setDialogMode('update')}>Редактировать</Button>
      </div>
      <div>
        <Form
          schema={exampleSchema}
          defaultValues={{string: 'str', autoComplete: 'name3', test: {autoComplete1: 'name2'}, array: [{name: 'name1', age: 100}]}}
          autocompletes={{
            autoComplete: {options},
            test: {
              autoComplete1: {options}
            },
            array: {
              items: {name: {options}}
            }
          }}
          onSubmit={(e) => console.log(e.formData)}
        >
          <Button type="submit" variant="contained">Отправить</Button>
        </Form>
      </div>
      <FormDialog
        title="Чего-то"
        mode={dialogMode}
        close={() => setDialogMode(null)}
        schema={exampleSchema}
        defaultValues={{string: '123', date: formatDate(new Date(), 'yyyy-mm-dd')}}
        autocompletes={{
          autoComplete: {options},
          test: {
            autoComplete1: {options}
          },
          array: {
            items: {name: {options}}
          }
        }}
        onChange={(value) => console.log('onChange', value)}
        onSave={(value) => console.log('onSubmit', value)}
        onUpdate={(value) => console.log('onSubmit', value)}
      />
    </div>
  );
};

export default FormGenerator;