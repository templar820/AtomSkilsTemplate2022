import { createTheme } from '@mui/material';
import Colors from '@colors';
import typography from '@styles/typography';
import palette from './palette';

const theme = createTheme({
  palette,
  typography,
  components: {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableElevation: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          height: 28,
        },
        outlined: {
          borderRadius: 16,
          background: Colors.white
          // filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          background: Colors.primaryChipsColor,
          color: Colors.white,
        }
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&$checked': {
            color: '#1ab394',
            '&$checked': {
              color: '#1ab394'
            }
          }
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        track: {
          display: 'none'
        },

      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderColor: Colors.white + '!important'
        },
        inputRoot: {
          color: Colors.white,
          borderColor: Colors.white
        },
        popupIndicator: {
          color: Colors.white + '!important'
        },
        clearIndicator: {
          color: Colors.white + '!important'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:hover': {
            backgroundColor: 'none'
          },
        },
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: Colors.primaryText
        },
        arrow: {
          color: Colors.primaryText
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          margin: '-8px'
        }
      }
    },
    MuiBadge: {
      variants: [
        {
          props: { variant: 'border' },
          style: {
            '& .MuiBadge-badge': {
              backgroundColor: Colors.white,
              border: `1px solid ${Colors.secondaryText}`
            }

          },
        },
      ],
    }
  }
});

export default theme;
