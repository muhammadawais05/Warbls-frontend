import * as React from "react"
import { Box, makeStyles, Typography, Button, useMediaQuery, useTheme } from "@material-ui/core"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { Row } from "../../../_warbls/components/Flex/Row"
import { VocalRow } from "../../../_warbls/components/VocalRow"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { useSelector, useDispatch } from "react-redux"
import { AppContext } from "../../../_warbls/providers/AppProvider"
import { actions } from "../../../redux/track/actions"
import ArtistCarousel from "../../../_warbls/components/carousel"
import { filterInitialValues } from "../../../_warbls/components/Vocals/script"
import { Filter } from "../../../_warbls/components/Vocals/Filter"
import { SMFilter } from "../../../_warbls/components/Vocals/SMFilter"
import { AiOutlineClockCircle } from "react-icons/ai"
import { sidebarDrawerContext } from "../../../app/App"
import { actions as trackActions } from "../../../redux/track/actions"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { APIs } from "../../../_helpers/apis"

const { useState, useContext, useEffect } = React

export const Artist = ({ props }) => {
  const {
    tableContainer,
    topBg,
    topBtn,
    select,
    table,
    artist,
    name,
    filterBg,
    editedBtn,
    filterBox,
    sidebar_controls,
    control_image
  } = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const { tracks } = useSelector((state) => state.track)
  var { userInfo } = useSelector((state) => state.auth)
  const [container, setContainer] = useState("")
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down("sm"))
  const [current, setCurrent] = useState("")
  const [selected, setSelected] = useState("")
  const [, setPlay] = useState(false)
  const { auth } = useSelector((state) => state.auth)
  const [filteredTracks, setFilteredTracks] = useState([])

  const { handleLogin, handleCart } = useContext(AppContext)
  var data = tracks.filter((t, index) => index !== 0 && index !== 1)
  const [filters, setFilters] = useState(filterInitialValues)
  const [preFilteredTracks, setPreFilteredTrack] = useState([])
  const [popularTracks, setPopularTracks] = useState([])
  const [trendingTracks, setTrendingTracks] = useState([])
  const [size, setSize] = React.useState([0, 0])
  var profileImg = userInfo.cover_image
  let heading = ["#", "Waveform", "Name", "Key", "BPM", "Time"]
  if (size[0] < 1280) {
    heading = ["Name and Artist", "", ""]
  }

  if (location?.state?.data) {
    userInfo = location?.state?.data
    profileImg = location?.state?.data?.cover_image
  }

  useEffect(() => {
    axios.get(APIs.popularTracks).then(({ data }) => {
      setPopularTracks(data)
    })
    axios.get(APIs.trendingTracks).then(({ data }) => {
      setTrendingTracks(data)
    })
  }, [])
  useEffect(() => {
    var filteredSongs = data

    filteredSongs = filteredSongs.length === 0 ? data : filteredSongs

    if (filters.trending === "Popular") {
      filteredSongs = popularTracks
    }

    if (filters.trending === "Trending") {
      filteredSongs = trendingTracks
    }

    if (filters.trending === "Random") {
      filteredSongs = [
        filteredSongs[(Math.random() * (filteredSongs.length - 1 + 1)) << 0],
        filteredSongs[(Math.random() * (filteredSongs.length - 1 + 1)) << 0],
        filteredSongs[(Math.random() * (filteredSongs.length - 1 + 1)) << 0]
      ]
    }

    if (filters.isPhrase === "1" && filters.isOneShot === "1") {
      filteredSongs = filteredSongs.filter((track) => {
        return track.is_phrases === 1 && track.is_oneshot === 1
      })
    }

    if (filters.isDry === "1") {
      filteredSongs = filteredSongs?.filter((track) => {
        return track.is_dry === 1
      })
    }
    if (filters.isWet === "1") {
      filteredSongs = filteredSongs?.filter((track) => {
        return track.is_wet === 1
      })
    }

    if (filters.bpm !== "") {
      filteredSongs = filteredSongs?.filter((track) => {
        return track.bpm === parseInt(filters.bpm)
      })
    }

    if (filters.key !== "") {
      filteredSongs = filteredSongs?.filter((track) => {
        return track.key === filters.key
      })
    }

    if (filters.language !== "") {
      filteredSongs = filteredSongs?.filter((track) => {
        return track.language === filters.language
      })
    }

    if (filters.gener !== "") {
      filteredSongs = filteredSongs?.filter((track) => {
        return track.genre === filters.gener
      })
    }

    if (filters.searchKey !== "") {
      filteredSongs = filteredSongs?.filter((track) => {
        return track.track_name.toString().toLowerCase().includes(filters.searchKey.toLowerCase())
      })
    } else filteredSongs = data

    setFilteredTracks(filteredSongs)
  }, [filters, popularTracks, trendingTracks])

  const handleStop = () => {
    setPlay(false)
    setSelected("")
  }
  const handlePlay = (i) => {
    setCurrent(i)
    setSelected(i)
    setPlay(true)
  }

  const payload = {
    object_type: "user",
    object_id: userInfo.user_id,
    added_by: userInfo.user_id
  }

  var contextData = React.useContext(sidebarDrawerContext)

  const controlHandlers = (type) => {
    if (type === "left") {
      dispatch(trackActions.removePlayingVocal())
      contextData?.isCollapsed(true)
    } else if (type === "right") {
      contextData?.isCollapsed(false)
    }
  }

  const handleLike = (trackID) => {
    if (auth) {
      const data = {
        action: "like",
        action_against_id: trackID,
        ...payload
      }
      dispatch(actions.trackWiseLikeRequest(data))
    } else {
      handleLogin()
    }
  }

  const handleUnlike = (trackID) => {
    if (auth) {
      const data = {
        action: "like",
        object_id: userInfo.user_id,
        log: JSON.stringify({ log_added_by: userInfo.user_id })
      }

      dispatch(actions.trackWiseUnLikeRequest(data, trackID))
    } else {
      handleLogin()
    }
  }

  //listning for width to switch filters fot mobile screen and laptop
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <Box>
      <Box
        className={topBg}
        style={{
          backgroundImage: `url(${profileImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "0 50px"
        }}
        display="flex"
        alignItems="center"
      >
        {(userInfo.is_admin || userInfo.is_admin === 0) && (
          <div className={sidebar_controls}>
            <div onClick={() => controlHandlers("left")}>
              <img
                src={"/media/left-arrow.png"}
                className={control_image}
                width="16px"
                height="18px"
                alt="left-arrow img"
              />
            </div>
            <div onClick={() => controlHandlers("right")}>
              <img
                src={"/media/right-arrow.png"}
                className={control_image}
                width="16px"
                height="18px"
                alt="right arrow img"
              />
            </div>
          </div>
        )}
        <StyledContainer
          display="flex"
          flexDirection="column"
          style={{ height: "100%", padding: "110px 0 0 0px" }}
        >
          <Row ai="center">
            <img src={toAbsoluteUrl("/media/Vector.png")} alt="" width="20px" height="20px" />
            &nbsp; &nbsp;<Typography className={artist}>Verified Artist</Typography>
          </Row>
          <Typography className={name}>{userInfo?.full_name}</Typography>
        </StyledContainer>
      </Box>
      <Box>
        <StyledGrid xs={12} item className={filterBg}>
          <Box>
            <Row style={{ display: size[0] > 1280 ? "unset" : "none" }}>
              <Button className={topBtn}>All</Button>
              <Button className={topBtn}>Album 1</Button>
              <Button className={topBtn}>Album 2</Button>
              <Button className={topBtn}>Album 3</Button>
              <Button className={editedBtn}>
                Edited by <br />
                Warbls
              </Button>
            </Row>
            <Row>
              <Box className={filterBox} pt={2}>
                {size[0] > 1280 ? (
                  <Filter filters={filters} setFilters={setFilters} />
                ) : (
                  <SMFilter filters={filters} setFilters={setFilters} />
                )}
              </Box>
            </Row>
          </Box>
        </StyledGrid>

        <div
          className={tableContainer}
          style={{ marginTop: size[0] > 1280 ? "20px" : "70px", padding: "0 60px" }}
        >
          <table className={table}>
            <thead>
              <tr>
                {heading.map((head, index) =>
                  index === 5 ? (
                    <th style={{ display: "block", margin: "5px 0 0 0px", fontSize: "20px" }}>
                      <AiOutlineClockCircle />
                    </th>
                  ) : (
                    <th key={index}>{head}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTracks?.map((row, index) => (
                <VocalRow
                  key={index}
                  index={index}
                  setContainer={setContainer}
                  setCurrent={setCurrent}
                  container={container}
                  current={current}
                  handlePlay={handlePlay}
                  rowList={row}
                  handleStop={handleStop}
                  selected={selected}
                  handleCart={handleCart}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Box>

      <ArtistCarousel />

      {/* <StyledGrid xs={12} md={2} item>
            <Typography variant="h6">Fans also like</Typography>
            <Box p={2} mt={1} bgcolor="rgba(196, 196, 196, 0.2)">
              {Array.from({ length: 5 }).map((row, index) => (
                <Row my={2} key={index} jc="space-around">
                  <Box bgcolor="#C4C4C4" p={2} borderRadius={5}></Box>
                  <Typography variant="h6">&nbsp;Artist name*</Typography>
                </Row>
              ))}
            </Box>
          </StyledGrid> */}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: "100%",
    padding: "0 95px 42px",
    maxWidth: "100%",
    overflow: "auto"
  },
  sidebar_controls: {
    display: "flex",
    columnGap: "10px",
    margin: "-80px 0px 50px 0px"
  },
  control_image: {
    cursor: "pointer",
    backgroundColor: "rgb(102,102,102)",
    padding: "5px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    "& thead tr": {
      border: "1px solid white",
      scroll: "auto"
    },
    "& thead tr th": {
      minWidth: "50px",
      paddingBlock: "10px",
      scroll: "auto"
    },
    "& tbody tr td": {
      paddingTop: 5,
      paddingBottom: 5,
      scroll: "auto"
    }
  },
  topBg: {
    width: "100%",
    height: "210px"
  },
  topBtn: {
    textTransform: "none",
    marginRight: 15,
    marginTop: 10,
    boxSizing: "border-box",
    padding: "12px 15px",
    color: "white",
    border: "1px solid white",
    borderRadius: "5px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#C4C4C4"
      //   border: "2px solid #000000"
    }
  },
  editedBtn: {
    color: "white",
    fontWeight: "bolder",
    fontSize: 14,
    marginLeft: "0px",
    marginTop: 10,
    boxSizing: "border-box",
    padding: "0px 15px",
    backgroundColor: "rgba(87, 164, 255, 1)",
    border: "1px solid #FFFFFF",
    textTransform: "capitalize",

    strong: {
      fontWeight: "bolder"
    }
  },
  filterBg: {
    padding: "0px 82px 32px",
    width: "100%",
    height: "170px",
    background: "linear-gradient(180deg, rgba(80, 141, 214, 0.8) 0%, #333333 86.39%)"
  },
  filterBox: {
    width: "100%",

    position: "relative",
    marginBottom: 30
  },
  select: {
    border: 0,
    marginTop: 20,
    width: 100
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20
  },
  artist: {
    fontSize: 17,
    color: "white"
  },
  name: {
    color: "white",
    fontSize: "xxx-large",
    fontWeight: "bolder"
  }
}))
