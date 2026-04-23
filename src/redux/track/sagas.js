import * as Types from "./types"
import { actions } from "./actions"
import { takeEvery, fork, put, all, call, takeLatest } from "redux-saga/effects"
import { POST, GET, PUT } from "../../_helpers/fetcher"
import { APIs } from "../../_helpers/apis"
import { store } from "../store"
import cogoToast from "cogo-toast"
import { toAbsoluteUrl } from "../../_helpers/toAbsoluteUrl"
import { GiConsoleController } from "react-icons/gi"
const { uploadTrackSuccess, uploadTrackFailed } = actions

function* UploadTrackSaga({ payload }) {
  try {
    //   try {
    //     const trackResponse = yield call(POST, APIs.uploadTrack, track.track, {
    //       token: store.getState().auth.auth
    //     })
    //     const imageResponse = yield call(POST, APIs.uploadTrack,  track.image, {
    //       token: store.getState().auth.auth
    //     })
    //     track = {
    //       ...track,
    //       //track_name: trackResponse.data.originalname,
    //       image_url: imageResponse.data.location,
    //       track_url: trackResponse.data.location,
    //       track_time: "",
    //       added_by: store.getState().auth.userInfo.user_id
    //     }
    //   } catch (e) { }

    if (payload instanceof Array) {
      for (let i = 0; i < payload.length; i++) {
        payload[i].added_by = store.getState().auth.userInfo.user_id;
      }
    }
    let x = yield call(POST, APIs.addTrack, payload, {
      token: store.getState().auth.auth
    })
    debugger
    //console.log(x);
    if (x) {
      yield put(uploadTrackSuccess())
      cogoToast.success("track uploaded")
      window.location.href = toAbsoluteUrl("/upload-track/success")
    }
  } catch (e) {
    yield put(uploadTrackFailed())
    console.log(e.message, e?.response.data)
  }
}

function* AllTracksSaga({ payload }) {
  let auth = store.getState().auth
  let q = `?load=user_details&status=active`
  if (!!auth) {
    q += `&object_type=user&object_id=${auth.userInfo.user_id}`
  }
  if (undefined == payload) {
    //q = `?load=user_details`
  } else {
    // q = `?load=user_details&object_type=user&object_id=${
    //   store.getState().auth.userInfo.user_id
    // }${payload}`

    q += `${payload}`
  }
  try {
    const { data } = yield call(GET, APIs.tracks + `${q}`)
    yield put(actions.getAllTracksSuccess(data.results))
  } catch (e) {
    yield put(actions.getAllTracksFailed())
  }
}

function* AllPendingTracksSaga({ payload }) {
  let auth = store.getState().auth
  let q = `?load=user_details&limit=999999999999999`
  if (!!auth) {
    q += `&object_type=user&object_id=${auth.userInfo.user_id}`
  }
  if (undefined == payload) {
  } else {
    q += `${payload}`
  }
  try {
    const { data } = yield call(GET, APIs.tracks + `${q}`)
    yield put(actions.getAllPendingTracksSuccess(data.results))
  } catch (e) {
    yield put(actions.getAllPendingTracksFailed())
  }
}

function* UpdateTrackSaga({ payload, id }) {
  try {
    const { data } = yield call(PUT, APIs.tracks + "/" + id, payload, {
      token: store.getState().auth.auth
    })

    yield put(actions.updateTracksSuccess(data.results))
    cogoToast.success("Vocal updated successfully")
  } catch (e) {
    yield put(actions.updateTracksFailed())
  }
}

function* LikedTracksSaga({ payload }) {
  try {
    const { data } = yield call(
      GET,
      APIs.tracks +
      `?load=user_details&object_type=user&action=like&object_id=${store.getState().auth.userInfo.user_id
      }${payload}`
    )
    yield put(actions.likedTracksSuccess(data.results))
  } catch (e) {
    yield put(actions.likedTracksFailed())
  }
}

function* PlayingTrack({ payload }) {
  try {
    // yield put(actions.likedTracksSuccess(data.results))
  } catch (e) {
    // yield put(actions.likedTracksFailed())
  }
}

function* RemovePlayingTrack() {
  try {
    // yield put(actions.likedTracksSuccess(data.results))
  } catch (e) {
    // yield put(actions.likedTracksFailed())
  }
}

function* DownloadedTracksSaga({ payload }) {
  try {
    const { data } = yield call(
      GET,
      APIs.tracks +
      `?load=user_details&object_type=user&action=download&object_id=${store.getState().auth.userInfo.user_id
      }${payload}`
    )
    yield put(actions.downloadedTracksSuccess(data.results))
  } catch (e) {
    yield put(actions.downloadedTracksFailed())
  }
}

function* TrackWiseLikeSaga({ payload }) {
  try {
    yield call(POST, APIs.trackActions, [payload], {
      token: store.getState().auth.auth
    })
    yield put(actions.trackWiseLikeSuccess())
  } catch (err) {
    yield put(actions.trackWiseLikeFailed())
  }
}

