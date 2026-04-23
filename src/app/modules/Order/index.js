import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { PaymentBox } from "../../../_warbls/components/PaymentBox"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { Table } from "./Table"
import { ContentContainer } from "../../../_warbls/components/Container"
import { AdminFilter } from "../../../_warbls/components/DashboardFilter"
import { SideBar } from "./sidebar"

export const Orders = () => {
  const { typo, wrapper, sideBar, table } = useStyles()
  const [sideBarActivation, setSideBarActivation] = React.useState(false)
  const [order, setOrder] = React.useState(null)

  return (
    <Box className={wrapper}>
      <ContentContainer
        titleLeft="60px"
        title="Orders"
        titleBackground={
          "linear-gradient(186.71deg, #825841 -151.34%, #825841 12.77%, #333333 126.7%)"
        }
        adminGradient={true}
      >
        <div className={sideBar} style={{ display: !sideBarActivation ? "none" : "unset" }}>
          <SideBar
            setSideBarCheck={setSideBarActivation}
            order={order}
            sideBarCheck={sideBarActivation}
          />
        </div>
        <Box width="90%" mx={"auto"} className={table}>
          <StyledGrid>
            <StyledGrid item>
              <AdminFilter placeholder="Search Orders" />
              <Table
                sideBarActivation={sideBarActivation}
                setSideBarActivation={setSideBarActivation}
                setOrder={setOrder}
              />
            </StyledGrid>
            {/* <StyledGrid item xs={3} px={2}>
            <PaymentBox />
          </StyledGrid> */}
          </StyledGrid>
        </Box>
      </ContentContainer>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative"
  },
  sideBar: {
    position: "absolute",
    width: "50%",
    top: "0%",
    height: "auto",
    zIndex: 10,
    right: "0%",
    background: "#282828",
    "@media(max-Width: 1200px)": {
      width: "80%"
    },
    "@media(max-Width: 599px)": {
      top: ".9rem"
    },
    "@media(max-Width: 500px)": {
      width: "100%"
    },
    "@media(max-Width: 480px)": {
      top: ".4rem"
    }
  },
  table: {
    "@media (max-width:969px)": {
      marginTop: "16rem"
    }
  },
  typo: {
    fontSize: 20,
    color: theme.palette.primary.main,
    fontStyle: "normal",
    fontWeight: "normal",
    marginBottom: 5
  }
}))
