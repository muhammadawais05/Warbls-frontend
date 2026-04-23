import * as React from "react"
import { Container, makeStyles, styled } from "@material-ui/core"
import { compose, spacing, flexbox, palette, borders, sizing } from "@material-ui/system"
import clsx from "clsx"
import { actions } from "../../../redux/global/actions"
import { useDispatch, useSelector } from "react-redux"
import { sidebarDrawerContext } from "../../../app/App"
import { actions as trackActions } from "../../../redux/track/actions"
const CustomContainer = styled(Container)(compose(spacing, palette, flexbox, borders, sizing))

export const ContentContainer = ({
  children,
  title,
  titleLeft,
  titleBackground,
  gradient,
  profile,

  adminGradient
}) => {
  const {
    titleContainer,
    container,
    smallGradient,
    profileTitleContainer,
    sidebar_controls,
    adminHeader,
    control_image
  } = useStyles()

  var contextData = React.useContext(sidebarDrawerContext)
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const controlHandlers = (type) => {
    if (type === "left") {
      dispatch(trackActions.removePlayingVocal())
      contextData?.isCollapsed(true)
    } else if (type === "right") {
      contextData?.isCollapsed(false)
    }
  }

  const getHeadingMargin = () => {
    if (!!titleLeft) {
      return "2%"
    } else return "10%"
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        className={clsx(
          !profile && titleContainer,
          profile && profileTitleContainer,
          adminGradient && adminHeader
        )}
        style={{
          height: gradient ? "180px" : "110px",
          background: !!titleBackground
            ? titleBackground
            : "linear-gradient(to bottom, rgb(138,49,180) , rgb(255 255 255 / 0%))"
        }}
      >
        <div className={sidebar_controls}>
          {!userInfo.is_admin && userInfo.is_admin === 0 && (
            <div style={{ display: "flex", columnGap: "7px" }}>
              <div onClick={() => controlHandlers("left")}>
                <img
                  src={"/media/left-arrow.png"}
                  className={control_image}
                  width="16px"
                  height="18px"
                  alt="left-arrow img"
                />
              </div>
              <div onClick={() => controlHandlers("right")}>
                <img
                  src={"/media/right-arrow.png"}
                  className={control_image}
                  width="16px"
                  height="18px"
                  alt="right arrow img"
                />
              </div>
            </div>
          )}

          <h1
            className={clsx(profile && smallGradient)}
            style={{
              display: "block",
              bottom: gradient ? "65%" : "10%",
              left: getHeadingMargin()
              // padding: "0 50px"
            }}
          >
            {title}
          </h1>
        </div>
      </div>
      <CustomContainer
        className={container}
        style={{ margin: gradient ? "-90px 0 0 0" : "200 0 0 0" }}
      >
        {children}
      </CustomContainer>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    width: "100%",
    background: "#8A31B4",
    position: "relative",

    "& > h1": {
      display: "block",
      position: "absolute",
      margin: "0",
      fontSize: "xxx-large",

      [theme.breakpoints.down("md")]: {
        bottom: "80%",
        fontSize: "40px"
      },
      [theme.breakpoints.down("sm")]: {
        bottom: "84% !important",
        fontSize: "20px"
      }
      // transform:"translate(0,-50%)"
    }
  },
  sidebar_controls: {
    display: "flex",
    columnGap: "10px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    margin: "20px 20px 50px 80px"
  },
  control_image: {
    cursor: "pointer",
    backgroundColor: "rgb(102,102,102)",
    padding: "5px"
  },
  adminHeader: {
    "& > h1": {
      [theme.breakpoints.down("sm")]: {
        bottom: "25% !important",
        fontSize: "25px"
      }
    }
  },
  profileTitleContainer: {
    width: "100%",
    background: "#8A31B4",
    height: "100px",

    [theme.breakpoints.down("sm")]: {
      height: "50px !important",
      marginBottom: "0 ",
      background: "none !important"
    }
  },
  container: {
    display: "block",
    border: `1px solid transparent`,
    padding: "0",

    [theme.breakpoints.down("md")]: {
      marginTop: "-230px",
      marginBottom: 10
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "-250px !important",
      marginBottom: 10
    }
  },
  smallGradient: {
    paddingLeft: "30px",
    fontSize: "40px",
    bottom: "10%",
    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
      bottom: "30% !important"
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "0% !important"
    }

    // transform:"translate(0,-50%)"
  }
}))
