import * as Types from "./types"

const initalStates = {
  loading: false,
  auth: false,
  admin: false,
  error: "",
  users: [],
  types: [],
  reports: [],
  userInfo: {},
  username: ""
}

export const authReducer = (state = initalStates, action) => {
  switch (action.type) {
    case Types.SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case Types.SIGNUP_USER_FAILED:
      return {
        ...state,
        loading: false
      }
    case Types.LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        auth: action.payload,
        username: action.username
      }
    case Types.LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        auth: false
      }

    case Types.LOGOUT_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case Types.USERS_REQUEST:
      return {
        ...state
      }

    case Types.USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      }

    case Types.USERS_FAILED:
      return {
        ...state
      }

    case Types.USER_TYPES_SUCCESS:
      return {
        ...state,
        types: action.payload
      }

    case Types.USER_REPORTS_SUCCESS:
      return {
        ...state,
        reports: action.payload
      }

    case Types.USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload
      }

    case Types.USER_UPDATE_SUCCESS:
      return {
        ...state,
        userInfo: action.payload
      }

    case Types.STOP_AUTH_LOADER:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
