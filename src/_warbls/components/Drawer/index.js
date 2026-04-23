import * as React from "react"
import clsx from "clsx"
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Divider,
  useMediaQuery,
  useTheme,
  Slider,
  Button
} from "@material-ui/core"
import { DrawerList } from "./List"
import { list1, list2, list4, list5, list6, list7, list8, list9 } from "./script"
import { Header } from "../Header"
import { AdminHeader } from "../Header/AdminHeader"
import { useDispatch, useSelector } from "react-redux"
import { useStyles } from "./script"
import { Logout } from "./Logout"
import { SimpleBottomNavigation } from "./BottomNav"
import { actions } from "../../../redux/track/actions"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"
import { actions as TrackActions } from "../../../redux/track/actions"
import { AppContext } from "../../providers/AppProvider"
import { FaRegHeart, FaShoppingCart } from "react-icons/fa"
import { ImHeart } from "react-icons/im"
import { useContext } from "react"
import { sidebarDrawerContext } from "../../../app/App"

const { useState, useEffect } = React

export const AppDrawer = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [collapsed, isCollapsed] = useState(true)

  const { userInfo, auth } = useSelector((state) => state.auth)
  const is_admin = useSelector((state) => state.auth.userInfo.is_admin)
  const { tracks, likedTracks, dowloadedTracks, loading } = useSelector((state) => state.track)
  const global_state = useSelector((state) => state?.global)
  const { handleLogin, handleCart } = useContext(AppContext)
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down("sm"))
  const { volume } = useSelector((state) => state.track)
  const [prevVolume, setPrevVolume] = useState()
  const [mute, setMute] = useState(false)
  const dispatch = useDispatch()
  const { allTracks, cart } = useSelector((state) => state.track)
  const currentPlayingTrack = useSelector((state) => state.track.currentPlayingTrack)
  const [heartFlag, setheartFlag] = useState(
    currentPlayingTrack?.id && allTracks[currentPlayingTrack?.id]?.liked === 1
  )
  const payload = {
    object_type: "user",
    object_id: userInfo.user_id,
    added_by: userInfo.user_id
  }

  var contextData = React.useContext(sidebarDrawerContext)

  useEffect(() => {
    dispatch(TrackActions.getAllPendingTracksRequest())
  }, [])

  useEffect(() => {
    if (volume === 0) {
      setMute(true)
    } else {
      setMute(false)
    }
  }, [volume])

  const handleChange = (e, newValue) => {
    dispatch(actions.handleVolumeRequest(newValue))
  }

  const handleMute = () => {
    if (mute) {
      if (prevVolume) {
        dispatch(actions.handleVolumeRequest(prevVolume))
      } else {
        dispatch(actions.handleVolumeRequest(0.1))
      }
      setMute(false)
      setPrevVolume()
    } else {
      setPrevVolume(volume)
      dispatch(actions.handleVolumeRequest(0))
      setMute(true)
    }
  }
  const handleLike = (trackID) => {
    if (auth) {
      const data = {
        action: "like",
        action_against_id: trackID,
        ...payload
      }
      dispatch(actions.trackWiseLikeRequest(data))
    } else {
      handleLogin()
    }
  }

  const handleUnlike = (trackID) => {
    if (auth) {
      const data = {
        action: "like",
        object_id: userInfo.user_id,
        log: JSON.stringify({ log_added_by: userInfo.user_id })
      }
      dispatch(actions.trackWiseUnLikeRequest(data, trackID))
    } else {
      handleLogin()
    }
  }

  list1[0].label = userInfo.full_name
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          elevation={0}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          {is_admin ? <AdminHeader open={open} /> : <Header open={open} />}
        </AppBar>
        {!media && (
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: contextData.collapse === false || is_admin === 1,
              [classes.drawerClose]: contextData.collapse === true && is_admin === 0
            })}
            // style={{
            //   width:
            //     localStorage.getItem("sidebarCollapse") === "false"
            //       ? "240px !important"
            //       : "55px !important"
            // }}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: contextData.collapse === false || is_admin === 1,
                [classes.drawerClose]: contextData.collapse === true && is_admin === 0
              })
            }}
          >
            <div className={classes.toolbar}></div>
            {/* <Divider className={classes.topDivider} /> */}
            <div className={classes.drawerContainer}>
              <Box>
                {userInfo.is_admin === 1 ? (
                  <>
                    <h2 style={{ marginLeft: "32%" }}>Admin</h2>
                    <DrawerList
                      list={list4}
                      open={open}
                      hover={classes.hoverLink}
                      active={classes.activeLink}
                    />
                    <div className={classes.divider} />
                    <DrawerList
                      list={list6}
                      open={open}
                      hover={classes.hoverLink}
                      active={classes.activeLink}
                    />
                  </>
                ) : (
                  <>
                    <DrawerList
                      list={list7}
                      open={open}
                      hover={classes.hoverLink}
                      active={classes.activeLink}
                    />
                    {/* <DrawerList
                      list={list1}
                      open={open}
                      hover={classes.hoverLink}
                      active={classes.activeLink}
                    />
                    <div className={classes.divider} />
                    <DrawerList
                      list={list2}
                      open={open}
                      hover={classes.hoverLink}
                      active={classes.activeLink}
                    /> */}
                    <div
                      onClick={() => contextData?.isCollapsed(false)}
                      style={{
                        margin: "-15px -5px 0px -5px",
                        display: "flex",
                        padding: 16,
                        justifyContent: "space-between",
                        textAlign: "center"
                      }}
                    >
                      {/* <SvgInline src={"/media/volume.svg"} h="17px" w="18px" /> */}
                      {/* <>
                        {!mute ? (
                          <GiSpeaker
                            size={30}
                            color="#ffffff"
                            onClick={handleMute}
                            className="pointer"
                          />
                        ) : (
                          <GiSpeakerOff
                            size={30}
                            color="#ffffff"
                            onClick={handleMute}
                            className="pointer"
                          />
                        )}
                      </>
                      <Slider
                        value={volume}
                        step={0.1}
                        max={1}
                        min={0}
                        onChange={handleChange}
                        classes={{ root: classes.sliderClass }}
                      /> */}
                    </div>
                    {/* <div className={classes.divider} />
                    <DrawerList
                      list={list5}
                      open={open}
                      hover={classes.hoverLink}
                      active={classes.activeLink}
                    /> */}
                  </>
                )}
              </Box>
              <Box>
                {userInfo.is_admin === 0 ? (
                  <DrawerList
                    list={list8}
                    open={open}
                    hover={classes.hoverLink}
                    active={classes.activeLink}
                  />
                ) : null}

                {/* <div className={classes.divider} /> */}
                <Logout open={open} />
              </Box>
              {currentPlayingTrack && currentPlayingTrack.id && (
                <div className={classes.activeVocal}>
                  <div className={classes.activeVocalFlex}>
                    <h6 className={classes.activeVocalName}>
                      {allTracks[currentPlayingTrack.id - 1]?.track_name || "N/A"}
                    </h6>
                    <>
                      {heartFlag ? (
                        <ImHeart
                          className={classes.heartStyle}
                          fontSize="16px"
                          onClick={() => {
                            handleUnlike(currentPlayingTrack?.id - 1)
                            allTracks[currentPlayingTrack?.id - 1].liked = 0
                            setheartFlag(!!!heartFlag)
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          className={classes.heartStyle}
                          fontSize="16px"
                          onClick={() => {
                            handleLike(currentPlayingTrack?.id - 1)
                            allTracks[currentPlayingTrack?.id - 1].liked = 1
                            setheartFlag(!!!heartFlag)
                          }}
                        />
                      )}
                    </>
                    <Button
                      className={classes.btn}
                      onClick={() => handleCart(allTracks[currentPlayingTrack?.id - 1])}
                    >
                      <span style={{ color: "white", fontSize: "20px", marginTop: "10px" }}>
                        <FaShoppingCart />
                      </span>
                    </Button>
                  </div>

                  <p
                    style={{
                      margin: "0 !important",
                      padding: "0",
                      fontSize: "10px",
                      display: "block"
                    }}
                  >
                    {allTracks[currentPlayingTrack?.id - 1]?.user_details?.full_name || "N/A"}
                  </p>
                  <img
                    src={allTracks[currentPlayingTrack.id - 1]?.image_url}
                    alt="currently playing track pic"
                  />
                </div>
              )}
            </div>
          </Drawer>
        )}

        <main style={{ padding: "0px !important" }} className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>

      {media && (
        <div style={{ bottom: 0, width: "100%" }}>
          <SimpleBottomNavigation />
        </div>
      )}
    </>
  )
}
