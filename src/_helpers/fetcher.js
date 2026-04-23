import axios from "axios"
import { store } from "../redux/store"

export const POST = async (url, data, options) => {
  let headers = {
    "token": store.getState().auth.auth,
    ...options
  };
  return await axios.post(url, data, { headers: headers })
}

export const GET = async (url, options) => {
  let headers = {
    "token": store.getState().auth.auth,
    ...options
  };
  return await axios.get(url, { headers: headers })
}

export const PUT = async (url, data, options) => {
  let headers = {
    "token": store.getState().auth.auth,
    ...options
  };
  return await axios.put(url, data, { headers: headers })
}

export const DELETE = async (url, data, options) => {
  let headers = {
    "token": store.getState().auth.auth,
    ...options
  };
  return await axios.delete(url, data, { headers: headers })
}
