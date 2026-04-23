import { combineReducers } from "redux"
import { authReducer } from "./auth/reducer"
import { tracksReducer } from "./track/reducer"
import storage from "redux-persist/lib/storage"
import { globalReducer } from "./global/reducer"
import { artistReducer } from "./artist/reducer"
import { ordersReducer } from "./orders/reducer"

export const appReducer = combineReducers({
  auth: authReducer,
  track: tracksReducer,
  global: globalReducer,
  artist: artistReducer,
  order: ordersReducer
})

export const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER_REQUEST") {
    storage.removeItem("persist:root")
    state = undefined
  }
  return appReducer(state, action)
}
