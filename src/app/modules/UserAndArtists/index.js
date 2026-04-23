import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { PaymentBox } from "../../../_warbls/components/PaymentBox"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { AdminFilter } from "../../../_warbls/components/DashboardFilter"
import { Table } from "./Table"
import { actions as authActions } from "../../../redux/auth/actions"
import { useDispatch, useSelector } from "react-redux"
import { ContentContainer } from "../../../_warbls/components/Container"
import { SideBar } from "./sidebar"
import { actions } from "../../../redux/artist/actions"
import { actions as trackActions } from "../../../redux/track/actions"

const { useEffect } = React

export const UsersArtists = () => {
  const { typo, wrapper, sideBar, table } = useStyles()
  const { users } = useSelector((state) => state.auth)
  const { tracks } = useSelector((state) => state.track)
  const [sideBarActivation, setSideBarActivation] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState(null)
  const dispatch = useDispatch()
  const { artists } = useSelector((state) => state.artist)

  useEffect(() => {
    dispatch(actions.getArtistsRequest())
  }, [])

  useEffect(() => {
    dispatch(trackActions.getAllTracksRequest())
  }, [])

  useEffect(() => {
    dispatch(authActions.usersRequest())
  }, [])

  return (
    <Box className={wrapper}>
      <ContentContainer
        titleLeft="60px"
        title="User & Artists"
        titleBackground={"linear-gradient(186.71deg, #41827E 12.77%, #333333 126.7%)"}
        adminGradient={true}
      >
        <div className={sideBar} style={{ display: !sideBarActivation ? "none" : "unset" }}>
          <SideBar
            setSideBarCheck={setSideBarActivation}
            sideBarCheck={sideBarActivation}
            user={currentUser}
            artists={artists}
            tracks={tracks}
          />
        </div>
        <Box width="90%" mx={"auto"} className={table}>
          <StyledGrid>
            <StyledGrid item borderColor="primary">
              <AdminFilter placeholder="Search users and artists..." />
              <Table
                users={users}
                sideBarActivation={sideBarActivation}
                setSideBarActivation={setSideBarActivation}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
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
  table: {
    "@media (max-width:969px)": {
      marginTop: "16rem"
    }
  },
  sideBar: {
    position: "absolute",
    width: "50%",
    height: "auto",
    zIndex: 10,
    top: "0%",
    right: "0%",
    background: "#282828",
    "@media(max-Width: 1050px)": {
      width: "75%"
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
  typo: {
    fontSize: 20,
    color: theme.palette.primary.main,
    fontStyle: "normal",
    fontWeight: "normal",
    marginBottom: 5
  }
}))
