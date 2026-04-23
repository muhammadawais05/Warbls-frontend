import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { OrdersTimeline } from "./OrdersTimeline"

export const Orders = ({ title }) => {
  const { storeBox, storeRoot } = useStyles()

  return (
    <Box className={storeRoot}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box className={storeBox}>
        <OrdersTimeline />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  storeRoot: {
    maxWidth: 298,
    marginRight: "auto",
    marginLeft: "auto"
    // height: 549
  },
  storeBox: {
    width: 298,
    height: 549,
    background: "rgba(196, 196, 196, 0.3)",
    borderRadius: 5
  }
}))
