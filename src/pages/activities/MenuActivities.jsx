import { useRef, useState } from "react"

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover
} from "@mui/material"

import {
  Restore,
  MoreHoriz
} from "@mui/icons-material"

const MenuActivities = ({
  slotProps: {
    viewButtonProps = {}
  } = {},
  onView = () => { }
}) => {

  const anchorEl = useRef()

  const [open, setOpen] = useState(false)

  const onViewHandler = () => {
    onView()
    setOpen(false)
  }

  return (
    <Box className="bioncMenu">
      <IconButton onClick={() => setOpen(true)}>
        <MoreHoriz ref={anchorEl} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl.current}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              paddingLeft: 0.4,
              paddingRight: 0.4
            }
          }
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={onViewHandler} {...viewButtonProps} dense>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Restore />
              </ListItemIcon>

              <ListItemText primary="View changes" primaryTypographyProps={{ fontWeight: 700 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  )
}

export default MenuActivities