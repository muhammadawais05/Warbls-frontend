import { POST, GET, PUT } from "../../../../_helpers/fetcher"
import { useHistory } from "react-router"
import * as React from "react"
import {
  Box,
  makeStyles,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress
} from "@material-ui/core"
import { StyledContainer } from "../../../../_warbls/components/Container/StyledContainer"
import { StyledGrid } from "../../../../_warbls/components/Container/StyledGrid"
import { Row } from "../../../../_warbls/components/Flex/Row"
import { VocalRow } from "../../../../_warbls/components/VocalRow"
import { toAbsoluteUrl } from "../../../../_helpers/toAbsoluteUrl"
import { useSelector, useDispatch } from "react-redux"
import { AppContext } from "../../../../_warbls/providers/AppProvider"
import { actions } from "../../../../redux/track/actions"
import ArtistCarousel from "../../../../_warbls/components/carousel"
import { filterInitialValues } from "../../../../_warbls/components/Vocals/script"
import { Filter } from "../../../../_warbls/components/Vocals/Filter"
import { SMFilter } from "../../../../_warbls/components/Vocals/SMFilter"
import { useParams } from "react-router-dom"
import axios from "axios"
import { APIs } from "../../../../_helpers/apis"

const { useState, useContext, useEffect } = React

export const ArtistPublicProfile = () => {
  // read id from params
  const { id } = useParams()
  const history = useHistory()
  const {
    tableContainer,
    progress,
    progressContainer,
    topBg,
    topBtn,
    select,
    table,
    artist,
    name,
    filterBg,
    editedBtn,
    filterBox
  } = useStyles()
  const dispatch = useDispatch()
  // const { tracks } = useSelector((state) => state.track)
  const [tracks, setTracks] = useState(0)
  const [userInfo, setUserInfo] = useState(0) // 0 loading, {} success, 2 error
  const [isLoading, setIsLoading] = useState(true)
  const [container, setContainer] = useState("")
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down("sm"))
  const [current, setCurrent] = useState("")
  const [selected, setSelected] = useState("")
  const [, setPlay] = useState(false)
  const { auth } = useSelector((state) => state.auth)

  const { handleLogin, handleCart } = useContext(AppContext)
  const data = [0, 2].includes(tracks)
    ? []
    : tracks.filter((t, index) => index !== 0 && index !== 1)
  const [filters, setFilters] = useState(filterInitialValues)
  const [size, setSize] = React.useState([0, 0])
  const profileImg = userInfo.cover_image
  let heading = ["#", "Waveform", "Name", "Key", "BPM"]
  if (size[0] < 1280) {
    heading = ["Name and Artist", "", ""]
  }

  useEffect(async () => {
    try {
      const r = await axios.get(`${APIs.users}?user_id=${id}`, {
        headers: {
          token: auth
        }
      })
      if (r.status === 200 && "results" in r.data && r.data.total > 0) {
        setUserInfo(r.data.results[0])
      } else {
        history.push("/artist")
      }
    } catch (err) {
      history.push("/artist")
    }
  }, [id])

  useEffect(async () => {
    if (!!userInfo?.user_id) {
      try {
        const r = await axios.get(`${APIs.tracks}?load=track_stats&added_by=${userInfo.user_id}`, {
          headers: {
            token: auth
          }
        })
        if (r.status === 200 && "results" in r.data && r.data.total > 0) {
          setTracks(r.data.results)
        } else {
          setTracks(2)
        }
      } catch (err) {
        setTracks(2)
      }
    }
  }, [userInfo])

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
      {userInfo === 0 && ( // loading
        <StyledContainer className={progressContainer}>
          <CircularProgress className={progress} />
        </StyledContainer>
      )}
      {userInfo != 0 && (
        <>
          <Box
            className={topBg}
            style={{
              backgroundImage: `url(${profileImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
            display="flex"
            alignItems="center"
          >
            <StyledContainer display="flex" flexDirection="column">
              <Row ai="center">
                <img src={toAbsoluteUrl("/media/tick.svg")} alt="" width="20px" height="20px" />
                &nbsp; &nbsp;<Typography className={artist}>Artist</Typography>
              </Row>
              <Typography className={name}>{userInfo.full_name}</Typography>
            </StyledContainer>
          </Box>
          <Box>
            <StyledGrid xs={12} item className={filterBg}>
              <Box style={{ padding: " 0 20px" }}>
                <Row style={{ display: size[0] > 1280 ? "unset" : "none" }}>
                  <Button className={topBtn}>All</Button>
                  <Button className={topBtn}>Album 1</Button>
                  <Button className={topBtn}>Album 2</Button>
                  <Button className={topBtn}>Album 3</Button>
                  <Button className={editedBtn}>
                    Edited by <br /> Warbis
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

            <div className={tableContainer} style={{ marginTop: size[0] > 1280 ? "20px" : "70px" }}>
              {tracks === 0 && ( // loading
                <StyledContainer className={progressContainer}>
                  <CircularProgress className={progress} />
                </StyledContainer>
              )}
              {tracks === 2 && ( // error/no data
                <StyledContainer className={progressContainer}>
                  <Typography variant="h3">No Tracks available</Typography>
                </StyledContainer>
              )}
              {![0, 2].includes(tracks) && (
                <table className={table}>
                  <thead>
                    <tr>
                      {heading.map((head, index) => (
                        <th key={index}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...data, ...data].map((row, index) => (
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
              )}
            </div>
          </Box>

          <ArtistCarousel />
        </>
      )}
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
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
    overflow: "hidden"
  },
  progress: {
    color: "white"
  },
  tableContainer: {
    width: "100%",
    padding: "0 20px",
    maxWidth: "100%",
    overflow: "auto"
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
    height: "170px"
  },
  topBtn: {
    textTransform: "none",
    marginLeft: 5,
    marginTop: 10,
    boxSizing: "border-box",
    padding: "6px 15px",
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
    fontSize: 12,
    marginLeft: "30px",
    marginTop: 10,
    boxSizing: "border-box",
    padding: "5px 15px",
    backgroundColor: "rgba(87, 164, 255, 1)",
    border: "1px solid #FFFFFF"
  },
  filterBg: {
    width: "100%",
    height: "170px",
    background: "linear-gradient(180deg, rgba(80, 141, 214, 0.8) 0%, #333333 86.39%)"
  },
  filterBox: {
    width: "60%",
    [theme.breakpoints.down("lg")]: {
      width: "75%"
    },
    // "@media screen and (max-width: 1500px)": {
    //   width: "75%"
    // },
    [theme.breakpoints.down("md")]: {
      width: "70%"
    },
    "@media screen and (max-width: 959px)": {
      width: "93%"
    },
    "@media screen and (max-width: 400px)": {
      width: "90%"
    },

    position: "absolute",
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
