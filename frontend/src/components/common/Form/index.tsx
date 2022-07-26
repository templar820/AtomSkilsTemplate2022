import React, {useEffect, useMemo, useState} from 'react';
import RjsfForm from '@rjsf/material-ui/v5';
import {FormProps, WidgetProps} from '@rjsf/core';
import {getAutocompleteSchema, getObjectProperties} from './utils';

interface Autocompletes {
  [fieldName: string]: {
    options: {name: string, value: string}[];
  } | Autocompletes;
}

interface MyFormProps {
  defaultValues?: {[key: string]: any};
  autocompletes?: Autocompletes;
}

const Form: React.FC<FormProps<any> & MyFormProps> = (props) => {
  const {schema, defaultValues, autocompletes} = props;
  const [formData, setFormData] = useState({});

  const resultSchema = useMemo(() => {
    if (!defaultValues) {
      return schema;
    }

    return {
      ...schema,
      properties: getObjectProperties(schema.properties, defaultValues),
    };
  }, [schema, defaultValues]);

  useEffect(() => {
    setFormData({})
  }, [resultSchema])

  const uiSchema = useMemo(() => {
    const autocompleteSchema = autocompletes ? getAutocompleteSchema(autocompletes) : {};

    return {
      ...props.uiSchema,
      "ui:options":  {
        orderable: false,
        removable: false
      },
      ...autocompleteSchema,
    }

  }, [autocompletes]);

  const body = useMemo(() => (
    <RjsfForm
      {...props}
      formData={formData}
      schema={resultSchema}
      uiSchema={uiSchema}
      onChange={(e) => {
        setFormData(e.formData);
        props.onChange?.(e);
      }}
    />
  ), [resultSchema, uiSchema]);

  return body
};

export default Form;