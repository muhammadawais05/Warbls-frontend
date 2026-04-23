import React, { useState } from "react"
import WaveFramer from "../../../_warbls/components/TrackFramer/index"
import { useSelector } from "react-redux"

export const SideBarWave = ({
  tracks,
  setContainer,
  setCurrent,
  container,
  current,
  dummyTrack,
  handlePlayCount,
  track
}) => {
  const [duration, setDuration] = useState("0:00")

  const generateDuration = (dur) => {
    const fixed = dur.toFixed(0)
    const val = fixed.split(".")[0]
    const mins = val > 60 ? (val / 60).toFixed(0) : 0
    const scnd = val > 60 ? val % 60 : val
    return `0${mins}: ${scnd.toString().length === 2 ? scnd : "0" + scnd}`
  }

  return (
    <div style={{ width: "200px" }}>
      <WaveFramer
        index={track.track_id}
        generateDuration={generateDuration}
        song={track.track_url}
        setContainer={setContainer}
        setCurrent={setCurrent}
        container={container}
        current={current}
        setDuration={setDuration}
        handlePlayCount={handlePlayCount}
      />
    </div>
  )
}
