import React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"

export default function TopStatBox({ title, stat }) {
  const { root, typo, centerTypo } = useStyles()
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
      <Typography variant="h6" className={centerTypo}>
        {stat}
      </Typography>
      <Typography variant="h6" className={typo}>
        {title}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 321,

    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    background: "transparent"
  },
  typo: {
    fontSize: "12px",
    color: "rgb(255,255,255,0.6)",
    fontWeight: "bolder"
  },
  centerTypo: {
    fontSize: 20,

    color: "white"
  }
}))
