import React, {useState} from 'react';
import Form from '@rjsf/material-ui/v5';
import {JSONSchema7} from "json-schema";
import {Button} from "@mui/material";
import FormDialog, {FormDialogMode} from "@common/FormDialog";
import exampleSchema from "@pages/FormGenerator/exampleSchema";

const FormGenerator = () => {
  const [dialogMode, setDialogMode] = useState<FormDialogMode>(null);

  const schema: JSONSchema7 = {
    type: "object",
    required: ['string', 'number'],
    properties: {
      string: {
        type: "string",
        title: "Строка",
        default: 'string'
      },
      number: {
        type: "number",
        title: "Число"
      },
      date: {
        title: 'Дата',
        "type": "string",
        "format": "date"
      },
      datetime: {
        title: 'Дата и Время',
        "type": "string",
        "format": "date-time"
      },
      "autoComplete": {
        "type": "string", // For multi-select this can be "array"
        "title": "Example Auto Complete",
        "enum": [
          "Yes",
          "No"
        ]
      },
      select: {
        title: 'Select',
        type: "number",
        enum: [1, 2, 3],
        enumNames: ["Один", "Два", "Три"]
      },
      array: {
        type: 'array',
        title: 'Массив',
        items: {
          type: "object",
          properties: {
            name: {
              title: "Имя",
              type: "string"
            },
            age: {
              title: "Возраст",
              type: "number"
            }
          }
        }
      }
    },
  };

  const uiSchema = {
    "ui:options":  {
      orderable: false,
      removable: false
    },
    // "autoComplete": {
    //   "ui:widget": "material-auto-complete",
    //   "ui:props": { // Available props support come from https://material-ui.com/api/autocomplete/#props
    //     "disableClearable": false
    //   }
    // }
  };
  // const widgets = {
  //   CheckboxWidget: CustomCheckbox
  // };
  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <h3 className="me-3">Генератор форм</h3>
        <Button className="me-3" onClick={() => setDialogMode('create')}>Создать</Button>
        <Button className="me-3" onClick={() => setDialogMode('update')}>Редактировать</Button>
      </div>
      <div>
        <Form schema={schema} uiSchema={uiSchema} widgets={undefined}>
          <Button type="submit" variant="contained">Отправить</Button>
        </Form>
      </div>
      <FormDialog
        title="Чего-то"
        mode={dialogMode}
        close={() => setDialogMode(null)}
        schema={exampleSchema}
        defaultValues={{string: '123'}}
        onChange={(value) => console.log('onChange', value)}
        onSave={(value) => console.log('onSubmit', value)}
        onUpdate={(value) => console.log('onSubmit', value)}
      />
    </div>
  );
};

export default FormGenerator;