import * as React from "react"
import { Box, makeStyles } from "@material-ui/core"
import { InputField } from "../../../_warbls/components/Form/Input"
import { formScript } from "./script"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/auth/actions"
import { BiUpload } from "react-icons/bi"

const { useRef } = React

export const RightSide = ({ formik }) => {
  const {
    rootWrapper,
    input,
    labelClass,
    inputFlex,
    bioField,
    borderBox,
    typo,
    coverBox,
    profileBox,
    fileInput,
    textarea,
    boxInner,
    mobileInputSwap
  } = useStyles()
  const [size, setSize] = React.useState([0, 0])
  //  listning for width to switch filters fot mobile screen and laptop
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  //const profileRef = useRef()
  const coverRef = useRef()

  const handleProfile = (e) => {
    const formdata = new FormData()
    formdata.append("files", e.target.files[0])
    dispatch(actions.userImageUpdateRequest(formdata, formik.values.user_id, "profile_image"))
  }

  const handleCover = (e) => {
    const formdata = new FormData()
    formdata.append("files", e.target.files[0])
    dispatch(actions.userImageUpdateRequest(formdata, formik.values.user_id, "cover_image"))
  }

  // const handleProfileRef = () => {
  //   profileRef.current.click()
  // }

  const handleCoverRef = () => {
    coverRef.current.click()
  }

  return (
    <Box className={rootWrapper}>
      <Box style={{ flex: "50%" }}>
        <br />
        <Box className={inputFlex}>
          <Box my={1} width="100%">
            <InputField
              label="Full name or artist name"
              placeholder=""
              name="full_name"
              type="text"
              formik={formik}
              hideLabel={size[0] < 600 ? true : false}
              classes={input}
              labelClass={labelClass}
              isLightTheme={true}
            />
          </Box>
          <Box my={1} width="100%">
            <InputField
              label="Password"
              placeholder="Password"
              name="password"
              type="text"
              formik={formik}
              hideLabel={size[0] < 600 ? true : false}
              classes={input}
              labelClass={labelClass}
              isLightTheme={true}
            />
          </Box>
        </Box>

        {/* <Box className={mobileInputSwap}> */}
        <Box my={1} width="100%" className={bioField}>
          <InputField
            label="Bio"
            placeholder="Bio"
            name="bio"
            type="textarea"
            formik={formik}
            hideLabel={size[0] < 600 ? true : false}
            classes={input}
            labelClass={labelClass}
            isLightTheme={true}
          />
        </Box>
      </Box>
      <Box
        py={{ sm: 2, md: 4 }}
        style={{
          flex: "50%",
          alignSelf: "center"
        }}
      >
        <Box py={2}>
          {/* <Box display="flex" flexDirection="column" alignItems="center" className={profileBox}>
          <Typography className={typo}>Profile photo</Typography>
          <Box
            p={8}
            bgcolor="#C4C4C4"
            onClick={handleProfileRef}
            borderRadius={10}
            width="90%"
            className={boxInner}
            style={{
              backgroundImage: `url(${userInfo?.profile_image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}
          >
            { !userInfo?.profile_image && <BiUpload size="2em"/> }
          </Box>
        </Box> */}
          <Box className={coverBox}>
            <Box
              p={8}
              bgcolor="#C4C4C4"
              onClick={handleCoverRef}
              borderRadius={10}
              width="90%"
              className={boxInner}
              style={{
                backgroundImage: `url(${userInfo?.cover_image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
              }}
            >
              {!userInfo?.cover_image && (
                <div style={{ display: "flex", columnGap: "1rem", alignItems: "center" }}>
                  <BiUpload size="2em" />
                  <p>Cover Image</p>
                </div>
              )}
            </Box>
          </Box>
        </Box>
        {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginLeft="auto"
        marginRight="auto"
      >
        <Typography className={typo}>Bio</Typography>
        <Box p={1} bgcolor="#ffffff" borderRadius={10} className={borderBox} width="100%">
          <textarea
            rows="8"
            name="bio"
            {...formik.getFieldProps("bio")}
            className={textarea}
            cols={54}
            defaultValue={userInfo?.bio || ""}
          ></textarea>
        </Box>
      </Box> */}
        {/* <input type="file" onChange={handleProfile} ref={profileRef} className={fileInput} /> */}
        <input type="file" onChange={handleCover} ref={coverRef} className={fileInput} />
      </Box>
      {/* </Box> */}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    display: "flex",
    width: "100%",
    columnGap: "2rem",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "90%",
      margin: "0 auto"
    }
  },
  input: {},
  inputFlex: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      columnGap: "1rem"
    }
  },

  labelClass: {
    fontSize: 17,
    fontWeight: "normal",
    // backgroundColor:theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  bioField: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      position: "relative",
      marginTop: "3rem"
    },
    "@media (max-width: 599px)": {
      marginTop: "7rem"
    }
  },
  borderBox: {
    border: "1px solid rgba(0, 0, 0, 0.6)",
    overflow: "hidden"
  },
  typo: {
    fontSize: 17,
    color: theme.palette.primary.contrastText,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  coverBox: {
    marginTop: "2rem",
    marginLeft: "30%",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0%",
      width: "110%",
      display: "block",
      position: "relative",
      marginTop: "-13rem"
    }
  },
  boxInner: {
    height: "3rem",
    padding: "30px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px"
  },
  mobileInputSwap: {
    border: "1px solid white"
  },
  profileBox: {
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "50%"
    }
  },
  bioBox: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    }
  },
  fileInput: {
    display: "none"
  },
  textarea: {
    resize: "none",
    border: "0px",
    "&:focus": {
      border: "0px",
      outline: "none",
      boxShadow: "none"
    }
  }
}))
