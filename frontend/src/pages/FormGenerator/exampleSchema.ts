import {JSONSchema7} from "json-schema";

const exampleSchema: JSONSchema7 = {
  type: "object",
  required: ['string', 'number'],
  properties: {
    string: {
      type: "string",
      title: "Строка",
      default: 'string'
    },
    textArea: {
      type: "string",
      format: "textarea"
    },
    checkBox: {
      type: 'boolean',
      format: 'radio',
    },
    radio: {
      type: 'string',
      format: 'radio',
      enum: ['one', 'two', 'tree'],
    },
    range: {
      type: "number",
      format: "range",
      maximum: 150,
      minimum: -10,
    },
    number: {
      type: "number",
      minimum: 0,
      title: "Число"
    },
    color: {
      type: "string",
      format: 'color'
    },
    date: {
      title: 'Дата',
      type: "string",
      format: "date"
    },
    datetime: {
      title: 'Дата и Время',
      type: "string",
      format: "date-time"
    },
    autoComplete: {
      type: "string",
      title: "AutoComplete",
    },
    test: {
      type: "object",
      required: ['autoComplete1'],
      properties: {
        autoComplete1: {
          type: "string",
          title: "AutoComplete",
        },
      }
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
}

export default exampleSchema;