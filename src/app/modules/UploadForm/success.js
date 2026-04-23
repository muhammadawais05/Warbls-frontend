import * as React from "react"
import { Box, Button, CircularProgress, makeStyles, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { InputField } from "../../../_warbls/components/Form/Input"
import { formScript, initValues } from "./script"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/artist/actions"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { schema } from "./schema"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { useParams } from "react-router"
import clsx from "clsx"
import { Link } from "react-router-dom"

export const UploadSuccess = (props) => {
  const {
    btn,
    input,
    labelClass,
    root,
    rootInner,
    textContainer,
    typo,
    bgContainer,
    browseVocals
  } = useStyles()

  return (
    <div className={root}>
      <StyledGrid className={rootInner} container>
        <StyledGrid item xs={12} sm={12} md={8} lg={6}>
          <Box className={textContainer} width="80%" marginLeft="auto" marginRight="auto">
            <StyledContainer p={0} my={0}>
              <Typography
                variant="h3"
                style={{ lineHeight: "80.59px", marginTop: "0px" }}
                className={labelClass}
              >
                Perfect!
              </Typography>
              <Typography variant="p" className={typo}>
                We appreciate your submission. After we have a taken a listen to your work we will
                get back to you. Because we need to have a certain quality on our vocals, some
                submissions will not get accepted.
                <br />
                <br />
                The most typically reason why we cant accept some artists is because they need to
                get a quality microphone and get better at mastering the vocal. We expect every
                vocal to be top quality.
                <br />
                <br />
                We usually take around 48 hours to go through the submissions
              </Typography>
            </StyledContainer>
            <StyledContainer p={0} my={0} mt={10}>
              <Link to="/vocals">
                <Typography
                  variant="p"
                  className={clsx(browseVocals)}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Browse <span className={"vocals"}>Vocals</span>
                </Typography>
              </Link>
            </StyledContainer>
          </Box>
        </StyledGrid>
        <StyledGrid className={bgContainer} item xs={12} md={4} sm={12} lg={6}></StyledGrid>
      </StyledGrid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  typo: {
    fontSize: "18px"
  },
  btn: {
    width: 180,
    borderRadius: 10,
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
    color: theme.palette.primary.main
  },
  labelClass: {
    // fontSize: 17,
    // fontWeight: "normal",
    color: theme.palette.primary.contrastText,
    margin: "0px"
  },
  browseVocals: {
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
    "& .vocals": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      padding: "0.25rem",
      borderRadius: "0.25rem"
    }
  },
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#333333"
  },
  rootInner: {
    width: "100%",
    height: "100%"
  },
  bgContainer: {
    background: `url(${toAbsoluteUrl("/media/jordan-conner.png")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  textContainer: {
    marginTop: "10rem",
    marginLeft: "5rem"
  }
}))
