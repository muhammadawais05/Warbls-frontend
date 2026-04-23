import * as React from "react"
import { AppDrawer } from "../components/Drawer"
import { Header } from "../components/Header"
import { Box, Typography, Button, makeStyles } from "@material-ui/core"

export const NonAuthLayout = ({ children }) => {
  const { header } = useStyles()
  return (
    <>
      <Box className={header}>
        <Header open={true} />
      </Box>
      {children}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main
  }
}))

export default NonAuthLayout
