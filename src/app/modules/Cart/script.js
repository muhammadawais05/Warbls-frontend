import * as Yup from "yup"
import valid from 'card-validator';
export const formScript = [
  {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    label: "First Name",
    xs: 12,
    md: 6
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    label: "Last Name",
    xs: 12,
    md: 6
  },
  {
    name: "number",
    type: "text",
    placeholder: "Card Number",
    label: "Card Number",
    xs: 12,
    md: 12
  },
  {
    name: "month",
    type: "text",
    placeholder: "MM",
    label: "Expiration",
    xs: 12,
    md: 4
  },
  {
    name: "year",
    type: "text",
    placeholder: "YYYY",
    label: "",
    xs: 12,
    style: { marginTop: 20 },
    md: 4
  },
  {
    name: "cvc",
    type: "text",
    placeholder: "CVC",
    label: "Security Code",
    xs: 12,
    md: 4
  },
  {
    name: "country",
    type: "text",
    placeholder: "Country",
    label: "Country",
    xs: 12,
    md: 8
  },
  { name: "postalCode", type: "text", placeholder: "Postal Code", label: "Postal Code", xs: 12, md: 4 }
]
export const initValues = {
  firstName: "",
  lastName: "",
  number: "",
  month: "",
  year: "",
  cvc: "",
  country: "",
  postalCode: "",
}
export const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("First name is required"),
  number: Yup.string().required("Card number is required").test('test-number', // this is used internally by yup
    'Card number is invalid', //validation message
    value => valid.number(value).isValid),
  month: Yup.number().min(1).max(12).required("Expiration month is required"),
  year: Yup.number().min(new Date().getFullYear()).max(new Date().getFullYear()+25).required("Expiration year is required"),
  cvc: Yup.string().required("CVC/CVV is required").test('test-number', // this is used internally by yup
  'CVC/CVV number is invalid', //validation message
  value => valid.cvv(value).isValid),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal Code is required"),
})
export const conformationList = [
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: true
  },
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: true
  },
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: true
  },
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: true
  }
]

export const checkoutList = [
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: ""
  },
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: ""
  },
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: ""
  },
  {
    play: "",
    time: "",
    name: "",
    key: "",
    bpm: "",
    download: ""
  }
]
