import * as React from "react"
import {
  makeStyles,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Typography
} from "@material-ui/core"
import { FaShoppingCart } from "react-icons/fa"
import clsx from "clsx"
import { AdminList } from "./AdminList"
import { BiUpload } from "react-icons/bi"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { Popup } from "../Popup"
import { AppContext } from "../../../_warbls/providers/AppProvider"
import { Signin } from "../../../app/modules/Signin"
import { Signup } from "../../../app/modules/Signup"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { GiHamburgerMenu } from "react-icons/gi"
import { Logout } from "../Drawer/Logout"
import { SvgInline } from "../Svg"
import { ClickAwayListener } from "@material-ui/core"
import { useHistory } from "react-router"

const { useContext, useState } = React

export const AdminHeader = ({ handleDrawerOpen, open, indexPage }) => {
  const classes = useStyles()
  const { openLogin, handleLogin, openSignup, handleSignup, toolbar } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const { auth, userInfo } = useSelector((state) => state.auth)
  const is_admin = useSelector((state) => state.auth.userInfo.is_admin)
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down("sm"))
  const { cart } = useSelector((state) => state.track)
  const history = useHistory()

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <Toolbar className={toolbar}>
        {media ? (
          <GiHamburgerMenu
            fontSize={30}
            color="#ffffff"
            className="pointer"
            onClick={handleMenuOpen}
          />
        ) : (
          <>
            {open ? (
              <img
                onClick={(e) => history.push("/")}
                src={toAbsoluteUrl("/media/full-logo.png")}
                height="50"
                width="120"
                className="pointer"
                alt="logo"
                style={{ marginRight: 42, marginLeft: 33 }}
              />
            ) : (
              <img
                onClick={(e) => history.push("")}
                src={toAbsoluteUrl("/media/logo-sm-white.png")}
                height="50"
                className="pointer"
                width="30"
                alt="small logo"
                style={{ marginRight: 165 }}
              />
            )}
          </>
        )}

        {!media && <AdminList indexPage={indexPage} />}
        <div className={classes.grow} />
      </Toolbar>

      {menuOpen && media && (
        <ClickAwayListener onClickAway={handleMenuOpen}>
          <Box
            style={{
              position: auth ? "fixed" : "absolute",
              top: 64,
              left: 0,
              backgroundColor: "#333333",
              width: 240,
              height: 296,
              zIndex: 2000
            }}
          >
            <AdminList />
            <Box display="flex" ml={3} mt={2}>
              <SvgInline
                src={toAbsoluteUrl("./media/facebook.svg")}
                classes={classes.menuIcon}
                w={30}
                h={30}
              />
              <SvgInline
                src={toAbsoluteUrl("./media/twitter.svg")}
                classes={classes.menuIcon}
                w={30}
                h={30}
              />
              <SvgInline
                src={toAbsoluteUrl("./media/youtube.svg")}
                classes={classes.menuIcon}
                w={30}
                h={30}
              />
              <SvgInline
                src={toAbsoluteUrl("./media/insta.svg")}
                classes={classes.menuIcon}
                w={30}
                h={30}
              />
            </Box>
            <Logout open={open} />
          </Box>
        </ClickAwayListener>
      )}
      <Popup open={openLogin} handleClose={handleLogin}>
        <Signin handleSignup={handleSignup} handleLogin={handleLogin} />
      </Popup>
      <Popup open={openSignup} handleClose={handleSignup}>
        <Signup handleSignup={handleSignup} handleLogin={handleLogin} />
      </Popup>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    textTransform: "none",
    paddingLeft: 20,
    paddingRight: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16
  },
  grow: {
    flexGrow: 1
  },
  inputRoot: {
    color: "inherit"
  },
  sectionDesktop: {
    // display: "none",
    display: "flex",
    width: "320px",
    // alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  btn: {
    width: 107,
    height: 42,
    [theme.breakpoints.down("sm")]: {
      width: 120,
      height: 37,
      fontSize: 14
    }
  },
  login: {
    //backgroundColor: "#ffffff",
    color: theme.palette.primary.contrastText,
    cursor: "pointer"
    // "&:hover": {
    //   backgroundColor: "rgba(196, 196, 196, 0.6)",
    //   color: "#ffffff"
    // }
  },
  signup: {
    backgroundColor: theme.palette.primary.contrastText,
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginRight: 20,
    "&:hover": {
      backgroundColor: "rgba(196, 196, 196, 0.6)",
      color: "#ffffff"
    }
  },
  divider: {
    width: "1px",
    backgroundColor: theme.palette.secondary.main,
    height: "80%"
  },
  headerText: {
    "@media (max-width:1235px) ": {
      display: "none"
    }
  },
  uploadBtn: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    borderRadius: 10,
    width: 190,
    height: 45,
    fontWeight: 400,
    fontSize: 14,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    },
    [theme.breakpoints.down("sm")]: {
      width: 160,
      height: 40
    }
  },
  menuIcon: {
    margin: "0px 5px"
  },
  toolbar: {
    minHeight: 64,
    "&.MuiToolbar-regular": {
      minHeight: 64,
      [theme.breakpoints.down("sm")]: {
        minHeight: 64
      },
      [theme.breakpoints.down("xs")]: {
        minHeight: 64
      }
    }
  }
}))