function* TrackWiseUnLikeSaga({ payload, id }) {
  try {
    yield call(PUT, APIs.trackActions + "/" + id, payload, {
      token: store.getState().auth.auth
    })
    yield put(actions.trackWiseUnLikeSuccess())
  } catch (err) {
    yield put(actions.trackWiseUnLikeFailed())
  }
}

function* TrackWiseDownloadSaga({ payload }) {
  try {
    debugger
    yield call(POST, APIs.trackActions, payload, {
      token: store.getState().auth.auth
    })
    yield put(actions.trackWiseDownloadSuccess())
  } catch (err) { }
}

function* TrackWisePlaySaga({ payload }) {
  try {
    yield call(POST, APIs.trackActions, payload, {
      token: store.getState().auth.auth
    })
    yield put(actions.trackWisePlaySuccess())
  } catch (err) { }
}

function* IncreaseVolumeSaga() {
  try {
    yield put(actions.increaseVolumeSuccess())
  } catch (e) { }
}

function* DecreaseVolumeSaga() {
  try {
    yield put(actions.decreaseVolumeSuccess())
  } catch (e) { }
}

function* HandleVolumeSaga({ payload }) {
  try {
    yield put(actions.handleVolumeSuccess(payload))
  } catch (e) { }
}

function* CartSaga({ payload }) {
  try {
    yield put(actions.addToCartSuccess(payload))
    cogoToast.success("track added to cart")
  } catch (err) {
    yield put(actions.addToCartFailed())
  }
}

function* UploadTrackWatchSaga() {
  yield takeLatest(Types.UPLOAD_TRACK_REQUEST, UploadTrackSaga)
}
function* uploadTrackRequestSetUploadingBitFalseWatchSaga() {
  yield takeEvery(Types.UPLOAD_TRACK_DEFAULT, () => {
    actions.uploadTrackRequestSetUploadingBitFalse()
  })
}

function* AllTracksWatchSaga() {
  yield takeLatest(Types.ALL_TRACKS_REQUEST, AllTracksSaga)
}

function* AllPendingTracksWatchSaga() {
  yield takeLatest(Types.ALL_PENDING_TRACKS_REQUEST, AllPendingTracksSaga)
}

function* IncreaseVolumeWatchSaga() {
  yield takeEvery(Types.INCREASE_VOLUME_REQUEST, IncreaseVolumeSaga)
}

function* DecreaseVolumeWatchSaga() {
  yield takeEvery(Types.DECREASE_VOLUME_REQUEST, DecreaseVolumeSaga)
}

function* HandleVolumeWatchSaga() {
  yield takeEvery(Types.HANDLE_VOLUME_REQUEST, HandleVolumeSaga)
}

function* TrackWiseLikeWatchSaaga() {
  yield takeEvery(Types.TRACK_WISE_LIKE_REQUEST, TrackWiseLikeSaga)
}

function* TrackWiseUnLikeWatchSaaga() {
  yield takeEvery(Types.TRACK_WISE_UNLIKE_REQUEST, TrackWiseUnLikeSaga)
}

function* TrackWiseDownloadWatchSaaga() {
  yield takeEvery(Types.TRACK_WISE_DOWNLOAD_REQUEST, TrackWiseDownloadSaga)
}

function* TrackWisePlayWatchSaaga() {
  yield takeEvery(Types.TRACK_WISE_PLAY_REQUEST, TrackWisePlaySaga)
}

function* WatchAddToCartSaga() {
  yield takeEvery(Types.ADD_TO_CART_REQUEST, CartSaga)
}

function* WatchLikedTrackSaga() {
  yield takeEvery(Types.LIKED_TRACKS_REQUEST, LikedTracksSaga)
}

function* WatchDownloadedTrackSaga() {
  yield takeEvery(Types.DOWNLOADED_TRACKS_REQUEST, DownloadedTracksSaga)
}

function* WatchUpdateTrackSaga() {
  yield takeEvery(Types.UPDATE_TRACKS_REQUEST, UpdateTrackSaga)
}

function* WatchCurrentTrackSaga() {
  yield takeEvery(Types.GET_PLAYING_VOCAL, PlayingTrack)
}

function* WatchRemoveCurrentTrackSaga() {
  yield takeEvery(Types.REMOVE_PLAYING_VOCAL, RemovePlayingTrack)
}

export function* trackSaga() {
  yield all([
    fork(UploadTrackWatchSaga),
    fork(uploadTrackRequestSetUploadingBitFalseWatchSaga),
    fork(AllTracksWatchSaga),
    fork(IncreaseVolumeWatchSaga),
    fork(DecreaseVolumeWatchSaga),
    fork(HandleVolumeWatchSaga),
    fork(TrackWiseLikeWatchSaaga),
    fork(TrackWiseUnLikeWatchSaaga),
    fork(TrackWiseDownloadWatchSaaga),
    fork(TrackWisePlayWatchSaaga),
    fork(WatchAddToCartSaga),
    fork(WatchLikedTrackSaga),
    fork(WatchDownloadedTrackSaga),
    fork(AllPendingTracksWatchSaga),
    fork(WatchUpdateTrackSaga),
    fork(WatchCurrentTrackSaga),
    fork(WatchRemoveCurrentTrackSaga)
  ])
}
