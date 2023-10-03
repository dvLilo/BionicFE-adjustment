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

import useSweetAlert from "../../hooks/useSweetAlert"
import useDisclosure from "../../hooks/useDisclosure"

import UpdateTransaction from "./UpdateTransaction"

import { useLazyGetTransactionsQuery, useDeleteTransactionMutation } from "../../features/transactions/transactions.slice"

const Transaction = () => {

  const { confirm, toast } = useSweetAlert()

  const { open, onOpen, onClose } = useDisclosure()

  const [deleteTransaction] = useDeleteTransactionMutation()

  const [getTransaction, {
    data: transactions,
    error: transactionsError,

    originalArgs: transactionArgs,

    isSuccess: isGetTransactionSuccess,
    isUninitialized: isGetTransactionUninitialized,
    isLoading: isGetTransactionLoading,
    isFetching: isGetTransactionFetching,
    isError: isGetTransactionError
  }] = useLazyGetTransactionsQuery()

  const [update, setUpdate] = useState(null)

  const deleteTransactionHandler = (id) => {
    confirm({
      onConfirm: async () => {
        try {
          await deleteTransaction(id).unwrap()

          toast({
            text: "Transaction has been deleted."
          })
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const updateTransactionHandler = (data) => {
    setUpdate(data)
    onOpen()
  }


  const onPageChangeHandler = (_, page) => {
    getTransaction({
      ...transactionArgs,
      page: page + 1
    })
  }

  return (
    <Box className="bioncTransaction">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className="bioncTransaction__heading" variant="h5">Detailed View</Typography>

        <Filter errors={transactionsError?.data?.errors} onFilter={getTransaction} />
      </Stack>

      <TableContainer sx={{ margin: "32px auto 0" }}>
        <Table className="bioncTransaction__table">
          <TableHead className="bioncTransaction__thead">
            <TableRow className="bioncTransaction__row">
              <TableCell className="bioncTransaction__cell">ID NO.</TableCell>
              <TableCell className="bioncTransaction__cell">TXN NO.</TableCell>
              <TableCell className="bioncTransaction__cell" align="right">SERIES NO.</TableCell>
              <TableCell className="bioncTransaction__cell">CATEGORY</TableCell>
              <TableCell className="bioncTransaction__cell">DATE HARVEST</TableCell>
              <TableCell className="bioncTransaction__cell">FARM</TableCell>
              <TableCell className="bioncTransaction__cell">BUILDING</TableCell>
              <TableCell className="bioncTransaction__cell">LEADMAN</TableCell>
              <TableCell className="bioncTransaction__cell">CHECKER</TableCell>
              <TableCell className="bioncTransaction__cell">BUYER</TableCell>
              <TableCell className="bioncTransaction__cell">PLATE NO.</TableCell>
              <TableCell className="bioncTransaction__cell">HEADS</TableCell>
              <TableCell className="bioncTransaction__cell">WEIGHT</TableCell>
              <TableCell className="bioncTransaction__cell">ALLOWANCE</TableCell>
              <TableCell className="bioncTransaction__cell" align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          {
            (isGetTransactionSuccess && !isGetTransactionLoading && !isGetTransactionFetching) && (
              <TableBody className="bioncTransaction__tbody">
                {
                  transactions?.data?.map((item, index) => (
                    <TableRow className="bioncTransaction__row" key={index} hover>
                      <TableCell className="bioncTransaction__cell">
                        {item.id}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.transaction_no}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell" align="right">
                        {item.series_no}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.category}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.date_harvest}
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
                        {item.heads}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.weight}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell">
                        {item.allowance.toFixed(2)}
                      </TableCell>

                      <TableCell className="bioncTransaction__cell" align="center">
                        <Menu
                          onUpdate={() => updateTransactionHandler(item)}
                          onDelete={() => deleteTransactionHandler(item.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            )
          }

          {
            (isGetTransactionLoading || isGetTransactionFetching) && (
              <TableBody className="bioncTransaction__tbody">
                <TableRow className="bioncTransaction__row">
                  <TableCell className="bioncTransaction__cell bioncTransaction__cell--empty" align="center" colSpan={15}>
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
            (isGetTransactionUninitialized || isGetTransactionError) && (
              <TableBody className="bioncTransaction__tbody">
                <TableRow className="bioncTransaction__row">
                  <TableCell className="bioncTransaction__cell bioncTransaction__cell--empty" align="center" colSpan={15}>
                    <img src={Empty} alt="Bionic" width={320} />

                    <Typography className="bioncTransaction__label" variant="h4">No records found.</Typography>
                    <Typography variant="subtitle2">We can't find any item matching your search. Try adjusting your filter and try again.</Typography>

                    <Filter
                      errors={transactionsError?.data?.errors}
                      slotProps={{
                        filterButtonProps: {
                          className: "bioncTransaction__button",
                          disableElevation: false
                        }
                      }}
                      onFilter={getTransaction}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          }

          {
            (isGetTransactionSuccess && !isGetTransactionLoading && !isGetTransactionFetching) && (
              <TableFooter className="bioncTransaction__tfoot">
                <TableRow className="bioncTransaction__row">
                  <TableCell className="bioncTransaction__cell" colSpan={15}>
                    <TablePagination
                      component={Box}
                      page={transactions?.current_page - 1}
                      count={transactions?.total}
                      rowsPerPage={transactions?.per_page}
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

      <UpdateTransaction
        open={open}
        data={update}
        onClose={onClose}
      />
    </Box>
  )
}

export default Transaction