import { all } from "redux-saga/effects"
import { authSaga } from "./auth/sagas"
import { trackSaga } from "./track/sagas"
import { OauthSaga } from "./global/sagas"
import { artistSaga } from "./artist/sagas"
import { promoSaga } from "./promo_code/sagas"
import { orderSaga } from "./orders/sagas"

export function* RootSaga() {
  yield all([authSaga(), trackSaga(), OauthSaga(), artistSaga(), promoSaga(), orderSaga()])
}
