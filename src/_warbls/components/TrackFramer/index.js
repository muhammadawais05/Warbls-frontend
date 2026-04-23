import React, { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import { CircularProgress, makeStyles, Tooltip } from "@material-ui/core"
import { RiCheckboxBlankFill } from "react-icons/ri"
import { FaPlay } from "react-icons/fa"
import { useSelector } from "react-redux"
import { actions } from "../../../redux/track/actions"
import { useDispatch } from "react-redux"
import { sidebarDrawerContext } from "../../../app/App"

const Waveform = (props) => {
  const dispatch = useDispatch()
  const { waveContainer, wave } = useStyles()
  const { volume } = useSelector((state) => state.track)
  const waveform = useRef(null)
  const [loader, setLoader] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
  var contextData = React.useContext(sidebarDrawerContext)

  // useEffect(() => {
  //   console.log("in useEffect in Waveform", props.playVocal)
  //   if (props.playVocal) {
  //     handleStop()
  //     handlePlay(props.playVocal)
  //   }
  // }, [props.playVocal])

  useEffect(() => {
    setLoader(true)
    const track = document.querySelector(`#track${props.index}`)
    if (!waveform.current) {
      waveform.current = WaveSurfer.create({
        barWidth: 3,
        cursorWidth: 1,
        container: `#waveform${props.index}`,
        backend: "WebAudio",
        height: 50,
        progressColor: "#86DB78",
        responsive: true,
        waveColor: "#EFEFEF",
        cursorColor: "transparent"
      })
    }

    waveform.current.load(track)
    waveform.current.setVolume(volume)
    waveform.current.on("ready", function () {
      setLoader(false)
      props.setDuration(props.generateDuration(waveform.current.getDuration()))
    })
  }, [props.index])

  useEffect(() => {
    handleMouseEnter()
  }, [currentProgress])

  useEffect(() => {
    if (props.index === props.current) {
      waveform.current.setVolume(volume)
    }
  }, [volume])

  const handlePlay = (id) => {
    // handleStop()
    contextData?.isCollapsed(false)
    const payload = {
      id: id
    }

    dispatch(actions.getPlayingVocal(payload))
    if (props.container) {
      props.container.current.stop()
    }
    waveform.current.play()
    props.setContainer(waveform)
    props.setCurrent(props.index)
  }

  const handleStop = () => {
    dispatch(actions.removePlayingVocal())
    props?.setCurrent()
    waveform?.current?.stop()
  }

  const handleMouseEnter = () => {
    setCurrentProgress(waveform.current.getCurrentTime())
  }

  return (
    <div className={waveContainer}>
      {loader ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <>
          {props.index === props.current ? (
            <RiCheckboxBlankFill
              fontSize={20}
              onClick={handleStop}
              color="#86DB78"
              className="pointer"
            />
          ) : (
            <FaPlay
              fontSize={16}
              onClick={() => handlePlay(props.id)}
              //   color="#86DB78"
              className="pointer"
            />
          )}
        </>
      )}
      <Tooltip title={props.generateDuration(currentProgress)}>
        <div
          id={`waveform${props.index}`}
          onMouseEnter={handleMouseEnter}
          className={`pointer ${wave}`}
        />
      </Tooltip>
      <audio id={`track${props.index}`} src={`${props.song}`} className="pointer" />
    </div>
  )
}

export default Waveform

const useStyles = makeStyles(() => ({
  waveContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "90%",
    background: "transparent",
    overflow: "hidden"
  },
  wave: {
    width: "90%",
    height: "50px",
    marginLeft: "10px",
    overflow: "hidden"
  }
}))
