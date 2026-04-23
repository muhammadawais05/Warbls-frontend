import React, { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import IdleTimer from "react-idle-timer"
import SessionTimeoutDialog from "./SessionTimeoutDialog"
import { actions } from "../../redux/auth/actions"

const { logoutRequest } = actions
let countdownInterval
let timeout

export default function SessionTimeout() {
  const { auth } = useSelector((state) => state.auth)
  const isAuthenticated = !!auth
  const dispatch = useDispatch()
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false)
  const [timeoutCountdown, setTimeoutCountdown] = useState(0)
  const idleTimer = useRef(null)
  // useEffect(() => {
  //     const unloadCallback = (event) => {
  //       event.preventDefault();
  //       dispatch(logoutRequest())
  //       //event.returnValue = "";
  //       return "";
  //     };

  //     window.addEventListener("beforeunload", unloadCallback);
  //     //return () => window.removeEventListener("beforeunload", unloadCallback);
  //   }, []);
  const clearSessionTimeout = () => {
    clearTimeout(timeout)
  }

  const clearSessionInterval = () => {
    clearInterval(countdownInterval)
  }

  const handleLogout = (isTimedOut = false) => {
    setTimeoutModalOpen(false)
    clearSessionInterval()
    clearSessionTimeout()
    if (!!isTimedOut) {
      dispatch(logoutRequest())
    }
  }

  const handleContinue = () => {
    setTimeoutModalOpen(false)
    clearSessionInterval()
    clearSessionTimeout()
  }

  const onActive = () => {
    if (!timeoutModalOpen) {
      clearSessionInterval()
      clearSessionTimeout()
    }
  }

  const onIdle = () => {
    const delay = 1000 * 5 * 1
    if (isAuthenticated && !timeoutModalOpen) {
      timeout = setTimeout(() => {
        let countDown = 10
        setTimeoutModalOpen(true)
        setTimeoutCountdown(countDown)
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            setTimeoutCountdown(--countDown)
          } else {
            handleLogout(true)
          }
        }, 1000)
      }, delay)
    }
  }

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={1000 * 60 * 15} //15 Mins
        crossTab={true}
      />
      <SessionTimeoutDialog
        countdown={timeoutCountdown}
        onContinue={handleContinue}
        onLogout={() => handleLogout(true)}
        open={timeoutModalOpen}
      />
    </>
  )
}
