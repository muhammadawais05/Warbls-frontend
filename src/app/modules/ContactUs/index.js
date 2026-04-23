import * as React from "react"
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
  TextareaAutosize
} from "@material-ui/core"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
export const ContactUs = (props) => {
  const { btn, input, labelClass, root, rootInner, typo, socialIcon, socialLabel } = useStyles()

  return (
    <>
      <div className={root}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Box className={rootInner} marginLeft="auto" marginRight="auto">
            <Typography variant="p" className={typo}>
              Contact us
            </Typography>
            <Typography variant="h1" className={labelClass}>
              post@warbls.com
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="bottom"
          minHeight="10vh"
          textAlign="center"
        >
          <div>
            <div className={socialLabel}>Social</div>
            <a href={"javascript:void(0)"} className={socialIcon}>
              <img src={`${toAbsoluteUrl("/media/insta.svg")}`}></img>
            </a>
            <a href={"javascript:void(0)"} className={socialIcon}>
              <img src={`${toAbsoluteUrl("/media/facebook.svg")}`}></img>
            </a>
            <a href={"javascript:void(0)"} className={socialIcon}>
              <img src={`${toAbsoluteUrl("/media/twitter.svg")}`}></img>
            </a>
            <a href={"javascript:void(0)"} className={socialIcon}>
              <img src={`${toAbsoluteUrl("/media/youtube.svg")}`}></img>
            </a>
          </div>
        </Box>
      </div>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  typo: {
    fontSize: "18px"
  },
  socialIcon: {
    margin: "5px"
  },
  socialLabel: {
    marginBottom: "5px"
  },
  btn: {
    width: 180,
    borderRadius: "2px",
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    }
  },
  input: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    minHeight: "5rem",
    minWidth: "40rem"
  },
  labelClass: {
    fontSize: "3rem",
    // fontWeight: "normal",
    color: theme.palette.primary.contrastText,
    margin: "0px 2rem",
    "@media (max-width:600px)": {
      fontSize: "1.5rem"
    }
  },
  root: {
    background: `url(${toAbsoluteUrl("/media/triangle-shade.svg")})`,
    width: "100%",
    height: "95%",
    backgroundSize: "cover",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",

    backgroundPositionX: "-25rem",
    //backgroundColor: "#04080B",
    "@media (max-width:959px) and (min-width:450px)": {
      marginBottom: "50px"
    }
  },
  rootInner: {
    textAlign: "center"
    //marginTop: "10rem",
    //marginLeft: "10rem"
  }
}))
