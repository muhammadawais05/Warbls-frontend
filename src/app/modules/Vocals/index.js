import * as React from "react"
import { Box } from "@material-ui/core"
import { VocalsTable } from "../../../_warbls/components/Vocals"
import { ContentContainer } from "../../../_warbls/components/Container"
import { heading } from "./script"
import { actions } from "../../../redux/track/actions"
import { useDispatch, useSelector } from "react-redux"
import ArtistCarousel from "../../../_warbls/components/carousel"
import Pagination from "../../../_warbls/components/Pagination"
import { APIs } from "../../../_helpers/apis"
import axios from "axios"

const { useState, useEffect } = React

export const Vocals = (props) => {
  const { tracks } = useSelector((state) => state.track)
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")
  const [bpms, setBpm] = useState("")
  const [language, setLanguage] = useState("")
  const [phrases, setPhrase] = useState("")
  const [oneShot, setOneShot] = useState("")
  const [keys, setKeys] = useState("")
  const [genre, setGenre] = useState("")
  const reduxState = useSelector((state) => state)
  const [searches, setSearches] = useState("")
  const { userInfo } = useSelector((state) => state.auth)
  const [filteredTracks, setFilteredTracks] = useState()
  const [paginationMetrics, setPaginationMetrics] = useState({
    offset: 0,
    limit: 50,
    total: 0,
    tracks: tracks
  })
  const [pageNo, setPageNo] = useState(0)

  useEffect(() => {
    let newOffset = pageNo * 50
    setPaginationMetrics({ ...paginationMetrics, offset: newOffset - 50 })
  }, [pageNo])

  useEffect(() => {
    let url = null

    setPaginationMetrics({
      ...paginationMetrics
    })
    if (userInfo.is_admin !== 1 && userInfo.user_id) {
      url = `${APIs.tracks}?load=user_details&offset=${paginationMetrics.offset}&limit=50`
      axios.get(url).then((res) => {
        // console.log(paginationMetrics.offset, res)
        // data = res.data.results
        // setTracks(res.data.results)

        let fil_tracks = res.data.results?.filter((track) => {
          return track?.status === "active" || track?.user_details?.user_id === userInfo.user_id
        })

        setPaginationMetrics({
          ...paginationMetrics,
          total: fil_tracks?.length ?? 0,
          tracks: fil_tracks
        })
      })
    } else if (userInfo.is_admin === 1 && userInfo.user_id) {
      url = `${APIs.tracks}?load=user_details&offset=${paginationMetrics.offset}&limit=50`
      axios.get(url).then((res) => {
        setPaginationMetrics({
          ...paginationMetrics,
          total: res.data.total,
          tracks: res.data.results
        })
      })
    } else {
      url = `${APIs.tracks}?load=user_details&offset=${paginationMetrics.offset}&limit=50`
      axios.get(url).then((res) => {
        let fil_tracks = res.data?.results?.filter((track) => {
          return track?.status === "active"
        })
        setPaginationMetrics({
          ...paginationMetrics,
          total: fil_tracks?.length ?? 0,
          tracks: fil_tracks
        })
      })
    }
  }, [userInfo])

  return (
    <Box p={0} width="100%">
      <ContentContainer titleLeft="25px" {...props} title="Vocals" gradient={"larger"}>
        <VocalsTable
          heading={heading}
          list={paginationMetrics.tracks}
          download={false}
          heart={false}
          setQuery={setQuery}
          bpms={bpms}
          setBpm={setBpm}
          language={language}
          setLanguage={setLanguage}
          phrases={phrases}
          setPhrase={setPhrase}
          oneShot={oneShot}
          setOneShot={setOneShot}
          keys={keys}
          setKeys={setKeys}
          genre={genre}
          setGenre={setGenre}
          searches={searches}
          setSearches={setSearches}
        />
        <Pagination page={pageNo} setPageNo={setPageNo} total={paginationMetrics.total} />
        <ArtistCarousel />
      </ContentContainer>
    </Box>
  )
}
