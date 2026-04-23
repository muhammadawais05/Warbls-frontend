import * as Yup from "yup"

export const schema = Yup.object().shape({
  previous_work: Yup.string().required("this field is required"),
  //sm_link: Yup.string().required("this field is required"),
 // genre: Yup.string().required("this field is required"),
  vocals: Yup.string().required("this field is required"),
  platform_link: Yup.string().required("this field is required")
})
