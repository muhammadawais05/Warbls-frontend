import cogoToast from "cogo-toast"

export function generateError(e) {
  if (e?.response) {
    cogoToast.error(e.response.data)
  } else {
    cogoToast.error(e.message)
  }
}
