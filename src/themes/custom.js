import { createTheme } from "@mui/material"

export const custom = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 13,
    title: {
      margin: 0,
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1.35em',
      fontWeight: 700
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    },
    MuiDrawer: {
      defaultProps: {
        anchor: 'right'
      }
    },
    MuiPopover: {
      defaultProps: {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'bottom'
        },
        transformOrigin: {
          horizontal: 'right',
          vertical: 'top'
        }
      }
    },
    MuiMenu: {
      defaultProps: {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'bottom'
        },
        transformOrigin: {
          horizontal: 'right',
          vertical: 'top'
        }
      }
    }
  }
})