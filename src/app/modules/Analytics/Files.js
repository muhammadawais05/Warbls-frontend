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

export const Files = ({ title }) => {
  const { storeBox, storeRoot, activeSpan, span, daysBox, fileTypo } = useStyles()
  let createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein }
  }
  const rows = [
    createData("Frank Shine ", 159, 6.0),
    createData("Lisa Dread ", 237, 9.0),
    createData("Martin Deila ", 262, 16.0),
    createData("Ali Sha ", 305, 3.7),
    createData("Eva Calverta", 356, 16.0)
  ]

  return (
    <TableContainer component={Paper} className={storeRoot}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Top Artist this Month</TableCell>
            <TableCell align="right">Plays</TableCell>
            <TableCell align="right">Downloads</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
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
