import { makeStyles } from "@material-ui/core"
import * as React from "react"
import WaveSurfer from "wavesurfer.js"
// import styled from "styled-components"
import { RiCheckboxBlankFill } from "react-icons/ri"
import { FaPlay } from "react-icons/fa"
import { useSelector } from "react-redux"

const { useEffect, useState } = React

export const AudioPlayer = (props) => {
  const { root, waveContainer, wave, controllers, title } = useStyles()
  const { volume } = useSelector((state) => state.track)
  const [play, setPlay] = useState(false)
  let waveform

  useEffect(() => {
    const track = document.querySelector(`#tracks`)
    waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: `#waveforms`,
      backend: "WebAudio",
      height: 50,
      progressColor: "#86DB78",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent"
    })
    waveform.load(track)
  }, [props])

  const handlePlay = () => {
    waveform.play()
    // props.setContainer(`#waveforms`)
    // props.setCurrent(props.index)
    setPlay(true)
  }

  const handleStop = () => {
    waveform.pause()
    // props.setCurrent()
    setPlay(false)
  }

  return (
    <div className={root}>
      <div className={waveContainer}>
        <div className="scroll-left">
          <p className={`${title}`}>hello, its me</p>
        </div>
        <div id={`waveforms`} className={wave} />
        <audio id={`tracks`} src={"/tracks/sound1.mp3"} />
        <div className={controllers}>
          {play ? (
            <RiCheckboxBlankFill
              fontSize={20}
              onClick={handleStop}
              color="#86DB78"
              className="pointer"
            />
          ) : (
            <FaPlay fontSize={16} onClick={handlePlay} color="#86DB78" className="pointer" />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 1000,
    overflow: "hidden",
    bottom: 0,
    right: "5%",
    width: 250,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      bottom: "57px"
    }
  },
  waveContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
    width: "90%",
    background: "transparent"
  },
  wave: {
    width: "90%",
    height: "50px",
    marginLeft: "10px"
  },
  controllers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 5
  }
}))
