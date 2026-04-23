import * as Types from "./types"
import { actions } from "./actions"
import { POST, GET, PUT } from "../../_helpers/fetcher"
import { APIs } from "../../_helpers/apis"
import { store } from "../store"
import { put, call, fork, all, takeEvery } from "@redux-saga/core/effects"

function* CreateOrderSaga({ payload }) {
  try {
    yield call(POST, APIs.order, payload, {
      token: store.getState().auth.auth
    })
    yield put(actions.createOrderSuccess())
  } catch (err) {
    yield put(actions.createOrderFailed())
  }
}

function* GetAllOrdersSaga() {
  try {
    const queryString = `?load=order_details.track_details`
    const { data } = yield call(GET, APIs.order + `${queryString}`, {
      token: store.getState().auth.auth
    })
    yield put(actions.createOrderSuccess(data.results))
  } catch (err) {
    yield put(actions.createOrderFailed())
  }
}

function* WatchCreateOrderSaga() {
  yield takeEvery(Types.CREATE_ORDER_REQUEST, CreateOrderSaga)
}

function* WatchAllOrdersSaga() {
  yield takeEvery(Types.GET_ALL_ORDERS_REQUEST, GetAllOrdersSaga)
}

export function* orderSaga() {
  yield all([fork(WatchAllOrdersSaga), fork(WatchCreateOrderSaga)])
}
