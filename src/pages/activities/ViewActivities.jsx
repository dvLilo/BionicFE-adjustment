import {
  Alert,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Stack
} from "@mui/material"

const ViewActivities = ({
  open,
  data: {
    log_name = null,
    event = null,
    properties = {}
  } = {},
  onClose
}) => {

  return (
    <Dialog
      open={open}
      className="bioncTransactionChanges"
      maxWidth="md"
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        {log_name === "summarized" && `Changes for Series No. ${properties?.attributes.series}`}
        {log_name === "detailed" && `Changes for Transaction No. ${properties?.old.transaction_no}`}
      </DialogTitle>

      <DialogContent>
        {
          log_name === "summarized" &&
          <Stack direction="column" gap={1}>
            <Alert
              severity="info"
              classes={{
                root: "bioncTransactionChanges__alert",
                message: "bioncTransactionChanges__message"
              }}
            >
              <AlertTitle>Changes</AlertTitle>
              <List dense>
                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Farm:&nbsp;</strong>
                  <span>{properties?.attributes.farm}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Building:&nbsp;</strong>
                  <span>{properties?.attributes.building}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Category:&nbsp;</strong>
                  <span>{properties?.attributes.category}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Leadman:&nbsp;</strong>
                  <span>{properties?.attributes.leadman}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Checker:&nbsp;</strong>
                  <span>{properties?.attributes.checker}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Buyer:&nbsp;</strong>
                  <span>{properties?.attributes.buyer}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Plate No.:&nbsp;</strong>
                  <span>{properties?.attributes.plate_no}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Date Harvest:&nbsp;</strong>
                  <span>{properties?.attributes.current_date_in}</span>
                </ListItem>
              </List>
            </Alert>

            <Alert
              severity="error"
              classes={{
                root: "bioncTransactionChanges__alert",
                message: "bioncTransactionChanges__message"
              }}
            >
              <AlertTitle>Old</AlertTitle>
              <List dense>
                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Farm:&nbsp;</strong>
                  <span>{properties?.old.farm}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Building:&nbsp;</strong>
                  <span>{properties?.old.building}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Category:&nbsp;</strong>
                  <span>{properties?.old.category}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Leadman:&nbsp;</strong>
                  <span>{properties?.old.leadman}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Checker:&nbsp;</strong>
                  <span>{properties?.old.checker}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Buyer:&nbsp;</strong>
                  <span>{properties?.old.buyer}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Plate No.:&nbsp;</strong>
                  <span>{properties?.old.plate_no}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Date Harvest:&nbsp;</strong>
                  <span>{properties?.old.current_date_in}</span>
                </ListItem>
              </List>
            </Alert>
          </Stack>
        }

        {
          log_name === "detailed" &&
          <Stack direction="column" gap={1}>
            {
              event !== "deleted" &&
              <Alert
                severity="info"
                classes={{
                  root: "bioncTransactionChanges__alert",
                  message: "bioncTransactionChanges__message"
                }}
              >
                <AlertTitle>Changes</AlertTitle>
                <List dense>
                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Farm:&nbsp;</strong>
                    <span>{properties?.attributes.farm}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Building:&nbsp;</strong>
                    <span>{properties?.attributes.building}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Category:&nbsp;</strong>
                    <span>{properties?.attributes.category}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Leadman:&nbsp;</strong>
                    <span>{properties?.attributes.leadman}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Checker:&nbsp;</strong>
                    <span>{properties?.attributes.checker}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Buyer:&nbsp;</strong>
                    <span>{properties?.attributes.buyer}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Plate No.:&nbsp;</strong>
                    <span>{properties?.attributes.plate_no}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Heads:&nbsp;</strong>
                    <span>{properties?.attributes.heads}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Weight:&nbsp;</strong>
                    <span>{properties?.attributes.weight}</span>
                  </ListItem>

                  <ListItem className="bioncTransactionChanges__item">
                    <strong style={{ flexBasis: 132 }}>Date Harvest:&nbsp;</strong>
                    <span>{properties?.attributes.date_harvest}</span>
                  </ListItem>
                </List>
              </Alert>
            }

            <Alert
              severity="error"
              classes={{
                root: "bioncTransactionChanges__alert",
                message: "bioncTransactionChanges__message"
              }}
            >
              <AlertTitle>Old</AlertTitle>
              <List dense>
                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Farm:&nbsp;</strong>
                  <span>{properties?.old.farm}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Building:&nbsp;</strong>
                  <span>{properties?.old.building}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Category:&nbsp;</strong>
                  <span>{properties?.old.category}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Leadman:&nbsp;</strong>
                  <span>{properties?.old.leadman}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Checker:&nbsp;</strong>
                  <span>{properties?.old.checker}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Buyer:&nbsp;</strong>
                  <span>{properties?.old.buyer}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Plate No.:&nbsp;</strong>
                  <span>{properties?.old.plate_no}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Heads:&nbsp;</strong>
                  <span>{properties?.old.heads}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Weight:&nbsp;</strong>
                  <span>{properties?.old.weight}</span>
                </ListItem>

                <ListItem className="bioncTransactionChanges__item">
                  <strong style={{ flexBasis: 132 }}>Date Harvest:&nbsp;</strong>
                  <span>{properties?.old.date_harvest}</span>
                </ListItem>
              </List>
            </Alert>
          </Stack>
        }
      </DialogContent>
    </Dialog>
  )
}

export default ViewActivities