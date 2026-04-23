import * as React from "react"
import { Typography, Box, makeStyles } from "@material-ui/core"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { Column } from "../../../_warbls/components/Flex/Column"
import { ThanksVocalRow } from "../../../_warbls/components/VocalRow/ThanksVocalRow"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { actions } from "../../../redux/track/actions"

export const Confirmation = (props) => {
  const { handleReset } = props
  const { smallText, bigText, span } = useStyles()
  const { tracks, cart, dowloadedTracks } = useSelector((state) => state.track)
  const history = useHistory();
  const dispatch = useDispatch()
  React.useEffect( () => () => dispatch(actions.emptyCartRequest()), [] );
  return (
    <>
      <StyledContainer my={5}  >
        <Column ai="center">
          <Typography className={smallText}>Order Number: EA37123</Typography>
          <Typography className={smallText}>
            We will send you an order confirmation email within 5 minutes.
          </Typography>
          <Typography className={bigText}>
            Go to your <span className={span}>Download</span> page to access your vocal files or
            download them here.
          </Typography>
          <Box py={4} style={{ width: "75%" }}>
            <ThanksVocalRow tracks={cart} showDownloadButton={true} />
          </Box>
          <Typography variant="h5" className={bigText}>
            Browse more{" "}
            <span className={span} onClick={() => {  history.push(`/vocals`);}}>
              vocals
            </span>
          </Typography>
        </Column>
      </StyledContainer>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  smallText: {
    fontSize: 20,
    fontWeight: "normal",
    color: theme.palette.primary.contrastText,
    marginTop: 10
  },
  bigText: {
    fontSize: 30,
    fontWEight: "normal",
    color: theme.palette.primary.contrastText,
    marginTop: 10
  },
  span: {
    // fontSize: 35,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
    padding: "5px 10px",
    borderRadius: 5,
    cursor: "pointer"
  }
}))
