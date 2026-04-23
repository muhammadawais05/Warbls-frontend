import * as Yup from "yup"

export const schema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required").min(6, "must be 6 character")
})
