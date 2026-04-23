import * as React from "react"
import { Box, Container, makeStyles, Typography } from "@material-ui/core"
import { VocalRow } from "../../components/VocalRow"
import { Filter } from "./Filter"
import PerfectScrollbar from "react-perfect-scrollbar"
import { SMFilter } from "./SMFilter"
import { APIs } from "../../../_helpers/apis"
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../../redux/track/actions"
import { AppContext } from "../../providers/AppProvider"
import { filterInitialValues } from "./script"
import Pagination from "../Pagination"
import axios from "axios"

const { useRef, useState, useContext, useEffect } = React

export const VocalsTable = ({ heading, download, heart, downloadCheck, list }) => {
  const [size, setSize] = useState([0, 0])
  const { table, filterBox, overflow, rootBox } = useStyles()
  const { likedTracks, dowloadedTracks, loading } = useSelector((state) => state.track)
  const { handleLogin, handleCart } = useContext(AppContext)
  const anchorRef = useRef()
  const { auth, userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [container, setContainer] = useState("")
  const [current, setCurrent] = useState("")
  const [selected, setSelected] = useState("")
  const [filters, setFilters] = useState(filterInitialValues)
  const [paginationMetrics, setPaginationMetrics] = useState({
    offset: 0,
    limit: 50,
    total: 0,
    tracks: []
  })
  const [pageNo, setPageNo] = useState(0)
  const [filteredTracks, setFilteredTracks] = useState([])
  const [preFilteredTracks, setPreFilteredTrack] = useState([])
  const [popularTracks, setPopularTracks] = useState([])
  const [trendingTracks, setTrendingTracks] = useState([])

  // setting tables headings for mobile screen
  if (size[0] < 1280) {
    heading = ["Name and Artist", "", ""]
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
    let query = getQueryParams()
    if (heart) {
      dispatch(actions.likedTracksRequest(query))
    } else if (!!download) {
      dispatch(actions.downloadedTracksRequest(query))
    } else {
      dispatch(actions.getAllTracksRequest(query))
    }
  }, [filters])

  useEffect(() => {
    if (heart) {
      track_res = likedTracks
      setFilteredTracks(track_res)
      setPreFilteredTrack(track_res)
    } else if (download) {
      track_res = dowloadedTracks
      setFilteredTracks(track_res)
      setPreFilteredTrack(track_res)
    } else {
      track_res = list
      setFilteredTracks(track_res)
      setPreFilteredTrack(track_res)
    }
  }, [likedTracks, dowloadedTracks, list])

  useEffect(() => {
    var filteredSongs = filteredTracks

    filteredSongs = filteredSongs.length === 0 ? preFilteredTracks : filteredSongs

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
    }

    setFilteredTracks(filteredSongs)
  }, [filters, track_res])

  const payload = {
    object_type: "user",
    object_id: userInfo.user_id,
    added_by: userInfo.user_id
  }

  const handleStop = () => {
    setSelected("")
  }
  const handlePlay = (i) => {
    setCurrent(i)
    setSelected(i)
  }

  const handleDownload = async (url, trackID) => {
    if (auth) {
      debugger
      const data = {
        action: "download",
        action_against_id: trackID,
        ...payload
      }
      // const response = await GET(APIs.download + "?file_name=" + url, {
      //   token: auth
      // })
      // anchorRef.current.href = response.data
      anchorRef.current.href = url
      anchorRef.current.click()
      dispatch(actions.trackWiseDownloadRequest(data))
    } else {
      handleLogin()
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
  const getQueryParams = () => {
    let query = ""

    if (!!filters.isPhrase) query += `&is_phrases=${encodeURIComponent(filters.isPhrase)}`
    if (!!filters.isOneShot) query += `&is_oneshot=${encodeURIComponent(filters.isOneShot)}`
    if (!!filters.bpm) query += `&bpm=${encodeURIComponent(filters.bpm)}`
    if (!!filters.language) query += `&language=${encodeURIComponent(filters.language)}`
    if (!!filters.key) query += `&key=${encodeURIComponent(filters.key)}`
    if (!!filters.gener) query += `&genre=${encodeURIComponent(filters.gener)}`
    if (!!filters.searchKey) query += `&track_name=${encodeURIComponent(filters.searchKey)}`
    if (!!filters.isWet) query += `&is_wet=${encodeURIComponent(filters.isWet)}`
    if (!!filters.isDry) query += `&is_dry=${encodeURIComponent(filters.isDry)}`

    return query
  }

  // listning for width to switch filters fot mobile screen and laptop
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  var track_res = []

  useEffect(() => {
    let newOffset = pageNo * 50
    setPaginationMetrics({ ...paginationMetrics, offset: newOffset - 50 })
  }, [pageNo])

  useEffect(() => {
    if (!!heart) {
      setPaginationMetrics({
        ...paginationMetrics,
        total: likedTracks?.length,
        tracks: likedTracks
      })
    }
    if (!!download) {
      setPaginationMetrics({
        ...paginationMetrics,
        total: dowloadedTracks?.length,
        tracks: dowloadedTracks
      })
    }
  }, [paginationMetrics.offset, likedTracks, dowloadedTracks])

  return (
    <div style={{ margin: "0 50px" }}>
      <Container>
        <div className={filterBox} pt={2} width="100%">
          {size[0] > 1280 ? (
            <Filter filters={filters} setFilters={setFilters} />
          ) : (
            <SMFilter filters={filters} setFilters={setFilters} />
          )}
        </div>
      </Container>
      <Box className={rootBox} width="100%">
        <Box className={overflow} style={{ marginTop: size[0] > 1280 ? "-40px" : "200px" }}>
          <PerfectScrollbar>
            <br />
            {loading && (
              <Typography variant="body2" align="center">
                Loading Please Wait ...
              </Typography>
            )}
            {!loading && (
              <table className={table}>
                <thead>
                  <tr>
                    {heading.map((h, index) => (
                      <th key={index}>
                        <Typography variant="body2">{h}</Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <br />

                  {filteredTracks?.length > 0 &&
                    filteredTracks.map((r, index) => (
                      <VocalRow
                        key={index}
                        index={index}
                        setContainer={setContainer}
                        setCurrent={setCurrent}
                        container={container}
                        current={current}
                        handlePlay={handlePlay}
                        downloadCheck={downloadCheck}
                        rowList={r}
                        handleStop={handleStop}
                        selected={selected}
                        download={download}
                        heart={heart}
                        handleDownload={handleDownload}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                        handleCart={handleCart}
                      />
                    ))}
                </tbody>
              </table>
            )}
          </PerfectScrollbar>
        </Box>
        <a target="_blnak" ref={anchorRef} style={{ visibility: "hidden" }}></a>
      </Box>
      {!!heart && (
        <Pagination page={pageNo} setPageNo={setPageNo} total={paginationMetrics.total} />
      )}
      {!!download && (
        <Pagination page={pageNo} setPageNo={setPageNo} total={paginationMetrics.total} />
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  table: {
    width: "99%",
    borderCollapse: "collapse",
    "& thead tr th": {
      textAlign: "center",
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
      width: 50
    }
  },
  filterBox: {
    width: "98%",
    // [theme.breakpoints.down("lg")]: {
    //   width: "85%"
    // },
    // // "@media screen and (max-width: 1500px)": {
    // //   width: "75%"
    // // },
    // [theme.breakpoints.down("md")]: {
    //   width: "70%"
    // },
    // "@media screen and (max-width: 959px)": {
    //   width: "93%"
    // },
    // "@media screen and (max-width: 400px)": {
    //   width: "90%"
    // },

    position: "relative",
    marginBottom: 60
  },
  overflow: {
    height: "80vh",
    width: "inherit",
    overflow: "auto",
    paddingRight: 5

    // [theme.breakpoints.down("md")]: {
    //   marginTop: 100
    // },
    // [theme.breakpoints.down("sm")]: {
    //   marginTop: 200
    // }
  },
  rootBox: {
    padding: "0px 32px 32px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px  0px 0px"
    },
    "@media (min-width: 1280px)": {
      maxWidth: "auto"
    }
  }
}))
