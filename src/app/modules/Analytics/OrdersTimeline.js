import React from "react"
import Timeline from "@material-ui/lab/Timeline"
import TimelineItem from "@material-ui/lab/TimelineItem"
import TimelineSeparator from "@material-ui/lab/TimelineSeparator"
import TimelineConnector from "@material-ui/lab/TimelineConnector"
import TimelineContent from "@material-ui/lab/TimelineContent"
import TimelineDot from "@material-ui/lab/TimelineDot"
import { makeStyles, Typography } from "@material-ui/core"

export const OrdersTimeline = () => {
  const { typo, timeBox } = useStyles()

  return (
    <Timeline>
      {Array.from({ length: 7 }).map((i, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot className={timeBox}>
              <span>11:32</span>
            </TimelineDot>
            {index !== 6 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography className={typo}>* Vocal file name</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

const useStyles = makeStyles(() => ({
  typo: {
    fontSize: 17,
    color: "#000000",
    fontWeight: "normal"
  },
  timeBox: {
    width: 60,
    height: 40,
    border: "1px solid black",
    borderRadius: 20,
    color: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}))
