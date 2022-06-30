import { AutocompleteProps } from '@mui/material';

export default interface CommonAutocompleteProps
  extends Partial<AutocompleteProps<object, boolean, boolean, boolean>> {
  error?: boolean;
  loading?: boolean;
  className?: string;
  options: { type: string; name: string; divider: boolean }[];
  getOptionLabel: (object) => string;
  placeholder?: string;
  onChange: (arg0: any, arg1: any) => void;
}
