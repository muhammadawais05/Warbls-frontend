import * as React from "react"
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Box,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from "@material-ui/core"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"
import { SvgInline } from "../Svg"

export const HeaderList = ({ indexPage }) => {
  const { root, listItem, activeClass, activeClassMd, icon, homePageHeader, homePageActiveItem } =
    useStyles()
  const location = useLocation()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down("sm"))
  const activeList = indexPage ? homePageList : list

  return (
    <List
      className={clsx(root, {
        [homePageHeader]: indexPage === true
      })}
    >
      {activeList?.map((l, index) => (
        <ListItem
          component={Link}
          key={index}
          to={l.to}
          className={clsx(listItem, {
            [activeClassMd]: location.pathname === l.to && media
          })}
        >
          {media && (
            <ListItemIcon className={clsx(icon)}>
              <SvgInline src={l.icon} w="20px" h="20px" />
            </ListItemIcon>
          )}
          <ListItemText primary={l.label} />
          <Box
            className={clsx(
              { [activeClass]: location.pathname === l.to },
              {
                [homePageActiveItem]: window.location.href.includes("main")
              }
            )}
          ></Box>
        </ListItem>
      ))}
    </List>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  homePageHeader: {
    width: "70%",
    margin: "0 auto"
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTypography-body1": {
      fontSize: 17,
      fontStyle: "normal",
      margin: "0px 10px",
      color: "#ffffff"
    },
    "&.MuiListItem-root": {
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "center"
      }
    }
  },
  activeClassMd: {
    backgroundColor: "#C4C4C4"
  },
  activeClass: {
    height: 4,
    backgroundColor: "#86DB78",
    width: "50%",
    borderRadius: 4,
    [theme.breakpoints.down("sm")]: {
      height: 0,
      backgroundColor: "transparent",
      width: "0%",
      borderRadius: 0
    }

    // position: "absolute",
    // bottom: 0
  },
  homePageActiveItem: {
    width: "5%"
  },
  icon: {
    "&.MuiListItemIcon-root": {
      minWidth: 32
    }
  }
}))

const list = [
  { label: "Vocals", to: "/vocals", icon: "/media/vocal-icon.svg" }
  //{ label: "Blog", to: "/blog", icon: "/media/blog.svg" },
  // { label: "Q&A", to: "/q&a", icon: "/media/q&a.svg" },
  // { label: "Contact", to: "/contact-us", icon: "" }
]

const homePageList = [{ label: "Vocals", to: "/vocals", icon: "/media/vocal-icon.svg" }]
