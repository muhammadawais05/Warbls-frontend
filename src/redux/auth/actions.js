import * as Types from "./types"

export const actions = {
  /** signup actions */
  signupRequest: (payload, signup, reset, setErrors) => ({
    type: Types.SIGNUP_USER_REQUEST,
    payload,
    signup,
    reset,
    setErrors
  }),
  signupSuccess: () => ({ type: Types.SIGNUP_USER_SUCCESS }),
  signupFailed: (payload) => ({ type: Types.SIGNUP_USER_FAILED, payload }),

  /** login actions */
  loginRequest: (payload) => {
    return { type: Types.LOGIN_USER_REQUEST, payload }
  },
  loginSuccess: (payload, username) => ({ type: Types.LOGIN_USER_SUCCESS, payload, username }),
  loginFailed: () => ({ type: Types.LOGIN_USER_FAILED }),

  /** login actions */
  userInfoRequest: () => ({ type: Types.USER_INFO_REQUEST }),
  userInfoSuccess: (payload) => ({ type: Types.USER_INFO_SUCCESS, payload }),
  userInfoFailed: () => ({ type: Types.USER_INFO_FAILED }),

  /** signout actions */
  logoutRequest: (payload) => ({ type: Types.LOGOUT_USER_REQUEST, payload }),
  logoutSuccess: (payload) => ({ type: Types.LOGOUT_USER_SUCCESS, payload }),
  logoutFailed: (payload) => ({ type: Types.LOGOUT_USER_FAILED, payload }),

  /** all users */
  usersRequest: () => ({ type: Types.USERS_REQUEST }),
  usersSuccess: (payload) => ({ type: Types.USERS_SUCCESS, payload }),
  usersFailed: () => ({ type: Types.USERS_FAILED }),

  /** user reports */
  userReportsRequest: () => ({ type: Types.USER_REPORTS_REQUEST }),
  userReportsSuccess: (payload) => ({ type: Types.USER_REPORTS_SUCCESS, payload }),
  userReportsFailed: () => ({ type: Types.USER_REPORTS_FAILED }),

  /** user reports */
  userTypesRequest: () => ({ type: Types.USER_TYPES_REQUEST }),
  userTypesSuccess: (payload) => ({ type: Types.USER_TYPES_SUCCESS, payload }),
  userTypesFailed: () => ({ type: Types.USER_TYPES_FAILED }),

  /** user */
  userUpdateRequest: (payload, id) => ({ type: Types.USER_UPDATE_REQUEST, payload, id }),
  userUpdateSuccess: (payload) => ({ type: Types.USER_UPDATE_SUCCESS, payload }),
  userUpdateFailed: () => ({ type: Types.USER_UPDATE_FAILED }),

  /** user */
  userImageUpdateRequest: (payload, id, key, values) => ({
    type: Types.USER_IMAGE_UPDATE_REQUEST,
    payload,
    id,
    key,
    values
  }),
  userImageUpdateSuccess: (payload) => ({ type: Types.USER_IMAGE_UPDATE_SUCCESS, payload }),
  userImageUpdateFailed: () => ({ type: Types.USER_IMAGE_UPDATE_FAILED }),

  /** remove account */
  removeAccountRequest: (payload, id, shouldLogout) => ({
    type: Types.REMOVE_ACCOUNT_REQUEST,
    id,
    payload,
    shouldLogout
  }),
  removeAccountSuccess: () => ({ type: Types.REMOVE_ACCOUNT_SUCCESS }),
  removeAccountFailed: () => ({ type: Types.REMOVE_ACCOUNT_FAILED }),

  /** stop laoder */
  stopAuthLoaderSuccess: () => ({ type: Types.STOP_AUTH_LOADER })
}
