import {JSONSchema7} from "json-schema";

const exampleSchema: JSONSchema7 = {
  type: "object",
  required: ['string', 'number'],
  properties: {
    string: {
      type: "string",
      title: "Строка",
    },
    number: {
      type: "number",
      title: "Число"
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
    select: {
      title: 'Select',
      type: "number",
      enum: [1, 2, 3],
      enumNames: ["Один", "Два", "Три"]
    },
  },
};

export default exampleSchema;