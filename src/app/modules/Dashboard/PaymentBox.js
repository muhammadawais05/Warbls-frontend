import * as React from "react"
import {
  Table,
  TableBody,
  makeStyles,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core"
import { StorefrontTwoTone } from "@material-ui/icons"

export const PaymentBox = ({ title }) => {
  const { storeBox, storeRoot, activeSpan, span, daysBox, fileTypo } = useStyles()

  let createData = (name, amount) => {
    return { name, amount }
  }
  const rows = [
    createData("Total Earned ", 27855),
    createData("Balance", 22555),
    createData("Balance This Month ", 3305),
    createData("Artist Earned ", 1335),
    createData("Artist Withdraw Total", 286)
  ]

  return (
    <TableContainer component={Paper} className={storeRoot}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">$ {row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const useStyles = makeStyles(() => ({
  storeRoot: {
    maxWidth: 328,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "transparent",
    borderRadius: 5,
    border: "1px solid white"
    // height: 265
  }
}))
