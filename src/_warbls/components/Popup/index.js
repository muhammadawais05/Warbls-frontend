import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"

export const Popup = ({ open, handleClose, children }) => {
  const { model, paper } = useStyles()

  return (
    <div>
      <Modal 
        className={model}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={paper}>{children}</div>
      </Modal>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  model: {
    outline: "none",
    border: "0px",
    boxShadow: "none",
    "&:hover": {
      border: "0px",
      boxShadow: "none",
      outline: "0px"
    },
    "&:focus": {
      border: "0px",
      boxShadow: "none",
      outline: "0px"
    }
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    border: "0px",
    boxShadow: "none",
    borderRadius: 10,
    padding: 40,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    "&:hover": {
      border: "0px",
      boxShadow: "none",
      outline: "0px"
    },
    "&:focus": {
      border: "0px",
      boxShadow: "none",
      outline: "0px"
    }
  }
}))
