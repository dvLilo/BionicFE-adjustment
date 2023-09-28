import { useState } from "react"

import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"

import Empty from "../../assets/images/empty.svg"
import Loading from "../../assets/images/loading.svg"

import Filter from "../../components/Filter"
import Menu from "../../components/Menu"

import useDisclosure from "../../hooks/useDisclosure"

import UpdateInformation from "./UpdateInformation"

import { useLazyGetInformationsQuery } from "../../features/informations/informations.slice"

const Information = () => {

  const { open, onOpen, onClose } = useDisclosure()

  const [getInformation, {
    data: informations,

    originalArgs: informationArgs,

    isSuccess: isGetInformationSuccess,
    isUninitialized: isGetInformationUninitialized,
    isLoading: isGetInformationLoading,
    isFetching: isGetInformationFetching,
    isError: isGetInformationError
  }] = useLazyGetInformationsQuery()

  const [update, setUpdate] = useState(null)


  const updateTransactionHandler = (data) => {
    setUpdate(data)
    onOpen()
  }


  const onPageChangeHandler = (_, page) => {
    getInformation({
      ...informationArgs,
      page: page + 1
    })
  }

  return (
    <Box className="bioncTransaction">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className="bioncTransaction__heading" variant="h5">Summarized View</Typography>

        <Filter
          slotProps={{
            transactionNoInputProps: {
              sx: {
                display: "none"
              }
            }
          }}
          onFilter={getInformation}
        />
      </Stack>

      <TableContainer sx={{ margin: "32px auto 0" }}>
        <Table className="bioncTransaction__table">
          <TableHead className="bioncTransaction__thead">
            <TableRow className="bioncTransaction__row">
              <TableCell className="bioncTransaction__cell">ID NO.</TableCell>
              <TableCell className="bioncTransaction__cell">SERIES NO.</TableCell>
              <TableCell className="bioncTransaction__cell">CATEGORY</TableCell>
              <TableCell className="bioncTransaction__cell">FARM</TableCell>
              <TableCell className="bioncTransaction__cell">BUILDING</TableCell>
              <TableCell className="bioncTransaction__cell">LEADMAN</TableCell>
              <TableCell className="bioncTransaction__cell">CHECKER</TableCell>
              <TableCell className="bioncTransaction__cell">BUYER</TableCell>
              <TableCell className="bioncTransaction__cell">PLATE NO.</TableCell>
              <TableCell className="bioncTransaction__cell">DATE HARVEST</TableCell>
              <TableCell className="bioncTransaction__cell">TOTAL HEADS</TableCell>
              <TableCell className="bioncTransaction__cell">TOTAL WEIGHT</TableCell>
              <TableCell className="bioncTransaction__cell" align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          {
            (isGetInformationSuccess && !isGetInformationLoading && !isGetInformationFetching) && (
              <TableBody className="bioncTransaction__tbody">
                {
                  informations?.data?.map((item, index) => (
                    <TableRow className="bioncTransaction__row" key={index} hover>
                      <TableCell className="bioncTransaction__cell">
                        {item.id}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.series_no}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.category}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.farm}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.building}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.leadman}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.checker}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.buyer}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.plate_no}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.date_harvest}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.total_heads}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.total_weight}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell" align="center">
                        <Menu
                          slotProps={{
                            deleteButtonProps: {
                              disabled: true
                            }
                          }}
                          onUpdate={() => updateTransactionHandler(item)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            )
          }

          {
            (isGetInformationLoading || isGetInformationFetching) && (
              <TableBody className="bioncTransaction__tbody">
                <TableRow className="bioncTransaction__row">
                  <TableCell className="bioncTransaction__cell bioncTransaction__cell--empty" align="center" colSpan={13}>
                    <img src={Loading} alt="Bionic" width={220} />

                    <Stack direction="column" justifyContent="center" alignItems="center">
                      <CircularProgress thickness={5.4} size={32} sx={{ marginTop: 2, marginBottom: 1 }} />

                      <Typography className="bioncTransaction__label" variant="h5">Please wait..</Typography>
                      <Typography variant="subtitle2">This might take a few minutes..</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          }

          {
            (isGetInformationUninitialized || isGetInformationError) && (
              <TableBody className="bioncTransaction__tbody">
                <TableRow className="bioncTransaction__row">
                  <TableCell className="bioncTransaction__cell bioncTransaction__cell--empty" align="center" colSpan={13}>
                    <img src={Empty} alt="Bionic" width={320} />

                    <Typography className="bioncTransaction__label" variant="h4">No records found.</Typography>
                    <Typography variant="subtitle2">We can't find any item matching your search. Try adjusting your filter and try again.</Typography>

                    <Filter
                      slotProps={{
                        filterButtonProps: {
                          className: "bioncTransaction__button",
                          disableElevation: false
                        }
                      }}
                      getTransaction={getInformation}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          }

          {
            (isGetInformationSuccess && !isGetInformationLoading && !isGetInformationFetching) && (
              <TableFooter className="bioncTransaction__tfoot">
                <TableRow className="bioncTransaction__row">
                  <TableCell className="bioncTransaction__cell" colSpan={13}>
                    <TablePagination
                      component={Box}
                      page={informations?.current_page - 1}
                      count={informations?.total}
                      rowsPerPage={informations?.per_page}
                      rowsPerPageOptions={[15]}
                      onPageChange={onPageChangeHandler}
                      showFirstButton
                      showLastButton
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            )
          }
        </Table>
      </TableContainer>

      <UpdateInformation
        open={open}
        data={update}
        onClose={onClose}
      />
    </Box>
  )
}

export default Information