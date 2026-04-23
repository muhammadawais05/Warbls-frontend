import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import * as React from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { Row } from "../../../_warbls/components/Flex/Row"
import { filterInitialValues } from "../../../_warbls/components/Vocals/script"
import { Column } from "../../../_warbls/components/Flex/Column"
import WaveFramer from "../../../_warbls/components/TrackFramer/index"
import { SideBar } from "./sidebar"
import { DragHandleSharp } from "@material-ui/icons"
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../../redux/track/actions"
import swal from "sweetalert"

const { useState } = React

export const Table = ({
  tracks,
  setContainer,
  setCurrent,
  container,
  current,
  sideBarActivation,
  setSideBarActivation,
  currentVocal,
  setCurrentVocal
}) => {
  const { table, deleteBtn, btn, typo, img, helperText, title, downloadStyle, tableContainer } =
    useStyles()

  const dispatch = useDispatch()
  const { auth, userInfo } = useSelector((state) => state.auth)

  const [duration, setDuration] = useState("0:00")

  const [durationList, setDurationList] = useState([])

  const generateDuration = (dur) => {
    const fixed = dur?.toFixed(0)
    const val = fixed?.split(".")[0]
    const mins = val > 60 ? (val / 60).toFixed(0) : 0
    const scnd = val > 60 ? val % 60 : val
    return `0${mins}: ${scnd.toString().length === 2 ? scnd : "0" + scnd}`
  }

  const pushDurations = (dur) => {
    setDurationList((prevDurations) => [...prevDurations, dur])
  }

  const updateTrackStatus = (track) => {
    const payload = {
      status: track.status === "active" ? "pending" : "active",
      log: JSON.stringify({ log_added_by: userInfo.user_id })
    }
    const id = track.track_id
    dispatch(actions.updateTracksRequest(payload, id))
  }

  const handlePublish = (row) => {
    swal({
      title: "Are you sure?",
      text: "Once action performed, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Action has been perfomed succesfully!", {
          icon: "success"
        })
        updateTrackStatus(row)
      } else {
        swal("Cancelled! Your data is safe")
      }
    })
  }

  const handlePlayCount = (id) => {
    if (auth) {
      const payload = {
        object_type: "user",
        object_id: userInfo.user_id,
        added_by: userInfo.user_id,
        action: "play",
        action_against_id: id
      }
      dispatch(actions.trackWisePlayRequest(payload))
    } else {
      return
    }
  }

  return (
    <div>
      <div className={tableContainer}>
        <table className={table}>
          <thead>
            <tr>
              {heading.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tracks?.map((row, index) => (
              <tr key={index}>
                <td>{row.track_id}</td>
                <td align="center">
                  <img src={row.image_url} alt="" className={img} />
                </td>
                <td align="center">
                  <span>{durationList[index]}</span>
                </td>

                <td align="center" style={{ width: 300 }}>
                  <WaveFramer
                    index={index}
                    generateDuration={generateDuration}
                    song={row?.track_url}
                    setContainer={setContainer}
                    setCurrent={setCurrent}
                    container={container}
                    current={current}
                    setDuration={pushDurations}
                    handlePlayCount={handlePlayCount}
                    id={row.track_id}
                  />
                </td>
                <td align="left">
                  <Column>
                    <Typography variant="h6" className={`${title} truncate`}>
                      {row.track_name}
                    </Typography>
                    <small className={helperText}>Artist name*</small>
                  </Column>
                </td>
                <td align="center">
                  <Typography className={typo}>{row.play}</Typography>
                </td>

                <td align="left">
                  <Typography className={typo}>{row.download}</Typography>
                </td>

                <td align="center">
                  <Row jc="center" width="100%">
                    {/* <Button className={btn}>View</Button> */}
                    <Button
                      className={row.download == 0 ? downloadStyle : btn}
                      onClick={(e) => handlePublish(row)}
                    >
                      {row.status === "pending" ? "Publish" : "Unpublish"}
                    </Button>
                    {/* <Button className={btn}>Edit</Button> */}
                  </Row>
                </td>
                <td align="center">
                  <Button
                    className={deleteBtn}
                    onClick={(e) => {
                      setCurrentVocal(row)
                      setSideBarActivation(!sideBarActivation)
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const heading = ["", "Image", "Time", "Name", "Plays", "Download", "", "Action"]

const useStyles = makeStyles(() => ({
  tableContainer: {
    width: "100%",
    maxWidth: "100%",
    overflow: "auto"
  },

  table: {
    width: "100%",
    overflow: "scroll",
    maxWidth: "100%",
    borderCollapse: "collapse",
    // "@media (max-width: 1030px)": {
    //   width: "70%",
    //   overflow: "hidden"
    // },
    // "@media (max-width: 750px)": {
    //   width: "70%"
    // },
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
    },
    "& tbody tr:last-child td": {
      paddingTop: 5,
      paddingBottom: 5,
      border: 0
    }
  },

  deleteBtn: {
    backgroundColor: "#86DB78",
    color: "white",
    margin: "0px 3px",
    "&:hover": {
      color: "white"
    }
  },
  btn: {
    backgroundColor: "#86DB78",
    color: "white",
    margin: "0px 3px",
    textTransform: "none"
  },
  downloadStyle: {
    backgroundColor: "transparent",
    color: "white",
    margin: "0px 3px",
    border: "1px solid white"
  },

  helperText: {
    color: "#9F9F9F"
  },
  typo: {
    color: "white"
  },
  img: {
    width: 50
  },
  title: {
    fontSize: 17,
    width: 300
  }
}))
