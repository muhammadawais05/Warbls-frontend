import * as Types from "./types"

const initState = {
  appToken: "",
  loginPopup: true,
  signupPopup: false,
  sidebarMenu: true // close by default
}

export const globalReducer = (state = initState, action) => {
  switch (action.Type) {
    case Types.GET_OAUTH_SUCCESS:
      return {
        ...state,
        appToken: action.payload
      }

    case Types.OPEN_LOGIN_SUCCESS:
      return {
        ...state,
        loginPopup: true
      }

    case Types.CLOSE_LOGIN_SUCCESS:
      return {
        ...state,
        loginPopup: false
      }

    case Types.SIDEBAR_REQUEST:
      return {
        ...state,
        sidebarMenu: action.payload
      }

    case Types.OPEN_SIGNUP_SUCCESS:
      return {
        ...state,
        signupPopup: true
      }

    case Types.CLOSE_SIGNUP_SUCCESS:
      return {
        ...state,
        signupPopup: false
      }

    default:
      return state
  }
}
