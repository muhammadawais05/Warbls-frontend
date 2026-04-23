import * as React from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { SvgInline } from "../Svg"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"
import { useStyles } from "./script"

export const DrawerList = (props) => {
  const { list, active, hover } = props
  const location = useLocation()
  const { listText, listItem, icon, closeIcon, activeListText } = useStyles()

  return (
    <List>
      {list.map((l, index) => (
        <ListItem
          component={Link}
          to={l.to}
          className={clsx(listItem, hover, {
            [active]: location.pathname === l.to
          })}
          key={index}
        >
          <>
            <ListItemIcon className={clsx(icon, { [closeIcon]: !props.open })}>
              <span style={{ margin: "8px 5px 0 0" }}>
                <SvgInline
                  src={location.pathname === l.to ? l.activeIcon : l.icon}
                  w="21px"
                  h="21px"
                />
              </span>
            </ListItemIcon>
            <span className={clsx(listText, { [activeListText]: location.pathname === l.to })}>
              {l.label}
            </span>
          </>
        </ListItem>
      ))}
    </List>
  )
}
