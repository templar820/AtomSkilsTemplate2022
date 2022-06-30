import {
  Autocomplete, AutocompleteProps, InputAdornment, TextField,
} from '@mui/material';
import React from 'react';

interface IAutoCompleteProps extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'>{
  icon: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  label?: string;
  onChange: (value: any) => void;

}

export default function (props: IAutoCompleteProps) {

  return (
    <Autocomplete
      {...props}
      options={props.options}
      getOptionLabel={option => (option.name ? option.name : '')}
      value={props.value}
      onChange={(e, v) => {
        props.onChange(v);
      }}
      renderInput={params => (
        <TextField
          variant="standard"
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                {props.icon}
              </InputAdornment>
            ),
            endAdornment: params.InputProps.endAdornment
          }}
        />
      )}
    />
  );
}
