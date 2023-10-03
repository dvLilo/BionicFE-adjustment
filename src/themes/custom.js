import { createTheme } from "@mui/material"

export const custom = createTheme({
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