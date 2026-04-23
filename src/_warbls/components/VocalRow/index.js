import React, { useState, useRef } from "react"
import { useHistory } from "react-router"
import { makeStyles, Button, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { Column } from "../Flex/Column"
import { Row } from "../Flex/Row"
import WaveFramer from "../TrackFramer/index"
import {
  FaCheck,
  FaRegArrowAltCircleDown,
  FaShoppingCart,
  FaRegHeart,
  FaDownload
} from "react-icons/fa"
import { ImHeart } from "react-icons/im"
import { SvgInline } from "../Svg"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/track/actions"
import { StyledGrid } from "../Container/StyledGrid"
import { height } from "@material-ui/system"
import { sidebarDrawerContext } from "../../../app/App"

export const VocalRow = ({
  rowList,
  index,
  setContainer,
  setCurrent,
  container,
  current,
  download,
  heart,
  handleDownload,
  handleLike,
  handleUnlike,
  handleCart,
  downloadCheck
}) => {
  const history = useHistory()
  const {
    priceTd,
    btn,
    helperText,
    btnCell,
    row,
    title,
    mucisTrack,
    downloadCell,
    heartStyle,
    desc,
    tracksControl,
    add_to_cart
  } = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down("sm"))
  const { auth, userInfo } = useSelector((state) => state.auth)
  var contextData = React.useContext(sidebarDrawerContext)
  const { tracks, likedTracks, dowloadedTracks, cart, loading } = useSelector(
    (state) => state.track
  )
  const dispatch = useDispatch()

  const [duration, setDuration] = useState("0:00")
  const [heartFlag, setheartFlag] = useState(rowList?.liked == 1)
  const [playVocal, isPlayVocal] = useState(null)
  const downloadRef = useRef(null)
  const priceRef = useRef(null)

  const generateDuration = (dur) => {
    const fixed = dur.toFixed(0)
    const val = fixed.split(".")[0]
    const mins = val > 60 ? (val / 60).toFixed(0) : 0
    const scnd = val > 60 ? val % 60 : val
    return `0${mins}:${scnd.toString().length === 2 ? scnd : "0" + scnd}`
  }
  const handleRemoveCart = (id) => {
    dispatch(actions.removeCartRequest(id))
  }

  const handlePlayCount = (id) => {
    if (auth) {
      const payload = {
        object_type: "user",
        object_id: userInfo.user_id,
        added_by: userInfo.user_id,
        action: "play",
        action_against_id: id
      }
      dispatch(actions.trackWisePlayRequest(payload))
    } else {
      return
    }
  }
  const [isHover, setIsHover] = useState(false)
  const [size, setSize] = useState([0, 0])

  //  listning for width to switch filters fot mobile screen and laptop
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // const playVocalOnRow = (e, row) => {
  //   e.preventDefault()
  //   isPlayVocal(null)
  //   // console.log(playVocal, rowList.track_id, e)
  //   if (downloadRef.current !== e.target && priceRef.current !== e.target) {
  //     console.log("before updation", row.track_id, playVocal)
  //     isPlayVocal(row.track_id)
  //     console.log("in handlePlay in VocalRow", row.track_id, playVocal)
  //   }
  // }

  console.log(console.log("outside handlePlay in VocalRow", playVocal))

  return (
    <tr
      style={{ userSelect: "none" }}
      className={row}
      // onClick={(e) => playVocalOnRow(e, rowList)}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
    >
      {/* <td>{rowList?.track_id}</td> */}
      {size[0] > 1280 && (
        <td>
          {isHover ? (
            <>
              {heartFlag ? (
                <ImHeart
                  className={heartStyle}
                  fontSize="16px"
                  onClick={() => {
                    handleUnlike(rowList?.track_id)
                    rowList.liked = 0
                    setheartFlag(!!!heartFlag)
                  }}
                />
              ) : (
                <FaRegHeart
                  className={heartStyle}
                  fontSize="16px"
                  onClick={() => {
                    handleLike(rowList?.track_id)
                    rowList.liked = 1
                    setheartFlag(!!!heartFlag)
                  }}
                />
              )}
            </>
          ) : (
            <Typography variant="body1"></Typography>
          )}
        </td>
      )}

      <td
        style={{
          width: "300px",
          display: size[0] < 1280 && "none",
          userSelect: "none"
        }}
      >
        {rowList?.track_url && (
          <WaveFramer
            index={index}
            generateDuration={generateDuration}
            song={rowList?.track_url}
            setContainer={setContainer}
            setCurrent={setCurrent}
            container={container}
            current={current}
            setDuration={setDuration}
            handlePlayCount={handlePlayCount}
            id={rowList.track_id}
            playVocal={playVocal}
          />
        )}
      </td>
      <td>
        <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: "10px" }}>
          {rowList?.image_url ? (
            <div style={{ position: "relative" }}>
              <img src={rowList?.image_url} className={mucisTrack} alt="music track img" />
              <div className={tracksControl}>
                {size[0] < 1280 && (
                  <WaveFramer
                    index={index}
                    generateDuration={generateDuration}
                    song={rowList?.track_url}
                    setContainer={setContainer}
                    setCurrent={setCurrent}
                    container={container}
                    current={current}
                    setDuration={setDuration}
                    handlePlayCount={handlePlayCount}
                    id={rowList.track_id}
                    playVocal={playVocal}
                  />
                )}
              </div>
            </div>
          ) : (
            <div style={{ position: "relative", border: "1px solid white" }}>
              <img
                src={toAbsoluteUrl("/media/music-track.png")}
                className={mucisTrack}
                alt="music track img"
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              marginLeft: "10px",
              width: size[0] > 1200 ? "400px" : "150px",
              paddingRight: "0px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {rowList?.track_name.substring(0, 40)}
            {rowList?.track_name.length > 40 ? "..." : ""}
            <small className={helperText}>
              {rowList?.user_details?.username ?? "test username"}
            </small>
          </div>
        </div>
        {/* <Row jc="center" ai='center' >
          {rowList?.image_url ? (
            <img src={rowList?.image_url} className={mucisTrack} alt="music track img" />
          ) : (
            <img
              src={toAbsoluteUrl("/media/music-track.png")}
              className={mucisTrack}
              alt="music track img"
            />
          )}
          <Typography variant="h6" className={title}>
            <span title={rowList?.track_name}>
              {rowList?.track_name}
            </span>
            <small className={helperText}>{rowList?.user_details?.username ?? "test username"}</small>
          </Typography>
        </Row> */}
      </td>
      {!media && size[0] > 1280 && (
        <td>
          <Typography variant="body1">{rowList?.key}</Typography>
        </td>
      )}
      {!media && size[0] > 1280 && (
        <td>
          <Typography variant="body1">{rowList?.bpm}</Typography>
        </td>
      )}
      {size[0] > 1280 && (
        <td style={{ whiteSpace: "nowrap", margin: "20px", display: "inline-block" }}>
          <span>{duration}</span>
        </td>
      )}
      {size[0] < 1280 && (
        <td style={{ width: "400px" }}>
          <>
            {heartFlag ? (
              <ImHeart
                className={heartStyle}
                fontSize="16px"
                onClick={() => {
                  handleUnlike(rowList?.track_id)
                  rowList.liked = 0
                  setheartFlag(!!!heartFlag)
                }}
              />
            ) : (
              <FaRegHeart
                className={heartStyle}
                fontSize="16px"
                onClick={() => {
                  handleLike(rowList?.track_id)
                  rowList.liked = 1
                  setheartFlag(!!!heartFlag)
                }}
              />
            )}
          </>
        </td>
      )}
      {/* <td  >
        ${rowList?.price}
      </td> */}
      <td className={download ? downloadCell : btnCell}>
        {/* {download || rowList?.download == 1 ? (

        ) : (
        <>
          {media ? (
            <SvgInline
              src={toAbsoluteUrl("/media/outline-card.svg")}
              onClick={() => handleCart(rowList)}
              w={20}
              h={20}
            />
          ) : (
            <>
              {cart.some((track) => track.track_id === rowList?.track_id) ? (
                <Button className={btn} onClick={() => handleRemoveCart(rowList.track_id)}>
                  <FaCheck
                    fontSize={20}
                    style={{ margin: "0 1rem 0 0" }}
                    color={theme.palette.success.main}
                  />
                  <Typography className={desc}>Remove </Typography>
                </Button>
              ) : ( */}
        {downloadCheck ? (
          <Button
            className={btn}
            onClick={() => handleDownload(rowList?.track_url, rowList?.track_id)}
          >
            <FaDownload fontSize={20} style={{ margin: "0 1rem 0 0" }} color="#FF00C7" />
            <Typography className={desc}>DOWNLOAD </Typography>
          </Button>
        ) : (
          <Button className={btn} onClick={() => handleCart(rowList)}>
            <p
              style={{
                padding: ".4rem 1rem",
                margin: "0",
                fontWeight: "bold",
                borderRight: "1px solid white"
              }}
              ref={priceRef}
            >
              ${rowList?.price}
            </p>
            <span className={add_to_cart} ref={downloadRef}>
              Add to cart
            </span>
          </Button>
        )}

        {/* )}
            </>
          )}
        </>
        )} */}
      </td>
    </tr>
  )
}

