import * as React from "react"
import { makeStyles } from "@material-ui/core"
import clsx from "clsx"

export const Select = ({ options, classes }) => {
  const { root } = useStyles()

  return (
    <select className={clsx(root, classes)}>
      {options.map((o, index) => (
        <option key={index} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: "6px 7px",
    width: "11%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "5px 0px",
      padding: "12px 7px"
    }
  }
}))
