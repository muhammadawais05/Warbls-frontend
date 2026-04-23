import * as Types from "./types"
import { actions } from "./actions"
// import { actions as authActions } from "../auth/actions"
// import { actions as trackActions } from "../track/actions"
import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import { POST } from "../../_helpers/fetcher"
import { APIs } from "../../_helpers/apis"

function* GetOauthSaga() {
  try {
    const tokenPayload = {
      client_id: 1,
      response_type: "code",
      redirect_uri: "https://www.warbls.com",
      state: "warbls"
    }

    const {
      data: { oauth }
    } = yield call(POST, APIs.getAuthToken, tokenPayload)
    const codePayload = {
      grant_type: "authorization_code",
      code: `${oauth.token.authorizationCode}`,
      client_id: "1",
      client_secret: "aa919e70e019bf8dbca68c068528f87b",
      redirect_uri: "https://www.warbls.com"
    }

    yield call(POST, APIs.getAuthCode, codePayload, {
      "Content-Type": "application/x-www-form-urlencoded"
    })
  } catch (e) {
    console.log(e.message, e.response, "error in oauth")
  }
}

function* OpenLoginPopupSaga() {
  yield put(actions.openLoginSuccess())
}

function* SidebarMenuSaga({ payload }) {
  try {
    yield put(actions.sidebarRequest(payload))
  } catch (e) {}
}

function* closeLoginPopupSaga() {
  yield put(actions.closeLoginSuccess())
}

function* OpenSignupPopupSaga() {
  yield put(actions.openSignupSuccess())
}

// function* StopLoadersSaga() {
//   try {
//     yield put(authActions.stopAuthLoaderSuccess())
//     yield put(trackActions.stopTrackLoaderSuccess())
//   } catch (e) {}
// }

function* OauthWatchSaga() {
  yield takeEvery(Types.GET_OAUTH_REQUEST, GetOauthSaga)
}

// function* loadersWatchSaga() {
//   yield takeEvery(Types.STOP_LOADERS_REQUEST, StopLoadersSaga)
// }

function* openLoginWatchSaga() {
  yield takeEvery(Types.OPEN_LOGIN_REQUEST, OpenLoginPopupSaga)
}

function* closeLoginWatchSaga() {
  yield takeEvery(Types.CLOSE_LOGIN_REQUEST, closeLoginPopupSaga)
}

function* openSignupWatchSaga() {
  yield takeEvery(Types.OPEN_SIGNUP_REQUEST, OpenSignupPopupSaga)
}

function* closeSignupWatchSaga() {
  yield takeEvery(Types.CLOSE_SIGNUP_SUCCESS, OpenSignupPopupSaga)
}

function* sidebarRequestSaga() {
  yield takeEvery(Types.SIDEBAR_REQUEST, SidebarMenuSaga)
}

export function* OauthSaga() {
  yield all([
    fork(OauthWatchSaga),
    fork(openLoginWatchSaga),
    fork(closeLoginWatchSaga),
    fork(openSignupWatchSaga),
    fork(closeSignupWatchSaga),
    fork(sidebarRequestSaga)
    // fork(loadersWatchSaga)
  ])
}