const useStyles = makeStyles((theme) => ({
  btn: {
    width: 220,
    backgroundColor: "#333333",
    color: theme.palette.primary.contrastText,

    padding: 0,
    nargin: 0,
    border: "1px solid white",
    "&:hover $cartIcon": {
      display: "block"
    }
  },
  cartIcon: {
    display: "none"
  },
  desc: {
    //fontWeight: "bold",
    color: theme.palette.primary.contrastText
  },
  helperText: {
    color: "#9F9F9F"
  },
  btnCell: {
    width: 260
  },
  downloadCell: {
    width: 50
  },
  row: {
    "&:hover": {
      backgroundColor: "#464646"
    },
    "& td": {
      textAlign: "center"
      // borderBottom: `1px solid ${theme.palette.secondary.main}`
    },
    "& td:first-child": {
      textAlign: "left",
      borderBottom: `0px solid ${theme.palette.secondary.main}`
    },
    "& td:last-child": {
      textAlign: "right",
      borderBottom: `0px solid ${theme.palette.secondary.main}`
    }
  },
  title: {
    display: "block",
    marginTop: "5px !important",
    fontSize: 17,
    border: "1px solid white",
    [theme.breakpoints.down("xl")]: {
      width: 300,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    "@media screen and (max-width:700px)": {
      width: "100px !important"
    },

    [theme.breakpoints.down("xs")]: {
      width: 120
    }
  },
  mucisTrack: {
    height: 40,
    marginTop: "5px",
    width: 40
  },
  tracksControl: {
    position: "absolute",
    top: "0",
    left: "0",
    height: 40,
    width: 40,
    marginLeft: 20
  },
  heartStyle: {
    cursor: "pointer"
  },
  add_to_cart: {
    padding: ".4rem 1rem .4rem 2rem",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "capitalize"
  }
}))

// <div
//   className="pointer"
//   onClick={() => handleDownload(rowList?.track_name, rowList?.track_id)}
// >
//   <FaRegArrowAltCircleDown fontSize="16px" color="#000000" />
// </div>

// <Row
//   jc="space-between"
//   p={1}
//   border={1}
//   borderColor={theme.palette.primary.contrastText}
//   borderRadius={5}
//   style={{ overflowWrap: "anywhere", cursor: "pointer", textAlign: "center", width:'100%', minWidth:'13rem' }}
//   mx={2}
// //onClick={() => handleRemoveCart(cart.track_id)}
// >
//   <FaCheck fontSize={20} style={{ margin: "0 0rem 0 0" }} color={theme.palette.success.main} />
//   <Typography className={desc} fontSize={30} style={{ margin: "0 0rem 0 0", fontSize: "40px", lineHeight: "0.4" }}>| </Typography>
//   <Typography className={desc} align='center'>DOWNLOAD </Typography>
// </Row>
