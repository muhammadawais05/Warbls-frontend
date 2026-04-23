import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../redux/track/actions"
import cogoToast from "cogo-toast"

const { createContext, useState, useCallback } = React

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { auth } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.track.cart || [])
  const dispatch = useDispatch()
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignup, setOpenSignup] = useState(false)

  const handleLogin = useCallback(() => {
    setOpenLogin(!openLogin)
  }, [openLogin])

  const closeLogin = () => {
    setOpenLogin(false)
  }

  const handleSignup = useCallback(() => {
    setOpenSignup(!openSignup)
  }, [openSignup])

  const handleCart = useCallback(
    (data) => {
      if (auth) {
        const exist = cart.find((c) => c.track_id === data.track_id)
        if (exist) {
          cogoToast.warn("already in cart")
        } else {
          dispatch(actions.addToCartRequest(data))
        }
      } else {
        handleSignup()
      }
    },
    [auth, cart, dispatch, handleSignup]
  )

  // const value = { openLogin: loginPopup, openSignup: signupPopup, handleLogin, handleSignup }
  const value = { openLogin, openSignup, handleLogin, handleSignup, handleCart, closeLogin }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
