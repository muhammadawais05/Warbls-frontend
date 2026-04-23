import createSagaMiddleware from "redux-saga"
import { createStore, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rootReducer } from "./rootReducer"
import { RootSaga } from "./rootSaga"
import { composeWithDevTools } from "redux-devtools-extension"

const sagaMiddleware = createSagaMiddleware()

const enhancers = []
const __DEV__ = process.env.NODE_ENV !== "production"
if (__DEV__) {
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension())
  }
}

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["authReducer", "tracksReducer", "globalReducer"],
  debug: __DEV__
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,

  compose(composeWithDevTools(applyMiddleware(sagaMiddleware)), ...enhancers)
)
export const persistor = persistStore(store)

sagaMiddleware.run(RootSaga)
