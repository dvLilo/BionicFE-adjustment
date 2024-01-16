import { useState } from "react"

// import * as fs from "file-saver"

// import { Workbook } from "exceljs"

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

// import {
//   LoadingButton
// } from "@mui/lab"

// import {
//   FileDownload
// } from "@mui/icons-material"

import Empty from "../../assets/images/empty.svg"
import Loading from "../../assets/images/loading.svg"

import Filter from "../../components/Filter"
import Menu from "../../components/Menu"

// import useSweetAlert from "../../hooks/useSweetAlert"
import useDisclosure from "../../hooks/useDisclosure"

import UpdateInformation from "./UpdateInformation"

import { useLazyGetInformationsQuery } from "../../features/informations/informations.slice"

const Information = () => {

  // const { toast } = useSweetAlert()

  const { open, onOpen, onClose } = useDisclosure()

  const [getInformation, {
    data: informations,
    error: informationsError,

    originalArgs: informationArgs,

    isSuccess: isGetInformationSuccess,
    isUninitialized: isGetInformationUninitialized,
    isLoading: isGetInformationLoading,
    isFetching: isGetInformationFetching,
    isError: isGetInformationError
  }] = useLazyGetInformationsQuery()

  // const [exportInformation, {
  //   isLoading: isExportInformationLoading,
  //   isFetching: isExportInformationFetching,
  // }] = useLazyGetInformationsQuery()

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

  // const onExportHandler = async () => {
  //   try {
  //     toast({
  //       title: "Generating..",
  //       text: "Please wait as this may take a few minutes.",
  //       icon: "info"
  //     })

  //     const res = await exportInformation({
  //       ...informationArgs,
  //       page: "none"
  //     }).unwrap()

  //     const workbook = new Workbook()
  //     const worksheet = workbook.addWorksheet("Bionic Distro Report")

  //     const logo = workbook.addImage({
  //       base64: logoBase64,
  //       extension: "png"
  //     })
  //     worksheet.mergeCells("A1:L4")
  //     worksheet.addImage(logo, {
  //       tl: { col: 0, row: 0 },
  //       br: { col: 4.5, row: 4 }
  //     })

  //     const excelHeader = worksheet.addRow([
  //       "ID No.",
  //       "Series No.",
  //       "Category",
  //       "Farm",
  //       "Building",
  //       "Leadman",
  //       "Checker",
  //       "Buyer",
  //       "Plate No.",
  //       "Date Harvest",
  //       "Total Heads",
  //       "Total Weight"
  //     ])
  //     excelHeader.eachCell((cell) => {
  //       cell.fill = {
  //         type: "pattern",
  //         pattern: "solid",
  //         fgColor: { argb: "000000" }
  //       }
  //       cell.font = {
  //         color: { argb: "FFFFFF" },
  //         bold: true
  //       }
  //     })

  //     worksheet.columns = [
  //       { key: "id", width: 10 },
  //       { key: "series_no", width: 18 },
  //       { key: "category", width: 12 },
  //       { key: "farm", width: 18 },
  //       { key: "building", width: 9 },
  //       { key: "leadman", width: 16 },
  //       { key: "checker", width: 16 },
  //       { key: "buyer", width: 16 },
  //       { key: "plate_no", width: 10 },
  //       { key: "date_harvest", width: 13 },
  //       { key: "total_heads", width: 12 },
  //       { key: "total_weight", width: 12 },
  //     ]

  //     worksheet.addRows(res)

  //     await workbook.xlsx.writeBuffer().then((data) => {
  //       const blob = new Blob([data], {
  //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //       });

  //       fs.saveAs(blob, "Bionic Distro Summary Report.xlsx");
  //     });
  //   } catch (error) {
  //     console.log(error)
  //     toast({
  //       icon: "error",
  //       title: "Error!",
  //       text: "Something went wrong whilst trying to generate reports. Please try again later.",
  //     })
  //   }
  // }

  return (
    <Box className="bioncTransaction">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className="bioncTransaction__heading" variant="h5">Summarized View</Typography>

        <Filter
          errors={informationsError?.data?.errors}
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
                        {item.total_weight?.toFixed(2)}
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
                      errors={informationsError?.data?.errors}
                      slotProps={{
                        filterButtonProps: {
                          className: "bioncTransaction__button",
                          disableElevation: false
                        },
                        transactionNoInputProps: {
                          sx: {
                            display: "none"
                          }
                        }
                      }}
                      onFilter={getInformation}
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
                    <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
                      {/*                       
                      <LoadingButton
                        variant="contained"
                        loadingPosition="start"
                        startIcon={<FileDownload />}
                        loading={isExportInformationLoading || isExportInformationFetching}
                        onClick={onExportHandler}
                        disableElevation
                      >
                        Export
                      </LoadingButton>
                      */}

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
                    </Stack>
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

// const logoBase64 = "data:image/png;base64,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YERDzc3d8tIbpVJVbT51y4pg5PBD4uW8FekSHjbW8w4RERERkXkMRjSFVZLi0lZ5671KaW3zPnXLTDAyKTNCLjg7QzLTw5mSRURERESWYzCiOQQlX2ysk41b6qWtffTNC70JRpKTQuXUE1PkkEVxap8IEREREZEdGIz4iabmLvnokxq1n2Q0/UlGE4ygPO/hS+LkjFPSJGQcN4YQERERkb0YjPgZBCXPv1wqDY2dqjTwcEYSjCAFa/KkCPnRZZMlLIz9QoiIiIjINxiM+CGkbu0tbJH31lYOm7o1XDCSPjFcLjo3Q7IyIrgvhIiIiIh8isGIH2tr65Gt2xvksw110t09cMAxWDCCUr3fOjVVli6Kl5AQpmQRERERke8xGHGBxqYu+eDjatlb0PKN/SQHBiOhIWPl0MVxsuK0NAljqV4iIiIichCDERcpLWuTt9dUSH1Dl+ed/wQjaFSYmR4h378oW5ISQz3/loiIiIjIOQxGXAYrIwXFrfLam2XS2dVrBCPNEhw8Rn5y+RTJzo6Qg1irl4iIiIg0wWDEpVpbu2VTboO0tffK0oWxTMkiIiIiIu0wGCEiIiIiIkewjBIRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETmCwQgRERERETlA5P8DC91i/p8nDEgAAAAASUVORK5CYII="

export default Information