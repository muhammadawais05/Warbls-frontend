import React, { useEffect } from "react"
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
  TextareaAutosize
} from "@material-ui/core"
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
import { UploadSuccess } from "./success"
import axios from "axios"

export const UploadForm = (props) => {
  const { btn, input, labelClass, root, rootInner, typo } = useStyles()
  const { loading } = useSelector((state) => state.artist)
  const { userInfo } = useSelector((state) => state.auth)
  const { singleArtist } = useSelector((state) => state.artist)

  const [isSuccess, setIsSuccess] = React.useState(false)

  const { message } = useParams()
  const [formData, setFormData] = React.useState({
    previous_work: "",
    sm_link: "",
    genre: "",
    vocals: "",
    platform_link: ""
  })

  useEffect(() => {
    dispatch(actions.getSingleArtistRequest())
  }, [])

  let formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log("submit handler values", values)
      dispatch(actions.createArtistRequest(values))
      // let path = `profile`;
      // props.history.push(path);
    }
  })

  useEffect(() => {
    let artist = singleArtist?.results?.length > 0 ? singleArtist?.results[0] : {}

    setFormData({
      platform_link: artist?.platform_link || "",
      vocals: artist?.vocals || "",
      previous_work: artist?.previous_work || "",
      genre: artist?.genre || "",
      sm_link: artist?.sm_link || ""
    })
  }, [singleArtist])

  const dispatch = useDispatch()

  useEffect(() => {
    setIsSuccess(message == "success")
  }, [message])

  return (
    <>
      {isSuccess ? (
        <UploadSuccess />
      ) : (
        <div className={root}>
          <StyledGrid container>
            <StyledGrid item xs={12} sm={12} md={6}>
              <Box className={rootInner} width="88%" marginLeft="auto" marginRight="auto">
                <StyledContainer p={0} my={0}>
                  <Typography variant="h3" style={{ lineHeight: "80.59px" }} className={labelClass}>
                    Hey!
                  </Typography>
                  <Typography variant="p" className={typo}>
                    Thank you for your interest in becoming an artist on Warbls. Before we can give
                    you upload access we need to get to know you a little better.
                  </Typography>
                </StyledContainer>
                <br />
                <StyledContainer p={0}>
                  {formScript.map((field, index) => (
                    <Box my={1} width="100%" key={index}>
                      <InputField
                        label={field.label}
                        placeholder={field.placeholder}
                        name={field.name}
                        type={field.type}
                        formik={formik}
                        classes={input}
                        labelClass={labelClass}
                        style={{ borderRadius: "2px" }}
                        isLightTheme={true}
                      />
                    </Box>
                  ))}
                  <Box my={2} width="100%" textAlign="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={formik.handleSubmit}
                      className={btn}
                      disableElevation
                      disabled={singleArtist?.results?.length > 0 ? true : false}
                    >
                      Submit
                    </Button>
                  </Box>
                  {/* <Box my={2} width="100%">
                    <Box width="70%" marginLeft="auto" marginRight="auto" textAlign="center">
                      <Typography variant="h6" className={labelClass}>
                        Thank you for your request, we will update you in 24 hours
                      </Typography>
                    </Box>
                  </Box> */}
                </StyledContainer>
              </Box>
            </StyledGrid>
            <StyledGrid item xs={12} md={6} sm={12}></StyledGrid>
          </StyledGrid>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  typo: {
    fontSize: "18px"
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
    //minHeight: "5rem",
    // minWidth: "40rem",
  },
  labelClass: {
    // fontSize: 17,
    // fontWeight: "normal",
    color: theme.palette.primary.contrastText,
    margin: "0px"
  },
  root: {
    background: `url(${toAbsoluteUrl("/media/microphone_with_condensor.png")})`,
    width: "100%",
    height: "100%",
    backgroundSize: "contain",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#04080B"
  },
  rootInner: {
    marginTop: "10rem",
    marginLeft: "10rem"
  }
}))
