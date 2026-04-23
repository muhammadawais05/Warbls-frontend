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
import { HeaderList } from "./List"
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
import { flexbox } from "@material-ui/system"

const { useContext, useState } = React

export const Header = ({ handleDrawerOpen, open, indexPage }) => {
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
        <div className={classes.navbar}>
          <div>
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
                    src={toAbsoluteUrl("/media/warbls-logo.png")}
                    height="40"
                    width="22"
                    className="pointer"
                    alt="logo"
                    style={{ marginRight: 30, marginLeft: -10 }}
                  />
                ) : (
                  <img
                    onClick={(e) => history.push("/")}
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
          </div>
          <div>{!media && <HeaderList />}</div>
          <div>
            <div className={classes.grow} />
            {is_admin ? (
              ""
            ) : (
              <div className={classes.sectionDesktop}>
                {auth ? (
                  <Box mx={2} display="flex" alignItems="center">
                    <Link
                      to={userInfo.user_type === 2 ? "/upload-track" : "/upload-form"}
                      className={classes.uploadBtn}
                    >
                      <BiUpload fontSize={18} />
                      &nbsp;&nbsp; Upload
                    </Link>
                  </Box>
                ) : (
                  <>
                    <Box mx={0} display="flex" alignItems="center">
                      <Typography
                        onClick={handleLogin}
                        className={clsx(classes.login, classes.root)}
                      >
                        Log in
                      </Typography>
                    </Box>
                    <Box mx={0} display="flex" alignItems="center">
                      <Button
                        onClick={handleSignup}
                        className={clsx(classes.btn, classes.signup, classes.root)}
                      >
                        Sign up
                      </Button>
                    </Box>
                  </>
                )}

                <Box mx={1} display="flex" alignItems="center">
                  <div className={classes.divider}></div>
                </Box>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge
                    badgeContent={cart && cart.length}
                    color="secondary"
                    onClick={(e) => (auth ? history.push("/Cart") : handleLogin())}
                  >
                    <FaShoppingCart color="#ffffff" />
                  </Badge>
                </IconButton>
              </div>
            )}
          </div>
        </div>
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
            <HeaderList />
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
    // width: "320px",
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
    borderRadius: 5,
    width: 127,
    height: 35,
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
  },
  navbar: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
}))
