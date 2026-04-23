import * as React from "react"
import {
  InputBase,
  makeStyles,
  TextareaAutosize,
  useTheme,
  InputAdornment
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import clsx from "clsx"
import { Column } from "../../Flex/Column"

export const InputField = (props) => {
  const { root, errMsg, inputLabel, textareaClass, hideInputLabel } = useStyles()
  const {
    classes,
    placeholder,
    name,
    type,
    formik,
    label,
    labelClass,
    style,
    disabled,
    onChange,
    isLightTheme,
    rootStyle,
    hideLabel,
    inputIcon
  } = props
  const theme = useTheme()
  return (
    <Column
      width="100%"
      my={2}
      style={{
        ...rootStyle
      }}
    >
      {(label || label === "") && (
        <label
          className={clsx(
            inputLabel,
            labelClass,
            hideLabel && hideLabel === true && hideInputLabel
          )}
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder={placeholder}
          style={{
            ...style,
            backgroundColor: !!isLightTheme ? theme.palette.primary.contrastText : "",
            color: !!isLightTheme ? theme.palette.primary.main : theme.palette.primary.contrastText
          }}
          className={clsx(root, textareaClass, classes)}
          name={name}
          disabled={!!disabled}
          onChangeCapture={props.onChange}
          {...formik.getFieldProps(name)}
        />
      ) : (
        <InputBase
          className={clsx(root, classes)}
          style={{
            ...style,
            backgroundColor: !!isLightTheme ? theme.palette.primary.contrastText : "",
            color: !!isLightTheme ? theme.palette.primary.main : theme.palette.primary.contrastText
          }}
          //style={style}
          placeholder={placeholder}
          type={type}
          name={name}
          disabled={!!disabled}
          onChangeCapture={props.onChange}
          {...formik.getFieldProps(name)}
          endAdornment={
            inputIcon && (
              <InputAdornment position="end">
                {inputIcon}
                {/* <AccountCircle style={{color:"red"}} /> */}
              </InputAdornment>
            )
          }
        />
      )}

      {formik.touched[name] && formik.errors[name] && (
        <small className={clsx("error", errMsg)}>{formik.errors[name]}</small>
      )}
    </Column>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    //background: "#EBEBEB000",
    border: "1px solid " + theme.palette.primary.contrastText,
    color: theme.palette.primary.contrastText,
    borderRadius: 5,
    width: "100%",
    padding: "5px 10px"
  },
  textareaClass: {
    minHeight: "5rem"
  },
  errMsg: {
    margin: "5px 0px"
  },
  inputLabel: {
    fontWeight: 400,
    fontStyle: "normal",
    size: 12,
    margin: "5px 0px",
    marginLeft: 0
  },
  hideInputLabel: {
    display: "none"
  }
}))
