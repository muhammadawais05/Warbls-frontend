import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"
// import { BarCharts } from "../../../_warbls/components/Charts/BarsChart"

const { useState } = React

export const BarChart = ({ title }) => {
  const { storeBox, storeRoot, activeSpan, span, daysBox } = useStyles()
  const [days, setDays] = useState("")

  return (
    <Box className={storeRoot}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">{title}</Typography>
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
      <Box className={storeBox}>{/* <BarCharts /> */}</Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  storeRoot: {
    maxWidth: "94.5%",
    marginTop: 27,
    marginLeft: "auto",
    marginRight: "auto"
    // height: 265
  },
  storeBox: {
    width: "100%",
    height: 213,
    // overflow: "hidden",
    background: "rgba(196, 196, 196, 0.3)",
    borderRadius: 5
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
