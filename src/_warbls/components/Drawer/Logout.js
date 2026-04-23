import * as React from "react"
import { useStyles } from "./script"
import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx"
import { list3 } from "./script"
import { List, ListItemIcon, ListItemText, ListItem } from "@material-ui/core"
import { SvgInline } from "../Svg"
import { actions } from "../../../redux/auth/actions"
import { useHistory } from "react-router"

const { logoutRequest } = actions

export const Logout = ({ open }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <List>
      {list3.map((l, index) => (
        <ListItem
          onClick={() => {
            dispatch(logoutRequest())
            history.push("/")
          }}
          className={clsx(classes.listItem, classes.hover)}
          key={index}
        >
          <>
            <ListItemIcon
              className={clsx(classes.icon, { [classes.closeIcon]: open })}
              style={{ marginLeft: "0", paddingLeft: "0px", paddingRight: "0px" }}
            >
              {/* <SvgInline src={l.icon} w="19px" h="20px" /> */}
              {userInfo.is_admin === 0 ? <SvgInline src={l.icon} w="19px" h="20px" /> : null}
            </ListItemIcon>
            <span className={classes.listText}>{l.label}</span>
          </>
        </ListItem>
      ))}
    </List>
  )
}
