import * as Types from "./types"
import { actions } from "./actions"
import { POST, GET, PUT } from "../../_helpers/fetcher"
import { APIs } from "../../_helpers/apis"
import { store } from "../store"
import { put, call, fork, all, takeEvery } from "@redux-saga/core/effects"

function* CreatePromoSaga({ payload }) {
  try {
    yield call(POST, APIs.promoCode, payload, {
      token: store.getState().auth.auth
    })
    yield put(actions.createPromoCodeSuccess())
  } catch (err) {
    yield put(actions.createPromoCodeFailed())
  }
}

function* GetPromoSaga() {
  try {
    yield call(GET, APIs.promoCode, {
      token: store.getState().auth.auth
    })
    yield put(actions.getPromoCodeSuccess())
  } catch (err) {
    yield put(actions.getPromoCodeFailed())
  }
}

function* UpdatePromoSaga({ payload, id }) {
  try {
    yield call(PUT, APIs.promoCode + "/" + id, payload, {
      token: store.getState().auth.auth
    })
    yield put(actions.updatePromoCodeSuccess())
  } catch (err) {
    yield put(actions.updatePromoCodeFailed())
  }
}

function* WatchCreatePromoSaga() {
  yield takeEvery(Types.CREATE_PROMO_CODE_REQUEST, CreatePromoSaga)
}

function* WatchGetPromoSaga() {
  yield takeEvery(Types.GET_PROMO_CODE_REQUEST, GetPromoSaga)
}

function* WatchUpdatePromoSaga() {
  yield takeEvery(Types.UPDATE_PROMO_CODE_REQUEST, UpdatePromoSaga)
}

export function* promoSaga() {
  yield all([fork(WatchCreatePromoSaga), fork(WatchGetPromoSaga), fork(WatchUpdatePromoSaga)])
}
