import { createTheme, makeStyles } from 'ui-kit';
import { inherits } from 'util';
import Colors from './colors.modules.scss';
import typography from './typography';

const getColors = () => (props) => {
  return CSS.supports('color', props.color) ? props.color : Colors[props.color] || {};
};

/*
temporary css blocks
until name scoped theming come up
*/
/*
MuiInput
*/
export const BaseInputUnderSelect = makeStyles({
  root: {
    '& [aria-expanded]': {
      // color: Colors.violet5,
    },
    '& .MuiSvgIcon-root': {
      display: 'none',
    },
    '&:before': {
      display: 'none',
    },
    '&:after': {
      left: 'unset !important',
      bottom: 'calc(50% - 7px) !important',
      content: '""',
      transition: 'none !important',
      transform: 'none !important',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0_692_91928' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='16' height='16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.46967 6.96967C4.17678 7.26256 4.17678 7.73744 4.46967 8.03033L7.46967 11.0303C7.76256 11.3232 8.23744 11.3232 8.53033 11.0303L11.5303 8.03033C11.8232 7.73744 11.8232 7.26256 11.5303 6.96967C11.2374 6.67678 10.7626 6.67678 10.4697 6.96967L8 9.43934L5.53033 6.96967C5.23744 6.67678 4.76256 6.67678 4.46967 6.96967Z' fill='black'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_692_91928)'%3E%3Cpath d='M0 3C0 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3Z' fill='%23585874'/%3E%3C/g%3E%3C/svg%3E%0A")`,
      backgroundRepeat: 'no-repeat',
      borderBottom: 'none',
      width: 16,
      height: 16,
    },
  },
});

const buttonSuccess = {
  contained: {
    '&.success': {
      color: Colors.white,
      backgroundColor: Colors.green6,
      '&:hover': {
        backgroundColor: Colors.green7,
      },
    },
  },
  outlined: {
    '&.success': {
      color: Colors.green6,
      '&:hover': {
        backgroundColor: Colors.green1,
      },
    },
  },
};

const buttonError = {
  contained: {
    '&.error': {
      color: Colors.white,
      backgroundColor: Colors.red6,
      '&:hover': {
        backgroundColor: Colors.red7,
      },
    },
  },
  outlined: {
    '&.error': {
      color: Colors.red6,
      '&:hover': {
        backgroundColor: Colors.red1,
      },
    },
  },
};

