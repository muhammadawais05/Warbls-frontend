import * as Types from "./types"

export const actions = {
  /** get token actions */

  sidebarRequest: (payload) => ({ type: Types.SIDEBAR_REQUEST, payload }),

  oauthRequst: () => ({ type: Types.GET_OAUTH_REQUEST }),
  oauthSuccess: (payload) => ({ type: Types.GET_OAUTH_SUCCESS, payload }),
  oauthFailed: () => ({ type: Types.GET_OAUTH_FAILED }),

  /** stop all loaders */
  stopLoadersRequest: () => ({ type: Types.STOP_LOADERS_REQUEST }),
  stopLoadersSuccess: () => ({ type: Types.STOP_LOADERS_SUCCESS }),

  /** popup actions */
  openLoginRequest: () => ({ type: Types.OPEN_LOGIN_REQUEST }),
  openLoginSuccess: () => ({ type: Types.OPEN_LOGIN_SUCCESS }),
  closeLoginRequest: () => ({ type: Types.CLOSE_LOGIN_REQUEST }),
  closeLoginSuccess: () => ({ type: Types.CLOSE_LOGIN_SUCCESS }),
  openSignupRequest: () => ({ type: Types.OPEN_SIGNUP_REQUEST }),
  openSignupSuccess: () => ({ type: Types.OPEN_SIGNUP_SUCCESS }),
  closeSignupRequest: () => ({ type: Types.CLOSE_SIGNUP_REQUEST }),
  closeSignupSuccess: () => ({ type: Types.CLOSE_SIGNUP_SUCCESS })
}
