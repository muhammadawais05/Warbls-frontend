import axios from "axios"
import cogoToast from "cogo-toast"
import { store } from "../redux/store"
export function interceptor() {
  axios.interceptors.request.use((request) => {
    request["Access-Control-Allow-Origin"] = "*"
    return request
  })

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      let status
      let err
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        status = error.response.status
        err = error.response.data
      } else {
        // Something happened in setting up the request that triggered an Error
      }
      switch (status) {
        case 400:
          cogoToast.error("bad request, unable to process your request. " + err)
          break
        case 500:
          cogoToast.error("Internal Server Error. " + err)
          break
        case 401:
          cogoToast.error("Unauthorized.")
          break
        case 504:
          cogoToast.error("Request Timeout. " + err)
          break
        case 507:
          cogoToast.error("Insufficient Storage. " + err)
          break
        default:
        //cogoToast.error("something went wrong! try again. " + err)
      }

      return { error: true, message: err }
    }
  )
}
