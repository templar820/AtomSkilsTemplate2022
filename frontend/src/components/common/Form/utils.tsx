import React from "react";
import {WidgetProps} from "@rjsf/core";
import MyAutoComplete from "@common/MyAutoComplete";


const FormAutoComplete = (props: WidgetProps) => {
  const options = props.options.props.options;
  return <MyAutoComplete
    readOnly={props.readOnly}
    required={props.required}
    options={options}
    defaultValue={options.find(o => o.value === props.schema.default)}
    onChange={(e) => props.onChange(e?.value || undefined)}
    label={props.schema.title}
  />
}

export const getAutocompleteSchema = (autocompleteFields) => {
  const resultAutocompletes = {};
  Object.keys(autocompleteFields).forEach((fieldName) => {
    const field = autocompleteFields[fieldName];
    if (field.hasOwnProperty('options')) {
      resultAutocompletes[fieldName] = {
        "ui:widget": FormAutoComplete,
        "ui:props": {
          options: field.options,
        }
      };
    } else {
      resultAutocompletes[fieldName] = getAutocompleteSchema(field);
    }
  })
  return resultAutocompletes;
};

export const getObjectProperties = (properties, defaults) => {
  const resultProperties = {};
  Object.keys(properties).forEach(propertyName => {
    const property = properties[propertyName];
    if (property.type === 'object') {
      resultProperties[propertyName] = {
        ...property,
        properties: getObjectProperties(property.properties, defaults[propertyName] || {}),
      }
    } else {
      resultProperties[propertyName] = {
        ...property,
        default: defaults[propertyName],
      }
    }
  });
  return resultProperties;
}