const theme = createTheme({
  props: {
    MuiButton: {
      disableRipple: true,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.red6,
    },
    text: {
      primary: Colors.textPrimary,
      secondary: Colors.textSecondary,
      disabled: Colors.disabledText,
    },
  },
  typography,
  overrides: {
    MuiAccordionSummary: {
      root: {
        minHeight: '0 !important',
      },
      content: {
        margin: '0 !important',
      },
      expandIcon: {
        padding: '0 12px',
      },
    },
    MuiTooltip: {
      popper: {
        zIndex: 10000,
        '&.twoLine': {
          maxWidth: '240px',
        },
        '&.multiLine': {
          maxWidth: '396px',
        },
      },
      arrow: {
        color: Colors.gray9,
      },
      tooltip: {
        borderRadius: 3,
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 500,
        backgroundColor: Colors.gray9,
      },
    },
    MuiSvgIcon: {
      root: {
        color: getColors(),
      },
    },
    MuiSwitch: {
      root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '& :hover': {
          backgroundColor: `inherit`,
        },
      },
      switchBase: {
        padding: 3,
        color: Colors.gray4,
        '&$checked': {
          transform: 'translateX(12px)',
          color: `${Colors.white} !important`,
          '& + $track': {
            opacity: 1,
            backgroundColor: `${Colors.primary} !important`,
            borderColor: Colors.primary,
          },
        },
      },
      thumb: {
        width: 10,
        height: 10,
        boxShadow: 'none',
      },
      track: {
        border: `1px solid ${Colors.gray4}`,
        borderRadius: 8,
        opacity: 1,
        backgroundColor: Colors.white,
      },
      checked: {},
    },
    MuiChip: {
      deleteIcon: {
        width: 16,
        height: 16,
      },
      outlined: {
        border: 'none',
        backgroundColor: Colors.violet1,
        color: Colors.violet5,
      },
      label: {
        textOverflow: 'unset',
      },
      clickable: {
        '&:hover': {
          backgroundColor: Colors.violet2,
        },
        '&:focus': {
          backgroundColor: Colors.violet5,
          color: Colors.gray1,
        },
      },
      deletable: {
        '&:focus': {
          backgroundColor: Colors.violet5,
          color: Colors.gray1,
          '& svg': {
            fill: Colors.gray1,
          },
        },
      },
      root: {
        '&[readonly]': {
          backgroundColor: Colors.gray2,
          color: Colors.gray7,
          pointerEvents: 'none',
          fontWeight: 400,
        },
        '&:hover': {
          backgroundColor: Colors.violet2,
        },

        border: 'none',
        backgroundColor: Colors.violet1,
        color: Colors.violet5,
        borderRadius: 3,
        height: 24,
        fontSize: 14,
        fontWeight: 500,
        // '& span': {
        //   color: '#4E4EE4',
        // },
        '& svg': {
          fill: '#4E4EE4',
        },
      },
    },
    MuiInputBase: {
      input: {
        '&.Mui-disabled': {
          color: Colors.gray4,
          backgroundColor: Colors.gray1,
          borderColor: Colors.gray3,
        },
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: 'none',
        },
        '&:before': {
          display: 'none',
        },
        '& .MuiSelect-icon': {
          right: 0,
        },
      },
    },
    MuiInputLabel: {
      root: {
        '&.withinSelect': {
          transform: 'translate(0px, -15px) scale(0.75)',
        },
        '& [aria-expanded]': {
          color: Colors.violet5,
        },
      },
      formControl: {
        position: 'initial',
        transform: 'none',
        fontSize: '12px',
        marginBottom: '4px',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow: '0px 5px 15px rgba(47, 47, 70, 0.15)',
        borderRadius: 6,
        padding: 8,
        transform: 'translate(-11px, 12px)',
        '& .Mui-selected': {
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100% 50%',
          backgroundColor: 'transparent',
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzY4OV85MjA0MyIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzY4OV85MjA0MykiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEuOTg5NDUgNy4xNzk0OUMyLjI4MjM1IDYuODg2NjEgMi43NTcyMyA2Ljg4NjYzIDMuMDUwMTEgNy4xNzk1M0w2LjA1NTIgMTAuMTg0OEwxMi45NDk1IDMuMjkwNTRDMTMuMjQyNCAyLjk5NzY1IDEzLjcxNzIgMi45OTc2NSAxNC4wMTAxIDMuMjkwNTRDMTQuMzAzIDMuNTgzNDQgMTQuMzAzIDQuMDU4MzEgMTQuMDEwMSA0LjM1MTJMNi41ODU1MSAxMS43NzU4QzYuNDQ0ODUgMTEuOTE2NSA2LjI1NDA4IDExLjk5NTUgNi4wNTUxNyAxMS45OTU1QzUuODU2MjUgMTEuOTk1NSA1LjY2NTQ4IDExLjkxNjUgNS41MjQ4MyAxMS43NzU4TDEuOTg5NDIgOC4yNDAxNUMxLjY5NjUzIDcuOTQ3MjUgMS42OTY1NSA3LjQ3MjM4IDEuOTg5NDUgNy4xNzk0OVoiIGZpbGw9ImJsYWNrIi8+CjwvZz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2swXzY4OV85MjA0MykiPgo8cGF0aCBkPSJNMCAzQzAgMS4zNDMxNSAxLjM0MzE1IDAgMyAwSDEzQzE0LjY1NjkgMCAxNiAxLjM0MzE1IDE2IDNWMTNDMTYgMTQuNjU2OSAxNC42NTY5IDE2IDEzIDE2SDNDMS4zNDMxNSAxNiAwIDE0LjY1NjkgMCAxM1YzWiIgZmlsbD0iIzRFNEVFNCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzY4OV85MjA0MyI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K")`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        '& .MuiMenuItem-root': {
          padding: 8,
          borderRadius: 3,
          paddingRight: 25,
          '&:hover': {
            backgroundColor: Colors.violet1,
          },
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTypography: {
      root: {
        wordWrap: 'break-word',
        color: getColors(),
      },
    },
    MuiButton: {
      root: {
        minWidth: 'auto',
        '&$disabled': {
          backgroundColor: 'none',
          color: Colors.gray4,
        },
      },
      label: {
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
      },
      contained: {
        padding: '8px 16px',
        ...buttonSuccess.contained,
        ...buttonError.contained,
      },
      outlined: {
        padding: '8px 16px',
        ...buttonSuccess.outlined,
        ...buttonError.outlined,
      },
      text: {
        padding: '8px 16px',
      },
      outlinedSizeSmall: {
        padding: '8px 8px',
      },
      containedSizeSmall: {
        padding: '8px 8px',
      },
      containedPrimary: {
        backgroundColor: Colors.primary,
        '&:hover': {
          backgroundColor: Colors.violet6,
        },
        '&:active': {
          backgroundColor: Colors.violet7,
        },
        '&.Mui-disabled': {
          backgroundColor: Colors.gray2,
          color: Colors.gray4,
          '& svg': {
            fill: Colors.gray4,
          },
        },
      },
      textSecondary: {
        '&:hover': {
          backgroundColor: Colors.gray2,
          color: Colors.gray8,
        },
        '&:active': {
          backgroundColor: Colors.gray3,
          color: Colors.gray10,
        },
        color: Colors.textSecondary,
      },
      startIcon: {
        marginLeft: 0,
        marginRight: '4px',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '6px',
      },
      elevation1: {
        boxShadow: `inset 0px -1px 0px ${Colors.shadowColor}`,
      },
    },
    MuiCard: {
      root: {
        border: `1px solid ${Colors.shadowColor}`,
        boxSizing: 'border-box',
        borderRadius: '6px',
        boxShadow: 'none',
        '& .selected > div': {
          transition: '0.2s',
          backgroundColor: Colors.hoverCard,
          '& .MuiCardHeader-action': {
            visibility: 'visible',
          },
        },
        '& .MuiCardHeader-action': {
          visibility: 'hidden',
        },
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: '6px',
        '&[aria-labelledby="confirmDialog"]': {
          minWidth: 376,
          maxWidth: 500,
          '& .dialogContent': {
            paddingLeft: 20,
            paddingRight: 20,
            '& .MuiCardHeader-root': {
              padding: 0,
              '& .MuiTypography-root': {
                fontSize: 18,
                fontWeight: 500,
                color: Colors.gray9,
              },
              '& .MuiCardHeader-avatar': {
                marginRight: 12,
              },
            },
            '& p.contentBody': {
              fontSize: 14,
              fontWeight: 400,
              marginTop: 10,
              marginLeft: 44,
            },
          },
          '& .MuiDialogActions-root': {
            paddingLeft: 65,
          },
        },
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '24px',
        '& .closeButton': {
          position: 'absolute',
          right: '12px',
          top: '16px',
          color: Colors.gray6,
          '&:hover': {
            background: 'transparent',
            '& svg': {
              background: Colors.gray2,
              borderRadius: 3,
            },
          },
        },
      },
    },
    MuiDialogContent: {
      root: {
        paddingTop: '0',
        paddingBottom: '24px',
      },
    },
    MuiDialogActions: {
      root: {
        padding: '16px 24px',
        backgroundColor: Colors.gray2,
        justifyContent: 'flexStart',
      },
    },
    MuiCheckbox: {
      root: {
        padding: '8px',
        width: 16,
        height: 16,
        borderRadius: '3px',
      },
    },
    MuiTextField: {
      root: {
        marginTop: '1px', // Чтобы рамка толщиной 2 не обрезалась, когда поле прижато к верху

        '& .MuiInputLabel-root': {
          transform: 'none',
          position: 'static',
          fontSize: '12px',
          marginBottom: '4px',
        },
        '& p.Mui-error': {
          color: `${Colors.red7} !important`,
          marginLeft: 0,
        },
        '& label.Mui-error': {
          color: Colors.gray7,
        },
        '& .MuiOutlinedInput-input': {
          padding: '8px',
        },
        '& .MuiOutlinedInput-multiline': {
          padding: 0,
        },
        '& .MuiOutlinedInput-adornedStart': {
          paddingLeft: '8px',
          '& svg': {
            marginRight: '8px',
          },
        },
        '& .MuiOutlinedInput-inputAdornedStart': {
          paddingLeft: 0,
        },
        '& legend': {
          width: '0 !important',
        },
      },
    },
    MuiFormControlLabel: {
      root: {
        padding: 0,
      },
    },
    MuiTab: {
      wrapper: {
        textAlign: 'left',
      },
      root: {
        minWidth: '0 !important',
        '&$selected': {
          color: 'black',
          borderColor: 'aqua',
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: '10px',
        borderBottom: 'none',
      },
      head: {
        color: Colors.gray7,
      },
    },
    MuiTableRow: {
      root: {
        '&.MuiTableRow-hover:hover': {
          backgroundColor: Colors.violet1,
        },
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        transition: 'border-color 300ms',
      },
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: Colors.gray4,
          borderRadius: '3px',
        },
        '& svg': {
          fill: Colors.gray6,
        },
        '&.Mui-disabled': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.gray3,
          },
          '& svg': {
            fill: Colors.gray4,
          },
        },
      },
    },
    MuiSelect: {
      root: {
        backgroundColor: 'transparent',
      },
      outlined: {
        color: Colors.gray9,
        padding: '8px 33px 8px 8px !important',
      },
      select: {
        fontWeight: 500,
        color: Colors.gray7,
        '&.MuiSelect-select': {
          paddingRight: '16px',
        },
        '&.MuiSelect-select:focus': {
          background: 'inherit',
          color: Colors.violet5,
        },
      },
      icon: {
        right: '8px',
        width: '16px',
        height: '16px',
        top: 'auto',
      },
    },
    MuiToggleButtonGroup: {
      root: {
        padding: '2px',
        backgroundColor: Colors.gray2,
        borderRadius: '3px',
      },
    },
    MuiToggleButton: {
      root: {
        border: 'none',
        backgroundColor: 'transparent',
        padding: '6px 12px',
        color: Colors.gray7,
        '&.Mui-selected': {
          border: `1px solid ${Colors.gray4} !important`,
          borderRadius: '3px !important',
          background: 'white',
          '&:hover': {
            backgroundColor: `white !important`,
          },
        },
      },
      label: {
        color: Colors.gray7,
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    MuiTableSortLabel: {
      root: {
        '& svg': {
          minWidth: '16px',
          minHeight: '16px',
        },
      },
    },
    MuiAutocomplete: {
      root: {
        '& .MuiChip-deleteIcon': {
          width: 16,
          height: 16,
        },
        '& .endAdornmentWrap': {
          cursor: 'pointer',
        },
        '&[aria-expanded="true"]': {
          '& .endAdornmentWrap': {
            transform: 'rotate(180deg) translateY(-1px) translateX(1px)',
          },
        },
        '& .MuiInputAdornment-root svg': {
          marginRight: '0 !important',
          marginLeft: 6,
        },
      },
      popper: {
        '& .MuiPaper-root': {
          boxShadow: '0px 5px 15px rgba(47, 47, 70, 0.15)',
          padding: '8px 0',
        },
      },
      listbox: {
        '& .autoCompleteListWrapper': {
          position: 'relative',
          width: '100%',
          lineHeight: '32px',
          '& .done': {
            position: 'absolute',
            right: 9,
            top: 0,
            transform: 'translateY(8px)',
          },
          '& .hoverWrapper': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            padding: '0 35px 0 12px',
          },
          '& .MuiDivider-root': {
            marginTop: 15,
            marginBottom: 15,
          },
        },
      },
      option: {
        paddingTop: '6px',
        paddingBottom: '6px',
        paddingLeft: '8px !important',
        paddingRight: '8px !important',
        '&[aria-selected="true"]': {
          backgroundColor: 'transparent !important',
          '& .autoCompleteListWrapper': {
            '& .hoverWrapper': {
              background: 'transparent',
            },
          },
        },
        '&[data-focus="true"]': {
          backgroundColor: 'transparent !important',
          '& .autoCompleteListWrapper': {
            '& .hoverWrapper': {
              borderRadius: 3,
              background: '#EDEDFD',
            },
          },
        },
      },
      inputRoot: {
        // '& .MuiChip-root': {
        //   borderRadius: 3,
        //   height: 24,
        //   backgroundColor: '#EDEDFD',
        //   fontSize: 14,
        //   fontWeight: 500,
        //   '& span': {
        //     color: '#4E4EE4',
        //   },
        //   '& svg': {
        //     fill: '#4E4EE4',
        //   },
        // },
        '&[class*="MuiOutlinedInput-root"]': {
          padding: 0,
        },
        '& .MuiInputBase-input': {
          padding: '8px 0 !important',
          '&::-webkit-input-placeholder': {
            opacity: '1 !important',
          },
        },
      },
      input: {
        paddingLeft: '0 !important',
      },
      endAdornment: {
        top: 'calc(50% - 12px)',
      },
    },
    MuiButtonGroup: {
      groupedHorizontal: {
        '&:first-child': {
          minWidth: 0,
          marginRight: 4,
          marginLeft: 0,
        },
        borderRight: 'none !important',
        marginLeft: 7,
        padding: 0,
      },
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiTextField: {
      InputLabelProps: {
        variant: 'standard',
        disableAnimation: true,
        shrink: true,
      },
    },
    MuiOutlinedInput: {
      notched: false,
    },
    MuiRadio: {
      color: 'primary',
    },
    MuiInputLabel: {
      shrink: false,
    },
    MuiButtonGroup: {
      disableElevation: true,
    },
  },
});

export default theme;
