import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

import Colors from '@colors';

import './style.scss';

const useStyles = makeStyles({
  root: {
    padding: 9,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: `inset 0 0 0 1px ${Colors.gray4}, inset 0 -1px 0 ${Colors.gray4}`,
    backgroundColor: Colors.white,
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      boxShadow: `inset 0 0 0 1px ${Colors.gray6}, inset 0 -1px 0 ${Colors.gray6}`,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: Colors.violet5,
    boxShadow: `inset 0 0 0 1px ${Colors.violet5}, inset 0 -1px 0 ${Colors.violet5}`,
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: Colors.violet7,
      boxShadow: `inset 0 0 0 1px ${Colors.violet7}, inset 0 -1px 0 ${Colors.violet7} !important`,
    },
  },
});

const StyledCheckbox: React.FC = (props: CheckboxProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Checkbox
      className={`${classes.root} customizedCheckbox`}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
};

export default StyledCheckbox;
