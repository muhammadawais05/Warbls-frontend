import * as React from "react"
import { Box } from "@material-ui/core"

export const Row = (props) => {
  const { jc, ai, children } = props

  return (
    <Box
      {...props}
      display="flex"
      flexDirection="row"
      justifyContent={jc}
      alignItems={ai}
      flexWrap="wrap"
    >
      {children}
    </Box>
  )
}
