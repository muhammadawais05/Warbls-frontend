import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { BsArrowUpShort } from "react-icons/bs"
import { BsArrowDownShort } from "react-icons/bs"
import clsx from "clsx"

const { useState } = React

export const OnlineStoreStat = ({ list, title, mt }) => {
  const { storeBox, td, table, arrowUp, arrowDown, storeRoot, activeSpan, span, daysBox } =
    useStyles()
  const [days, setDays] = useState("")

  return (
    <Box className={storeRoot} mt={mt}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" style={{ fontSize: "17px" }}>
          {title}
        </Typography>
        <Box bgcolor="red" display="flex" className={daysBox}>
          <span
            className={clsx(span, { [activeSpan]: days === "1D" })}
            onClick={() => setDays("1D")}
          >
            1D
          </span>
          <span
            className={clsx(span, { [activeSpan]: days === "7D" })}
            onClick={() => setDays("7D")}
          >
            7D
          </span>
          <span
            className={clsx(span, { [activeSpan]: days === "1M" })}
            onClick={() => setDays("1M")}
          >
            1M
          </span>
          <span
            className={clsx(span, { [activeSpan]: days === "3M" })}
            onClick={() => setDays("3M")}
          >
            3M
          </span>
          <span
            className={clsx(span, { [activeSpan]: days === "1Y" })}
            onClick={() => setDays("1Y")}
          >
            1Y
          </span>
          <span
            className={clsx(span, { [activeSpan]: days === "ALL" })}
            onClick={() => setDays("ALL")}
          >
            ALL
          </span>
        </Box>
      </Box>
      <Box className={storeBox}>
        <table className={table}>
          <tbody>
            {list.map(({ label, total, increase, percent }, index) => (
              <tr key={index}>
                <td>
                  <p className={td}>{label}</p>
                </td>
                <td align="center">
                  <p className={td}>{total}</p>
                </td>
                <td align="center">
                  {increase ? (
                    <BsArrowUpShort fontSize={30} className={arrowUp} />
                  ) : (
                    <BsArrowDownShort fontSize={30} className={arrowDown} />
                  )}
                </td>
                <td align="center">
                  <p className={td}>{percent}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  storeRoot: {
    maxWidth: 500,

    marginLeft: "auto",
    marginRight: "auto"
  },
  table: {
    width: "100%",
    "& tbody tr td": {
      padding: "6px 10px"
    }
  },
  storeBox: {
    // maxWidth: 548,

    width: 500,
    background: "transparent",
    borderRadius: 5,
    border: "1px solid white"
  },
  td: {
    color: "white",
    fontSize: 17,
    fontStyle: "normal"
  },
  arrowUp: {
    color: "#86DB78"
  },
  arrowDown: {
    color: "#E11D1D"
  },
  span: {
    padding: 4
  },
  activeSpan: {
    padding: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff"
  },
  daysBox: {
    backgroundColor: "rgba(196, 196, 196, 0.3)",
    marginBottom: 3,
    borderRadius: 4,
    padding: 3
  }
}))
