import React, { useContext, useEffect } from "react"
import { Box, Button, makeStyles, Typography, CircularProgress } from "@material-ui/core"
import { InputField } from "../../../_warbls/components/Form/Input"
import { Column } from "../../../_warbls/components/Flex/Column"
import { useFormik } from "formik"
import { schema } from "./schema"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { Link } from "react-router-dom"
import { formScript, initValues } from "./script"
import { actions } from "../../../redux/auth/actions"
import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx"
import { APIs } from "../../../_helpers/apis"
import cogoToast from "cogo-toast"
import axios from "axios"
import { useHistory, useLocation } from "react-router"
import { AppContext } from "../../../_warbls/providers/AppProvider"

export const ResetPassword = (props) => {
  const { button, btn, inputTextClass, root } = useStyles()
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.auth)
  const history = useHistory()
  const { closeLogin } = useContext(AppContext)
  const location = useLocation()

  useEffect(() => {
    closeLogin()
  }, [])

  useEffect(() => {
    const user = users.some(
      (user) =>
        user.reset_password_hash ===
        location.pathname.split("/")[location.pathname.split("/").length - 1]
    )

    console.log("user is", user)
    if (!user) {
      cogoToast.error("Invalid link")
      history.push("/")
    }
  }, [location.pathname, users])

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: async ({ password, confirmPassword }, { resetForm }) => {
      const user = users.find(
        (user) =>
          user.reset_password_hash ===
          location.pathname.split("/")[location.pathname.split("/").length - 1]
      )

      if (password !== confirmPassword) {
        cogoToast.error("Passwords should match each other")
        return
      }

      const payload = {
        password,
        log: JSON.stringify({ log_added_by: "1" })
      }

      axios
        .put(APIs.updateUser + `${user?.user_id}`, payload)
        .then(({ data }) => {
          cogoToast.success("Password reset successfully")
          history.push("/")
        })
        .catch((err) => {
          cogoToast.error("Error during password resetting", err)
        })
    }
  })

  return (
    <Column className={root}>
      <Box my={1}>
        <img height="65px" src={toAbsoluteUrl("/media/logo-sm-white.png")} alt="logo" />
      </Box>
      {formScript.map((field, index) => (
        <Box my={0} width="100%" key={index}>
          <InputField
            key={index}
            placeholder={field.placeholder}
            name={field.name}
            type={field.type}
            formik={formik}
            classes={inputTextClass}
            isLightTheme={true}
            rootStyle={{
              margin: "0.5rem 0px"
            }}
          />
        </Box>
      ))}
      <Box my={2} width="100%">
        <Button className={clsx(button, btn)} onClick={formik.handleSubmit}>
          {loading ? <CircularProgress size={20} color="inherit" /> : "Reset Password"}
        </Button>
      </Box>
    </Column>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    margin: "0 auto",
    height: "92vh",

    "@media (max-width:900px) ": {
      width: "50%"
    },

    "@media (max-width:600px) ": {
      width: "80%"
    }
  },
  inputTextClass: {
    backgroundColor: "transparent",
    color: theme.palette.primary.main
  },
  button: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
    width: "100%",
    height: 37,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  forgot: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    color: theme.palette.primary.contrastText,
    textDecoration: "none"
  },
  createButton: {
    backgroundColor: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
    color: "#000000",
    height: 37,
    width: "100%",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400"
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
    height: 2,
    width: "100%",
    margin: "10px 0px"
  },
  btn: {
    borderRadius: 5,
    textTransform: "none",
    paddingLeft: 20,
    paddingRight: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18
  },
  dontHfay: {
    color: theme.palette.primary.contrastText
  }
}))
