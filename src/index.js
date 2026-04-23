import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./app/App"
import reportWebVitals from "./reportWebVitals"
import { ThemeProvider } from "@material-ui/styles"
import { CssBaseline } from "@material-ui/core"
import { theme } from "./_warbls/providers/ThemeProvider"
import { AppProvider } from "./_warbls/providers/AppProvider"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./redux/store"
import { interceptor } from "./_helpers/interceptor"
import { BrowserRouter as Router } from "react-router-dom"
//https://warbls.s3.eu-north-1.amazonaws.com/attachments/sound.mp3

interceptor()

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>loading...</div>}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppProvider>
            <CssBaseline />
            <App />
          </AppProvider>
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
