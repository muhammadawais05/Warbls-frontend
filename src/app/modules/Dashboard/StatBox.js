import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"

export const StatBox = ({ list }) => {
  const { root, typo, centerTypo } = useStyles()
  const { centerValue, bTitle, bValue, uTitle, uValue } = list

  return (
    <Box
      className={root}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      py={3}
      my={2}
    >
      <Typography variant="h6" className={typo}>
        {uTitle}: {uValue}
      </Typography>
      <Typography variant="h6" className={centerTypo}>
        {centerValue}
      </Typography>
      <Typography variant="h6" className={typo}>
        {bTitle}: {bValue}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 321,
    height: 206,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    background: "transparent",
    borderRadius: 5,
    border: "1px solid white"
  },
  typo: {
    color: "rgba(255, 255, 255, 0.6)"
  },
  centerTypo: {
    fontSize: 20,
    color: "white"
  }
}))
