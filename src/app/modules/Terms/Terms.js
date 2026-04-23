import * as React from "react"
import { Box, makeStyles, Typography, Button } from "@material-ui/core"
import { listText } from "./script"

export const Terms = ({ next }) => {
  const { typo, listStyle, btn, boxPadding } = useStyles()

  return (
    <>
      <Box className={boxPadding}>
        <Typography variant="h6">Upload Policy</Typography>
        <Typography className={typo}>
          You acknowlegde and agree that all vocalfiles uploaded to Warbls.com are 100% your own,
          and that you own the copyright to your work. You acknowledge and agree that all your
          uploads will be royalty-free for all users downloading your vocalfiles. Even if you remove
          your account you understand that your uploads can still be used by users and Warbls.com.
        </Typography>
      </Box>

      <Box className={boxPadding}>
        <Typography variant="h6">Rules</Typography>
        <ul className={listStyle}>
          {listText.map((list, index) => (
            <List text={list.text} key={index} />
          ))}
        </ul>
      </Box>
      <Box className={boxPadding}>
        <Typography className={typo}>
          <strong>
            {" "}
            IMPORTANT: If these rules are not followed the vocal file will not be approved.
          </strong>
        </Typography>
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" color="primary" onClick={next} className={btn} disableElevation>
          I Agree
        </Button>
      </Box>
    </>
  )
}

const List = ({ text }) => {
  const { typo } = useStyles()
  return (
    <Typography component="li" className={typo}>
      {text}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  typo: {
    color: theme.palette.primary.contrastText,
    "&.MuiTypography-body1": {
      color: theme.palette.primary.contrastText,
      fontSize: 17,
      fontWeight: 400,
      wordSpacing: 2,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: 14
      }
    }
  },
  listStyle: {
    listStyle: "disk"
  },
  btn: {
    width: 180,
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    },

    [theme.breakpoints.down("sm")]: {
      padding: "9px 0px",
      "&.MuiButton-label": {
        fontSize: 14
      }
    }
  },
  boxPadding: {
    padding: "12px 64px 32px 64px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 20px"
    }
  }
}))
