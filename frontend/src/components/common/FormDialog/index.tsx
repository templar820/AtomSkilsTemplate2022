import React, {useEffect, useMemo, useRef, useState} from 'react';
import {CommonDialog} from "ui-kit";
import Form from '@rjsf/material-ui/v5';
import {JSONSchema7} from "json-schema";
import './styles.scss';

interface FormDialogProps {
  close: () => void;
  schema: JSONSchema7;
  title: string;
  mode?: FormDialogMode;
  onSave?: (value: any) => void;
  onUpdate?: (value: any) => void;
  onChange?: (value: any) => void;
  defaultValues?: {[key: string]: any};
  width?: number;
  height?: number;
}

export type FormDialogMode = 'create' | 'update' | null;

const FormDialog: React.FC<FormDialogProps> = ({
  close,
  onSave,
  onUpdate,
  onChange,
  schema,
  title,
  defaultValues,
  mode = 'create',
  width,
  height
}) => {
  const submitButtonRef = useRef();

  const getObjectProperties = (properties, defaults) => {
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

  const resultSchema = useMemo(() => {
    if (mode === 'create' || !defaultValues) {
      return schema;
    }

    return {
      ...schema,
      properties: getObjectProperties(schema.properties, defaultValues),
    };
  }, [schema, defaultValues, mode]);

  const body = useMemo(() => (
    <Form
      schema={resultSchema}
      onSubmit={(e) => {
        if (mode === 'create') {
          onSave?.(e.formData)
        } else {
          onUpdate?.(e.formData)
        }
      }}
      onChange={(e) => onChange?.(e.formData)}
    >
      <button type="submit" className="d-none" ref={submitButtonRef}></button>
    </Form>
  ), [resultSchema, mode]);

  return (<CommonDialog
    contentClassName="form-dialog"
    isOpen={!!mode}
    onChange={close}
    onSubmit={() => submitButtonRef.current?.click()}
    width={width}
    height={height}
    cfg={{
      title: `${mode === 'create' ? 'Создание' : 'Редактирование'} ${title}`,
      body,
      buttons: {
        cancel: true,
        continue: true,
      },
      continueButtonText: "Сохранить",
    }}
  />)
};

export default FormDialog;