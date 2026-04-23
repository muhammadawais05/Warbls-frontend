import { Typography, Button, makeStyles } from "@material-ui/core"
import { useFormik } from "formik"
import * as React from "react"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { Row } from "../../../_warbls/components/Flex/Row"
import { Column } from "../../../_warbls/components/Flex/Column"
import { InputField } from "../../../_warbls/components/Form/Input"
import { formScript, initValues, schema } from "./script"
import { ThanksVocalRow } from "../../../_warbls/components/VocalRow/ThanksVocalRow"
import { useSelector, useDispatch } from "react-redux"
import { POST } from "../../../_helpers/fetcher"
import { APIs } from "../../../_helpers/apis"
import cogoToast from "cogo-toast"
import { actions } from "../../../redux/track/actions"
export const Checkout = (props) => {
  const { handleNext } = props
  const { cardStyle, labelClass, inputClass, head, subHead, submitBtn, total, mul, InputRoot } =
    useStyles()
  const { cart } = useSelector((state) => state.track)
  const { userInfo, auth } = useSelector((state) => state.auth)
  const [IsSubmitting, setIsSubmitting] = React.useState(false)

  const cart_sum = cart
    .reduce(function (r, a) {
      return r + parseFloat(a["price"])
    }, 0)
    .toFixed(2)

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      if (IsSubmitting) return

      let body = {
        ...values,
        name: values.firstName + " " + values.lastName,
        amount: cart_sum * 100,
        user_id: userInfo.user_id,
        track_ids: cart.map((obj) => obj.track_id)
      }

      setIsSubmitting(true)
      let res = await POST(APIs.checkout, body)
      if (!res?.error !== false) {
        handleNext()
      } else {
        console.log(res?.error?.message)
        cogoToast.error("Card expiration date is invalid")
      }
      setIsSubmitting(false)

      //dispatch(actions.signupRequest(values, handleSignup, resetForm))
      // if (!loading) {
      //   handleSignup()
      //   resetForm()
      // }
    }
  })

  return (
    <>
      <StyledContainer p={0} height="70vh">
        <StyledGrid container spacing={3}>
          <StyledGrid item xs={12} md={6}>
            <Typography variant="h3" className={head}>
              Billing Information
            </Typography>
            <Row mb={3}>
              <Row>
                <span style={{ marginTop: "25%" }}>
                  <input type="radio" name="paymentMethod" checked={true} />
                </span>
                <img
                  src={
                    "https://www.pngitem.com/pimgs/m/5-55320_visa-mastercard-american-express-discover-logo-png-transparent.png"
                  }
                  alt=""
                  className={cardStyle}
                />
              </Row>
            </Row>
            <StyledGrid container spacing={1}>
              {formScript.map((field, index) => (
                <StyledGrid item xs={field.xs} md={field.md} key={index} className={InputRoot}>
                  <InputField
                    placeholder={field.placeholder}
                    name={field.name}
                    type={field.type}
                    formik={formik}
                    label={field.label}
                    style={{ ...field.style }}
                    classes={inputClass}
                    labelClass={labelClass}
                    isLightTheme={true}
                  />
                </StyledGrid>
              ))}
              <StyledGrid>
                <Button className={submitBtn} onClick={formik.handleSubmit}>
                  {!IsSubmitting ? "Submit" : "Please wait ..."}
                </Button>
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
          <StyledGrid item xs={12} md={6}>
            <Row jc="center">
              <Typography variant="h6">Total Price</Typography>
            </Row>
            <Row jc="center">
              <Typography variant="h3">${cart_sum}</Typography>
            </Row>
            <Column
              // border={1}
              //borderColor="rgba(0, 0, 0, 0.1)"
              //bgcolor="#F5F5F5"
              py={0}
              px={3}
              ai="center"
            >
              <Row my={8}>
                <ThanksVocalRow tracks={cart} />
                {/* <table>
                  <tbody>
                    {cart.map((l, index) => (
                      <ThanksVocalRow rowList={cart} key={index} width="500px" />
                    ))}
                  </tbody>
                </table> */}
              </Row>
            </Column>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    width: 150,
    height: "auto",
    margin: "0px 2px",
    borderRadius: 3
  },
  inputClass: {
    backgroundColor: "transparent",
    border: "1px solid lightgray",
    borderRadius: 4,
    width: "100%"
  },
  labelClass: {
    fontWeight: "bold",
    marginLeft: 0
  },
  head: {
    fontWeight: "bold",
    marginBottom: "1.5rem"
  },
  subHead: {
    fontWeight: "bold",
    margin: "15px 0px 10px 0px"
  },
  submitBtn: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
    padding: "10px 25px",
    borderRadius: 5,
    marginTop: 10,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.primary.contrastText
    }
  },
  total: {
    textDecoration: "underline"
  },
  mul: {
    fontSize: 16
  },
  InputRoot: {
    "& .MuiBox-root": {
      margin: "0px 0px"
    }
  }
}))
