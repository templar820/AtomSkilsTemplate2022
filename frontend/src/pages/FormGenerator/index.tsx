import React from 'react';
import Form from '@rjsf/material-ui/v5';
import {JSONSchema7} from "json-schema";

const FormGenerator = () => {

  const schema: JSONSchema7 = {
    type: "object",
    required: ['string', 'number'],
    properties: {
      string: {
        type: "string",
        title: "Строка"
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
    }
  };
  return (
    <div>
      <h3 className="mb-3">Генератор форм</h3>
      <div>
        <Form schema={schema} uiSchema={uiSchema}/>
      </div>
    </div>
  );
};

export default FormGenerator;