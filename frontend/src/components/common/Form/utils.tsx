import React, {useMemo} from "react";
import {WidgetProps} from "@rjsf/core";
import MyAutoComplete from "@common/MyAutoComplete";
import {Button, Paper, Typography, IconButton} from "@mui/material";
import {Close} from '@mui/icons-material'

export const ArrayFieldTemplate = (props) => {
  return (
    <Paper variant="outlined" className="p-3">
      <Typography variant="h5" className="mb-3">{props.title}</Typography>
      {props.items.map(element => (
        <Paper variant="outlined" className="p-2 mb-3 position-relative">
          {element.hasRemove && !props.readonly && (
            <IconButton style={{position: 'absolute', right: '0', zIndex: 1}} onClick={element.onDropIndexClick(element.index)}><Close/></IconButton>
          )}
          {element.children}
        </Paper>
      ))}
      {props.canAdd && !props.readonly && (
        <div className="d-flex">
          <Button variant="contained" type="button" className="ms-auto" onClick={props.onAddClick}>Добавить</Button>
        </div>
      )}
    </Paper>
  );
}

export const FormAutoComplete = (props: WidgetProps) => {
  const options = props.options.props.options;
  const defaultValue = useMemo((() => options.find(o => o.value === props.value)), []);

  return <MyAutoComplete
    readOnly={props.readonly}
    required={props.required}
    options={options}
    defaultValue={defaultValue}
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