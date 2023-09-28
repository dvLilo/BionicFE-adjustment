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
  Delete,
  Edit,
  MoreHoriz
} from "@mui/icons-material"

const Menu = ({
  slotProps: {
    editButtonProps = {},
    deleteButtonProps = {}
  },
  onUpdate = () => { },
  onDelete = () => { }
}) => {

  const anchorEl = useRef()

  const [open, setOpen] = useState(false)

  const onUpdateHandler = () => {
    onUpdate()
    setOpen(false)
  }

  const onDeleteHandler = () => {
    onDelete()
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
          <ListItem disablePadding divider>
            <ListItemButton onClick={onUpdateHandler} {...editButtonProps} dense>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Edit />
              </ListItemIcon>

              <ListItemText primary="Edit" primaryTypographyProps={{ fontWeight: 700 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={onDeleteHandler} {...deleteButtonProps} dense>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Delete />
              </ListItemIcon>

              <ListItemText primary="Delete" primaryTypographyProps={{ fontWeight: 700 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  )
}

export default Menu