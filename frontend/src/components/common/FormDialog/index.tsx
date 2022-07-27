import React, {useEffect, useMemo, useRef, useState} from 'react';
import {CommonDialog} from "ui-kit";
import Form from '../Form';
import {JSONSchema7} from "json-schema";
import './styles.scss';
import {MyFormProps} from "@common/Form";

interface FormDialogProps extends MyFormProps{
  close: () => void;
  schema: JSONSchema7;
  title: string;
  mode?: FormDialogMode;
  onSave?: (value: any) => void;
  onUpdate?: (value: any) => void;
  onChange?: (value: any) => void;
  width?: number;
  height?: number;
};

export type FormDialogMode = 'create' | 'update' | null;

const FormDialog: React.FC<FormDialogProps> = ({
  close,
  onSave,
  onUpdate,
  onChange,
  schema,
  title,
  defaultValues,
  autocompletes,
  mode = 'create',
  width,
  height
}) => {
  const submitButtonRef = useRef();

  const body = (
    <Form
      schema={schema}
      onSubmit={(e) => {
        if (mode === 'create') {
          onSave?.(e.formData)
        } else {
          onUpdate?.(e.formData)
        }
      }}
      defaultValues={mode === 'update' ? defaultValues : undefined}
      autocompletes={autocompletes}
      onChange={(e) => onChange?.(e.formData)}
    >
      <button type="submit" className="d-none" ref={submitButtonRef}></button>
    </Form>
  );

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