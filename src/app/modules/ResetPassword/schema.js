import * as Yup from "yup"

export const schema = Yup.object().shape({
  password: Yup.string().required("password is required").min(6, "must be 6 character"),
  confirmPassword: Yup.string()
    .required("confirm password is required")
    .min(6, "must be 6 character")
})
