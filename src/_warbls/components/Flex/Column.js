import * as React from "react"
import { Box } from "@material-ui/core"

export const Column = (props) => {
  const { jc, ai, children } = props

  return (
    <Box {...props} display="flex" flexDirection="column" justifyContent={jc} alignItems={ai}>
      {children}
    </Box>
  )
}
