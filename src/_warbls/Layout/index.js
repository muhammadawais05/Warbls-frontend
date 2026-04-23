import * as React from "react"
import { AppDrawer } from "../components/Drawer"

export const Layout = ({ children }) => {
  return <AppDrawer>{children}</AppDrawer>
}
