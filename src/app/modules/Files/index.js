import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { AdminFilter } from "../../../_warbls/components/DashboardFilter"
import { Table } from "./Table"
import { useDispatch, useSelector } from "react-redux"
import { filterInitialValues } from "../../../_warbls/components/Vocals/script"
import { actions } from "../../../redux/track/actions"
import { SideBar } from "./sidebar"
import { ContentContainer } from "../../../_warbls/components/Container"
import AdminSideBar from "./adminSideBar"
import Pagination from "../../../_warbls/components/Pagination"
import { APIs } from "../../../_helpers/apis"
import axios from "axios"

const { useEffect, useState } = React

export const Files = () => {
  const { typo, wrapper, sideBar, table, adminSideBar, newVocalButton } = useStyles()
  const { allTracks } = useSelector((state) => state.track)
  const dispatch = useDispatch()
  const [container, setContainer] = useState("")
  let data =
    allTracks.length > 0 ? allTracks.filter((l, index) => index !== 0 && index !== 1) : allTracks
  const [current, setCurrent] = useState("")
  const [selected, setSelected] = useState("")
  const [sideBarActivation, setSideBarActivation] = useState(false)
  const [currentVocal, setCurrentVocal] = useState(null)
  const [filters, setFilters] = useState(filterInitialValues)
  const [openAdmin, setOpenAdmin] = useState(false)
  const [paginationMetrics, setPaginationMetrics] = useState({
    offset: 0,
    limit: 50,
    total: 100,
    tracks: data
  })
  const [pageNo, setPageNo] = useState(0)
  const [tracks, setTracks] = useState(data)

  useEffect(() => {
    let newOffset = pageNo * 50
    setPaginationMetrics({ ...paginationMetrics, offset: newOffset - 50 })
  }, [pageNo])

  useEffect(() => {
    axios.get(`${APIs.tracks}?load=user_details&offset=${paginationMetrics.offset}`).then((res) => {
      setPaginationMetrics({
        ...paginationMetrics,
        total: res.data.total,
        tracks: res.data.results
      })
    })
  }, [])

  const handleStop = () => {
    setSelected("")
  }
  const handlePlay = (i) => {
    setCurrent(i)
    setSelected(i)
  }

  useEffect(() => {
    dispatch(actions.getAllPendingTracksRequest())
  }, [])

  return (
    <Box className={wrapper}>
      <ContentContainer
        titleLeft="60px"
        title="Vocalfiles"
        titleBackground={"linear-gradient(186.71deg, #468241 12.77%, #333333 126.7%)"}
        adminGradient={true}
      >
        <div className={sideBar} style={{ display: !sideBarActivation ? "none" : "unset" }}>
          <SideBar
            setSideBarCheck={setSideBarActivation}
            sideBarCheck={sideBarActivation}
            vocal={currentVocal}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className={adminSideBar} style={{ display: !openAdmin ? "none" : "unset" }}>
          <AdminSideBar setSideBarCheck={setOpenAdmin} sideBarCheck={openAdmin} />
        </div>
        <Box width="90%" mx={"auto"} className={table}>
          <StyledGrid>
            <StyledGrid item>
              <AdminFilter title="Total Files" length="2309" placeholder="Search Vocalfiles" />
              <div className={newVocalButton}>
                <button onClick={(e) => setOpenAdmin(true)}>Add new Vocals</button>
              </div>
              <Table
                tracks={paginationMetrics.tracks}
                setContainer={setContainer}
                setCurrent={setCurrent}
                container={container}
                current={current}
                handlePlay={handlePlay}
                handleStop={handleStop}
                selected={selected}
                sideBarActivation={sideBarActivation}
                setSideBarActivation={setSideBarActivation}
                currentVocal={currentVocal}
                setCurrentVocal={setCurrentVocal}
              />
            </StyledGrid>
            <Pagination page={pageNo} setPageNo={setPageNo} total={paginationMetrics.total} />

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
  adminSideBar: {
    position: "absolute",
    width: "90%",
    height: "auto",
    zIndex: 10,
    top: "0%",
    right: "0%",
    background: "#282828"
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
      width: "75% !important"
    },
    "@media(max-Width: 599px)": {
      top: ".9rem !important"
    },
    "@media(max-Width: 500px)": {
      width: "100% !important"
    },
    "@media(max-Width: 480px)": {
      top: ".4rem !important"
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
  },
  newVocalButton: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    margin: "10px auto 30px auto",
    "& button": {
      padding: "15px 25px",
      backgroundColor: "transparent",
      color: "white",
      outline: "none",
      border: "1px solid white",
      cursor: "pointer"
    }
  }
}))
