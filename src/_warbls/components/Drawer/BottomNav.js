import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import { SvgInline } from "../Svg"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 57,
    backgroundColor: "#202020",
    "& .MuiBottomNavigationAction-root.Mui-selected": {
      color: "#ffffff",
      borderLeft: "1px solid red"
    },
    "& .MuiBottomNavigationAction-root": {
      color: "#ffffff"
    }
  },
  link: {
    width: "20%",
    display: "flex",
    justifyContent: "center"
  }
})

export const SimpleBottomNavigation = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      //   showLabels
      className={classes.root}
    >
      {list2.map((list, index) => (
        <>
          {list.to ? (
            <Link to={list.to} className={classes.link} key={index}>
              <BottomNavigationAction
                label={list.label}
                icon={<SvgInline src={list.icon} w={20} h={20} />}
              ></BottomNavigationAction>
            </Link>
          ) : (
            <BottomNavigationAction
              label={list.label}
              key={index}
              icon={<SvgInline src={list.icon} w={23} h={45} />}
            ></BottomNavigationAction>
          )}
        </>
      ))}
    </BottomNavigation>
  )
}

export const list2 = [
  { label: "My Vocals", icon: "/media/vocals.svg", to: "/my-vocals" },
  { label: "Likes", icon: "/media/likes.svg", to: "/likes" },
  { label: "Likes", icon: "/media/logo-small-white.svg" },
  { label: "Downloads", icon: "/media/downloads.svg", to: "/downloads" },
  { label: "Your Library", icon: "/media/library.svg", to: "/vocals" }
]
