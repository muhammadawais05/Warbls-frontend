import * as Yup from "yup"

export const schema = Yup.object().shape({
  email: Yup.string().email("must be a valid string").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .min(6, "password must be greater than 7 characters"),
  // username: Yup.string()
  //   .required("user name is required")
  //   .min(4, "user name must be greater than 4 characters"),
  full_name: Yup.string().required("password is required")
})
