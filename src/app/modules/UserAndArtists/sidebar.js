import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsCloudDownload } from "react-icons/bs"
import styles from "./sidebar.module.css"
import { SideBarWave } from "./waveframer"
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../../redux/track/actions"

export const SideBar = ({ setSideBarCheck, sideBarCheck, user, artists, tracks }) => {
  const dummyTrack = useSelector((state) => state.track.tracks)
  const dispatch = useDispatch()
  const [container, setContainer] = useState("")
  const [current, setCurrent] = useState("")
  const { auth, userInfo } = useSelector((state) => state.auth)
  const [selected, setSelected] = useState("")
  const [formData, setFormData] = React.useState({
    previous_work: null,
    sm_link: null,
    platform_link: null
  })
  const [track, setTrack] = React.useState([])

  const handleStop = () => {
    setSelected("")
  }
  const handlePlay = (i) => {
    setCurrent(i)
    setSelected(i)
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

  React.useEffect(() => {
    let artist = null
    let track = []
    setFormData({ previous_work: null, sm_link: null, platform_link: null })
    if (user && user.user_type === 2) {
      artist = artists.find((art) => {
        return art.user_id === user.user_id
      })
      artist &&
        setFormData({
          previous_work: artist.vocals,
          sm_link: artist.previous_work,
          platform_link: artist.platform_link
        })
      track = tracks.filter((tr) => {
        return tr.user_details?.user_id === user.user_id
      })

      setTrack(track)
    }
  }, [user])

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_bar}>
        <h4>Artist# &nbsp;&nbsp;&nbsp;&nbsp;{user && user.user_id}</h4>
        <span className={styles.close_icon} onClick={(e) => setSideBarCheck(!sideBarCheck)}>
          <AiOutlineClose />
        </span>
      </div>
      <h6 className={styles.email}>{user && user.email}</h6>
      <h6 className={styles.name}>{user && user.full_name}</h6>
      <p className={styles.form_heading}>Form</p>
      {user && user.user_type === 2 && (
        <form>
          <label className={styles.label}>
            Tell us more about yourself
            <h6 className={styles.text_area}>{formData.previous_work}</h6>
          </label>
          <label className={styles.label}>
            Provide links to some of your work
            <h6 className={styles.text_area}>{formData.sm_link}</h6>
          </label>
          <label className={styles.label}>
            Do you sell vocals on other platforms? If yes, provide us a link:
            <h6 className={styles.text_area}>{formData.platform_link}</h6>
          </label>
        </form>
      )}

      <div className={styles.button_group}>
        <button className={user && user.user_type === 2 ? styles.active_btn : styles.btn}>
          Artist
        </button>
        <button className={user && user.user_type === 0 ? styles.active_btn : styles.btn}>
          User
        </button>
      </div>
      {user && user.user_type === 2 && (
        <div className={styles.vocal_top_bar}>
          <h4 className={styles.vocals_heading}>Released Vocals</h4>
          <span className={styles.download_icon}>
            <BsCloudDownload />
          </span>
        </div>
      )}

      {track &&
        track.map((tr) => {
          return (
            user &&
            user.user_type == 2 && (
              <div className={styles.vocal_content}>
                <p>{tr.track_id}</p>
                <p>{tr.date_added.slice(0, 10)}</p>
                <img src={tr.image_url} alt="" width={50} />
                <div className={styles.vocal}>
                  <SideBarWave
                    setContainer={setContainer}
                    setCurrent={setCurrent}
                    container={container}
                    current={current}
                    handlePlay={handlePlay}
                    handleStop={handleStop}
                    dummyTrack={dummyTrack}
                    selected={selected}
                    handlePlayCount={handlePlayCount}
                    track={tr}
                  />
                </div>
                <p>{dummyTrack[0].download}</p>
              </div>
            )
          )
        })}
    </div>
  )
}
