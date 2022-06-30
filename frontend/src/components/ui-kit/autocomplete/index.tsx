import React from 'react';

import {
  Autocomplete,
  Divider,
  InputAdornment,
  SvgIcons,
  TextField,
  CircularProgress,
} from 'ui-kit';

import { makeStyles } from '@mui/styles';
import CommonAutocompleteProps from './types';

const useStyles = makeStyles({
  extensionSelect: {
    minWidth: '110px',
  },
  inputUnderAutocomplete: {
    '& .MuiInputBase-root': {
      maxWidth: '100%',
      minWidth: 156,
      paddingRight: '0 !important',
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
    },
  },
});

const verifyOption = (option, { selected }): string | {} => {
  if (typeof option === 'object' && option !== null) {
    return (
      <>
        <div className="hoverWrapper">{option.name}</div>
        {option.divider ? <Divider /> : null}
        {selected ? <SvgIcons name="done" className="done" color="#4E4EE4" /> : null}
      </>
    );
  }

  return <div className="hoverWrapper">{option}</div>;
};

function CommonAutocomplete(props: CommonAutocompleteProps) {
  let inputRef;
  const classes = useStyles(props);

  return (
    <>
      <Autocomplete
        {...props}
        openOnFocus
        blurOnSelect
        className={[classes.extensionSelect, props.className]}
        renderOption={
          props.renderOption ||
          ((option, { selected }) => {
            return (
              <div className="autoCompleteListWrapper">{verifyOption(option, { selected })}</div>
            );
          })
        }
        renderInput={
          props.renderInput ||
          ((params) => {
            props.loading ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              (params.InputProps.startAdornment = (
                <InputAdornment position="start">
                  <SvgIcons name="magnifier" className="magnifier" />
                </InputAdornment>
              ))
            );

            params.InputProps.endAdornment = (
              <button
                className="endAdornmentWrap"
                onClick={() => {
                  inputRef.focus();
                }}
                data-testing-class="button"
                data-testing-value="autocompleteOpen"
              >
                <InputAdornment position="start">
                  <SvgIcons name="arrow-down" className="arrow-down" />
                </InputAdornment>
              </button>
            );

            return (
              <div>
                <TextField
                  className={classes.inputUnderAutocomplete}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    'data-testing-class': 'input',
                    'data-testing-value': 'autocompleteInput',
                  }}
                  label={props.placeholder}
                  error={props.error}
                  variant="outlined"
                  placeholder="Выбрать"
                  inputRef={(input) => {
                    inputRef = input;
                  }}
                />
              </div>
            );
          })
        }
      />
    </>
  );
}

export default CommonAutocomplete;

export { CommonAutocomplete };
