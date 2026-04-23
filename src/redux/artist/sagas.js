import * as Types from "./types"
import { actions } from "./actions"
import { all, call, fork, takeEvery, put } from "@redux-saga/core/effects"
import { POST, GET, PUT } from "../../_helpers/fetcher"
import { APIs } from "../../_helpers/apis"
import { store } from "../store"
import cogoToast from "cogo-toast"
import { toAbsoluteUrl } from "../../_helpers/toAbsoluteUrl"
import { GiConsoleController } from "react-icons/gi"

function* CreateArtistSaga({ payload }) {
  try {
    yield call(
      POST,
      APIs.artist,
      {
        ...payload,
        user_id: store.getState().auth.userInfo.user_id,
        added_by: store.getState().auth.userInfo.user_id
      },
      {
        token: store.getState().auth.auth
      }
    )
    yield put(actions.createArtistSuccess())
    cogoToast.success("applied successfully")
    window.location.href = toAbsoluteUrl("/upload-form/success")
  } catch (error) {
    console.log(error)
    yield put(actions.createArtistFailed())
  }
}

function* GetArtistsSaga() {
  try {
    const { data } = yield call(GET, APIs.artist + "?limit=999999", {
      token: store.getState().auth.auth
    })
    yield put(actions.getArtistSuccess(data.results))
  } catch (error) {
    console.log(error)
    yield put(actions.getArtistFailed())
  }
}

function* UpdateArtistSaga({ payload, id }) {
  try {
    const data = yield call(PUT, APIs.artist + "/" + id, payload, {
      token: store.getState().auth.auth
    })
    yield put(actions.updateArtistSuccess())
    cogoToast.success("User updated successfully")
  } catch (err) {
    console.log("error : ", err)
    yield put(actions.updateArtistFailed())
  }
}

function* GetSingleArtistSaga() {
  try {
    const id = store.getState().auth.userInfo.user_id
    const { data } = yield call(GET, APIs.artist + "?user_id=" + id, {
      token: store.getState().auth.auth
    })

    yield put(actions.getSingleArtistSuccess(data))
  } catch (error) {
    console.log(error)
    yield put(actions.getSingleArtistFailed())
  }
}

function* watchCreateArtistSaga() {
  yield takeEvery(Types.CREATE_ARTIST_REQUEST, CreateArtistSaga)
}

function* watchGetArtistSaga() {
  yield takeEvery(Types.GET_ARTIST_REQUEST, GetArtistsSaga)
}

function* watchUpdateArtistSaga() {
  yield takeEvery(Types.UPDATE_ARTIST_REQUEST, UpdateArtistSaga)
}

function* watchGetSingleArtistSaga() {
  yield takeEvery(Types.GET_SINGLE_ARTIST_REQUEST, GetSingleArtistSaga)
}

export function* artistSaga() {
  yield all([
    fork(watchCreateArtistSaga),
    fork(watchUpdateArtistSaga),
    fork(watchGetArtistSaga),
    fork(watchGetSingleArtistSaga)
  ])
}
