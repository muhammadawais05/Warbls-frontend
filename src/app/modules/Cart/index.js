import * as React from "react"
import { makeStyles, Stepper, Step, StepLabel, Box, useTheme } from "@material-ui/core"
import { Cart } from "./ViewCart"
import { Checkout } from "./Checkout"
import { Confirmation } from "./Confirmation"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { ContentContainer } from "../../../_warbls/components/Container"
import { useDispatch, useSelector } from "react-redux"
const { useState } = React

export const ViewCart = (props) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const theme = useTheme();
  const cart = useSelector((state) => state.track.cart || []);
  const handleNext = () => {
    if (cart.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }
  return (
    <Box p={0} width="100%">
      {activeStep === 2 ? (
        <ContentContainer titleLeft="38%" titleBackground={theme.palette.success.main} title="Thank You!">
          <Confirmation handleReset={handleReset} handleBack={handleBack} />
        </ContentContainer>
      ) : (
        <ContentContainer titleLeft="3rem" titleBackground={theme.palette.success.main} title="Cart">
          <StyledContainer>
            <div className={classes.root}>
              <Box width="50%">
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <div>
                {activeStep === 0 ? (
                  <Cart handleNext={handleNext} handleBack={handleBack} />
                ) : activeStep === 1 ? (
                  <Checkout handleNext={handleNext} handleBack={handleBack} />
                ) : (
                  <Confirmation handleReset={handleReset} handleBack={handleBack} />
                )}
              </div>
            </div>
          </StyledContainer>
        </ContentContainer>
      )}

    </Box>

  )
}

function getSteps() {
  return ["View Cart", "Checkout", "Confirmation"]
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& .MuiPaper-root": {
      backgroundColor: '#fff0',
      padding: '3rem 0',
      position: 'relative',
      left: "-15px"

    }
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))
