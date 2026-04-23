import { ContentContainer } from "../../../_warbls/components/Container"
import * as React from "react"
import { Box, makeStyles, Typography, Button } from "@material-ui/core"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { RightSide } from "./info"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/auth/actions"
import { useFormik } from "formik"
import clsx from "clsx"
import { initValues } from "./script"
import cogoToast from "cogo-toast"

const { useEffect } = React

export const Profile = (props) => {
  const { bg, success, danger, profileRoot, info, saveBtnContainer, saveBtn } = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  userInfo.password = ""
  const formik = useFormik({
    initialValues: Object.assign(initValues, userInfo),
    onSubmit: (values) => {
      dispatch(actions.userUpdateRequest(values, values.user_id))
    }
  })

  useEffect(() => {
    //dispatch(actions.userInfoRequest())
    // dispatch(actions.usersRequest())
    dispatch(actions.userReportsRequest())
    dispatch(actions.userTypesRequest())
    // dispatch(actions.userUpdateRequest({ username: "vickey", log: { log_added_by: "1" } }))
  }, [])

  const handleRemoveAccount = () => {
    const id = userInfo.user_id
    dispatch(actions.removeAccountRequest({ is_suspended: 1 }, id, true))
  }
  const handleChangePassword = () => {
    if (!!formik.values.password) {
      const id = userInfo.user_id
      dispatch(actions.userUpdateRequest({ password: formik.values.password }, id, true))
    } else {
      cogoToast.warn("Please enter password first.")
    }
  }
  return (
    <ContentContainer
      titleLeft="25px"
      type="profile"
      titleBackground="linear-gradient(to right,#3A5B5D , #89BABD, #5E8A8D )"
      title={"Profile"}
      profile={true}
    >
      <Box style={{ padding: "0 25px" }} pt={0} className={profileRoot}>
        <StyledContainer p={0}>
          <Typography variant="h6" style={{ color: "#B9B9B9", marginTop: "1rem" }}>
            {userInfo.username}
          </Typography>
        </StyledContainer>
        <StyledContainer className={bg} m={0} p={0} minHeight="70vh">
          <StyledGrid xs={12} md={12} sm={12}>
            <Box width="100%">
              <RightSide formik={formik} />
            </Box>
          </StyledGrid>

          <StyledGrid item xs={12} pl={0}>
            {/* <Box mt={{ sm: 3, md: 7 }}></Box> */}
            <StyledGrid container>
              <StyledGrid item xs={12} sm={12} md={3} lg={3} className={saveBtnContainer}>
                <Button
                  className={saveBtn}
                  variant="contained"
                  color="primary"
                  onClick={formik.handleSubmit}
                >
                  Save Details
                </Button>
              </StyledGrid>
              <StyledGrid xs={12} sm={12} md={6} lg={6} mt={5}>
                <Box py={1}>
                  <Typography
                    className={clsx(success, "pointer")}
                    onClick={() => {
                      let path = `upload-form`
                      props.history.push(path)
                    }}
                  >
                    Request Upload Access
                  </Typography>
                </Box>
                <Box py={1}>
                  <Typography className={clsx(info, "pointer")} onClick={handleChangePassword}>
                    Change Password
                  </Typography>
                </Box>
              </StyledGrid>
              <StyledGrid item xs={12} sm={12} md={3} lg={3}>
                <Box py={1}>
                  <Typography className={clsx(danger, "pointer")} onClick={handleRemoveAccount}>
                    Delete Warbls account
                  </Typography>
                </Box>
              </StyledGrid>
            </StyledGrid>
            {/* <Box py={1}>
                <Typography className={clsx(success, "pointer")} onClick={formik.handleSubmit}>
                  Update Profile
                </Typography>
              </Box> */}
          </StyledGrid>
        </StyledContainer>
      </Box>
    </ContentContainer>
  )
}

const useStyles = makeStyles((theme) => ({
  bg: {
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  success: {
    color: "#31E921",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center"
  },
  info: {
    color: "#31DAFF",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center"
  },
  danger: {
    color: "#FF0000",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center"
  },
  profileRoot: {
    width: "100%",
    minHeight: "90vh",
    marginBottom: 20,
    [theme.breakpoints.down("md")]: {
      marginTop: "0rem"
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "17rem",
      marginBottom: 50
    }
  },
  saveBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start"
  },
  saveBtn: {
    background: "#EFEFEF",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "black"
  }
}))
