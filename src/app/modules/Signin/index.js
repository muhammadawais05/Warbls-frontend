import * as React from "react"
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
import md5 from "md5"
import { POST } from "../../../_helpers/fetcher"
import { APIs } from "../../../_helpers/apis"
import cogoToast from "cogo-toast"

export const Signin = ({ handleLogin, handleSignup }) => {
  const { button, forgot, createButton, divider, btn, dontHfay, inputTextClass } = useStyles()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(actions.loginRequest(values))
        const password = md5(values.password)
        const { data } = await POST(APIs.signin, { ...values, password })

        if (!data) {
          dispatch(actions.loginFailed())
          cogoToast.error("Wrong Email/Password")
          return
        } else {
          resetForm()
          handleLogin()
          dispatch(actions.loginSuccess(data, values.username))
        }
      } catch (err) {
        dispatch(actions.loginFailed())
      }
      // "e10adc3949ba59abbe56e057f20f883e"e10adc3949ba59abbe56e057f20f883e
      // dispatch(actions.loginRequest(values))
    }
  })

  const handleNew = () => {
    handleLogin()
    handleSignup()
  }

  return (
    <Column width="100%" jc="cenetr" ai="center">
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
          {loading ? <CircularProgress size={20} color="inherit" /> : "Log in"}
        </Button>
      </Box>
      <Box my={2} width="100%" textAlign="center">
        <Link to="/forgot" className={forgot} href="#">
          Forgot your password?
        </Link>
      </Box>
      <div className={divider} />
      <Box my={1} textAlign="left" width="100%">
        <Typography className={dontHfay}>Dont have an free account yet?</Typography>
      </Box>
      <Box my={1} width="100%">
        <Button className={clsx(createButton, btn)} onClick={handleNew}>
          Create your account
        </Button>
      </Box>
    </Column>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 37
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
