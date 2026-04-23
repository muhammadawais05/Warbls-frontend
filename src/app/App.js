import NonAuthLayout from "../_warbls/Layout/NonAuthLayout"
import * as React from "react"
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { Main } from "./modules/Main"
import { useSelector } from "react-redux"
import { Layout } from "../_warbls/Layout"
import "react-perfect-scrollbar/dist/css/styles.css"
import { BaseRoutes } from "./BaseRoutes"
import { actions } from "../redux/auth/actions"
import { actions as trackActions } from "../redux/track/actions"
import { useDispatch } from "react-redux"
import { Vocals } from "./modules/Vocals"
import { QA } from "./modules/QA"
import { ContactUs } from "./modules/ContactUs"
import SessionTimeout from "./SessionTimeout"
import { useLocation } from "react-router"
import { ForgotPassword } from "./modules/ForgotPassword"
import { ResetPassword } from "./modules/ResetPassword"

const { useEffect, useState } = React

export var sidebarDrawerContext = React.createContext(null)

function App() {
  const { auth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [collapse, isCollapsed] = useState(true)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    dispatch(actions.usersRequest())
    dispatch(trackActions.removePlayingVocal())
  }, [dispatch, location])

  return (
    <>
      <Switch>
        {!auth && (
          <>
            <Route path="/main" component={Main} />
            <Route path="/" component={Main} exact />

            <Route
              path="/vocals"
              component={() => {
                return (
                  <NonAuthLayout>
                    <Vocals titleLeft="10%" />
                  </NonAuthLayout>
                )
              }}
            />

            <Route
              path="/q&a"
              component={() => {
                return (
                  <NonAuthLayout>
                    <QA titleLeft="10%" />
                  </NonAuthLayout>
                )
              }}
            />

            <Route
              path="/forgot"
              component={() => {
                return (
                  <NonAuthLayout>
                    <ForgotPassword />
                  </NonAuthLayout>
                )
              }}
              exact
            />

            <Route
              path="/reset/:hash"
              component={() => {
                return (
                  <NonAuthLayout>
                    <ResetPassword />
                  </NonAuthLayout>
                )
              }}
            />

            <Route
              path="/contact-us"
              component={() => {
                return (
                  <NonAuthLayout>
                    <ContactUs titleLeft="10%" />
                  </NonAuthLayout>
                )
              }}
            />
          </>
        )}

        {!auth ? (
          <>
            <Redirect to="/" from="/" />
          </>
        ) : (
          <sidebarDrawerContext.Provider value={{ collapse, isCollapsed }}>
            <Layout>
              <SessionTimeout />
              <BaseRoutes />
            </Layout>
          </sidebarDrawerContext.Provider>
        )}
      </Switch>
    </>
  )
}

export default App
