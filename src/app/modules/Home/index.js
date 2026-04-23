import * as React from "react"
import { AppDrawer } from "../../components/Drawer"
import { Header } from "../../components/Header"

export const Home = ({ children }) => {
  return (
    <>
      <Header />
      <AppDrawer child={children} />
    </>
  )
}
