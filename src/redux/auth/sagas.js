import * as Types from "./types"
import { actions } from "./actions"
import { takeEvery, fork, put, all, call, take, takeLatest } from "redux-saga/effects"
import { POST, GET, PUT } from "../../_helpers/fetcher"
import { APIs } from "../../_helpers/apis"
import cogoToast from "cogo-toast"
import { store } from "../store"
import md5 from "md5"

const { signupSuccess, signupFailed } = actions

function* SignupSaga({ payload, signup, reset, setErrors }) {
  try {
    let res = yield call(POST, APIs.signup, payload)
    yield put(signupSuccess())
    const { error, message } = res
    if (error !== true) {
      reset()
      signup()
      cogoToast.success("user registered")

      try {
        const password = md5(payload.password)
        const { data } = yield call(POST, APIs.signin, { username: payload.username, password })
        yield put(actions.loginSuccess(data, payload.username))
        cogoToast.success("welcome to warbls")

        try {
          const { data } = yield call(
            GET,
            APIs.users + `?login=${store.getState().auth.username}`,
            {
              token: store.getState().auth.auth
            }
          )
          yield put(actions.userInfoSuccess(data.results[0]))
        } catch (e) {}
      } catch (e) {
        yield put(actions.loginFailed())
      }
    } else if (error) {
      setErrors(message)
    }
  } catch (e) {
    yield put(signupFailed())
  }
}

function* LoginSaga({ payload }) {
  try {
    const password = md5(payload.password)
    const { data } = yield call(POST, APIs.signin, { ...payload, password })
    yield put(actions.loginSuccess(data, payload.username))

    try {
      const { data } = yield call(GET, APIs.users + `?login=${store.getState().auth.username}`, {
        token: store.getState().auth.auth
      })
      yield put(actions.userInfoSuccess(data.results[0]))
    } catch (e) {}
  } catch (e) {
    yield put(actions.loginFailed())
  }
}

function* UserInfoSaga() {
  try {
    const { data } = yield call(GET, APIs.users + `?login=${store.getState().auth.username}`, {
      token: store.getState().auth.auth
    })
    yield put(actions.userInfoSuccess(data.results[0]))
  } catch (e) {}
}

function* UsersSaga() {
  try {
    const { data } = yield call(GET, APIs.users + "?limit=99999999999", {
      token: store?.getState()?.auth?.auth
    })

    yield put(actions.usersSuccess(data.results))
  } catch (e) {
    yield put(actions.usersFailed())
  }
}

function* UserReportsSaga() {
  try {
    const { data } = yield call(GET, APIs.reports, {
      token: store.getState().auth.auth
    })
    yield put(actions.userReportsSuccess(data))
  } catch (e) {
    yield put(actions.userReportsFailed())
  }
}

function* UserTypesSaga() {
  try {
    const { data } = yield call(GET, APIs.types, {
      token: store.getState().auth.auth
    })
    yield put(actions.userTypesSuccess(data.results))
  } catch (e) {
    yield put(actions.userTypesFailed())
  }
}

function* UserUpdateSaga({ payload, id }) {
  try {
    yield call(
      PUT,
      APIs.updateUser + id,
      { ...payload, log: JSON.stringify({ log_added_by: id }) },
      {
        token: store.getState().auth.auth
      }
    )
    cogoToast.success("user updated")
  } catch (e) {
    yield put(actions.userUpdateFailed())
  }
}

function* UserImageUpdateSaga({ payload, id, key, values }) {
  try {
    const response = yield call(POST, APIs.uploadTrack, payload, {
      token: store.getState().auth.auth
    })
    const updated = yield call(
      PUT,
      APIs.updateUser + id,
      {
        [key]: response.data.location,
        log: JSON.stringify({ log_added_by: id })
      },
      {
        token: store.getState().auth.auth
      }
    )
    yield put(actions.userUpdateSuccess(updated.data))
    cogoToast.success("profile updated")
  } catch (e) {
    console.log(e?.response.data, e.message)
  }
}

function* RemoveAccountSaga({ payload, id, shouldLogout }) {
  try {
    yield call(
      PUT,
      APIs.updateUser + id,
      { ...payload, log: JSON.stringify({ log_added_by: id }) },
      {
        token: store.getState().auth.auth
      }
    )
    if (shouldLogout) {
      cogoToast.success("user profile deleted")
      yield put(actions.logoutSuccess())
    } else {
      cogoToast.success("user deleted")
    }
  } catch (e) {}
}

function* LogoutSaga({ payload }) {
  try {
    yield put(actions.logoutSuccess(payload))
  } catch (e) {
    yield put(actions.logoutFailed(e))
  }
}

function* SignupWatchSaga() {
  yield takeEvery(Types.SIGNUP_USER_REQUEST, SignupSaga)
}

function* LoginWatchSaga() {
  // while (true) {
  yield takeLatest(Types.LOGIN_USER_REQUEST, LoginSaga)
  // }
}

function* UserInfoWatchSaga() {
  yield takeEvery(Types.USER_INFO_REQUEST, UserInfoSaga)
}

function* LogoutWatchSaga() {
  yield takeEvery(Types.LOGOUT_USER_REQUEST, LogoutSaga)
}

function* UsersWatchSaga() {
  yield takeEvery(Types.USERS_REQUEST, UsersSaga)
}

function* UserReportsWatchSaga() {
  yield takeEvery(Types.USER_REPORTS_REQUEST, UserReportsSaga)
}

function* UserTypesWatchSaga() {
  yield takeEvery(Types.USER_TYPES_REQUEST, UserTypesSaga)
}

function* UserUpdateWatchSaga() {
  yield takeEvery(Types.USER_UPDATE_REQUEST, UserUpdateSaga)
}

function* UserImageUpdateWatchSaga() {
  yield takeEvery(Types.USER_IMAGE_UPDATE_REQUEST, UserImageUpdateSaga)
}

function* RemoveAccountWatchSaga() {
  yield takeEvery(Types.REMOVE_ACCOUNT_REQUEST, RemoveAccountSaga)
}

export function* authSaga() {
  yield all([
    fork(LoginWatchSaga),
    fork(LogoutWatchSaga),
    fork(SignupWatchSaga),
    fork(UsersWatchSaga),
    fork(UserReportsWatchSaga),
    fork(UserUpdateWatchSaga),
    fork(UserTypesWatchSaga),
    fork(UserInfoWatchSaga),
    fork(UserImageUpdateWatchSaga),
    fork(RemoveAccountWatchSaga)
  ])
}
