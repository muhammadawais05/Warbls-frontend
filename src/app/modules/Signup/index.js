import * as React from "react"
import { InputField } from "../../../_warbls/components/Form/Input"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { makeStyles, Box, Button, CircularProgress, Popover, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import { Column } from "../../../_warbls/components/Flex/Column"
import { schema } from "./schema"
import clsx from "clsx"
import { formScript, initValues } from "./script"
import { actions } from "../../../redux/auth/actions"
import { useDispatch, useSelector } from "react-redux"
import { red } from "@material-ui/core/colors"
import { Cancel, CheckCircle } from "@material-ui/icons"
export const Signup = ({ handleLogin, handleSignup }) => {
  const { button, login, policy, btn, disabled, inputTextClass } = useStyles()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const [errors, setErrors] = React.useState(null)
  const [emailEl, setEmailEl] = React.useState(null)
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        actions.signupRequest(
          { ...values, username: values.email },
          handleSignup,
          resetForm,
          setErrors
        )
      )
      // if (!loading) {
      //   handleSignup()
      //   resetForm()
      // }
    }
  })

  const handleAlreadyMember = () => {
    handleSignup()
    handleLogin()
  }
  if (errors && errors == "email already exists" && !!!emailEl) {
    setEmailEl(document.getElementsByName("email")[0])
  }

  return (
    <Column width="100%" jc="cenetr" ai="center">
      <Box my={1}>
        <img height="65px" src={toAbsoluteUrl("/media/logo-sm-white.png")} alt="logo" />
      </Box>
      {errors && errors != "email already exists" && (
        <Box my={0}>
          {" "}
          <p style={{ color: "red" }}>{errors}</p>{" "}
        </Box>
      )}
      {formScript.map((field, index) => (
        <InputField
          key={index}
          placeholder={field.placeholder}
          name={field.name}
          type={field.type}
          formik={formik}
          label={field.label}
          classes={inputTextClass}
          isLightTheme={true}
          rootStyle={{
            margin: "1px 0px"
          }}
          inputIcon={
            errors &&
            errors == "email already exists" &&
            (field.name == "email" ? (
              <Cancel style={{ color: "red" }}></Cancel>
            ) : (
              <CheckCircle style={{ color: "#4caf50" }}></CheckCircle>
            ))
          }
        />
      ))}
      <Popover
        id="popover"
        open={Boolean(emailEl)}
        anchorEl={emailEl}
        //onClick={() => { debugger;setEmailEl(null) }}
        onClose={() => {
          setErrors(null)
          setEmailEl(null)
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
      >
        <Box my={2} mx={1}>
          {" "}
          <p> Email already exists </p>{" "}
        </Box>
      </Popover>
      <Box my={2} width="100%" display="flex" justifyContent="flex-start" alignItems="center">
        {/* <input type="checkbox" /> */}
        <p className={clsx("m-0", policy)}>
          By Selecting "Sign Up" you can confirm that you have read and agree to Warbls terms of
          use.
        </p>
      </Box>
      <Box my={2} width="100%">
        <Button
          className={clsx(button, btn, !formik.isValid && disabled)}
          disabled={!formik.isValid}
          onClick={formik.handleSubmit}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Sign Up"}
        </Button>
      </Box>
      <Box my={2} width="100%" display="flex" justifyContent="center" alignItems="center">
        <p className={clsx("m-0", policy)}>Already a member?&nbsp;&nbsp;</p>
        <Button className={clsx(login, btn)} onClick={handleAlreadyMember}>
          Log in
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
    //backgroundColor: theme.palette.primary.contrastText,
    //color: theme.palette.primary.main,
  },
  button: {
    backgroundColor: theme.palette.success.main,
    color: "#202020",
    width: "100%",
    height: 37,
    "&:hover": {
      color: "#ffffff",
      backgroundColor: theme.palette.primary.main
    }
  },
  login: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    height: 30,
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    }
  },
  policy: {
    color: theme.palette.primary.contrastText,
    fontWeight: "normal",
    fontSize: 13
  },
  btn: {
    borderRadius: 5,
    textTransform: "none",
    padding: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    fontWeight: 700
  },
  disabled: {
    color: "#828282",
    backgroundColor: "#A9A9A9"
  }
}))
