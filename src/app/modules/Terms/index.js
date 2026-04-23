import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import { AddVocal } from "./AddVocal"
import { Terms } from "./Terms"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"

import { actions as trackActions } from "../../../redux/track/actions"
// import { actions } from "../../../redux/track/actions"

const { useState, useEffect } = React

function getSteps() {
  return ["Terms", "Add Vocals"]
}

export const TermsAddStepper = () => {
  const history = useHistory()
  const { root, bg, circle, stepper, lable, container } = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    userInfo.user_type === 0 && history.push("/upload-form")
  }, [])

  useEffect(() => () => dispatch(trackActions.uploadTrackRequestSetUploadingBitFalse()), []) //uploadTrackRequestSetUploadingBitFalse
  useEffect(() => dispatch(trackActions.uploadTrackRequestSetUploadingBitFalse()), [])

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <StyledContainer maxWidth="lg" className={container}>
      <div className={root}>
        <div style={{ width: "100%" }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={stepper}
            classes={{ root: bg }}
          >
            {steps.map((label) => (
              <Step key={label} className={circle}>
                <StepLabel className={lable}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 ? <Terms next={handleNext} /> : <AddVocal reset={handleReset} />}
          </div>
        </div>
      </div>
    </StyledContainer>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    "@media (max-width:959px) ": {
      marginBottom: "50px"
    }
  },
  bg: {
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      padding: "24px 5px"
    }
  },
  circle: {
    "& .MuiSvgIcon-root": {
      height: 40,
      width: 40,
      borderRadius: "5px"
    }
  },
  stepper: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    "& .MuiStepConnector-lineHorizontal": {
      borderTopWidth: 5
    },
    "& .MuiStepConnector-line": {
      borderColor: theme.palette.primary.contrastText
    },
    "& .MuiStepConnector-alternativeLabel": {
      top: 17
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  lable: {
    "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
      marginTop: 4
    },
    "& .MuiTypography-body2": {
      fontSize: 17,
      color: theme.palette.primary.contrastText,
      fontWeight: 400
    }
  },
  container: {
    padding: "32px 80px",
    // display: "flex",
    // alignItems: "center",
    background: "#333333",
    [theme.breakpoints.down("sm")]: {
      padding: "12px 30px"
    }
  }
}))
