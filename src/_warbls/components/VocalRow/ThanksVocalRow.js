import * as React from "react"
import { Box, Button, makeStyles, Typography, useTheme } from "@material-ui/core"
import { Column } from "../Flex/Column"
import { StyledGrid } from "../Container/StyledGrid"
import { FaDownload, FaCloudDownloadAlt , FaFileDownload} from "react-icons/fa"
import { Row } from "../Flex/Row"

export const ThanksVocalRow = ({ tracks, showDownloadButton }) => {
  const { btn, helperText, btnCell, row, title, fontBold, desc } = useStyles()
  const theme = useTheme();
  return (
    <>
      {tracks.map((cart, index) => (
        <StyledGrid container style={{width:"100%"}}>

          <StyledGrid item xs={12} md={(!!showDownloadButton ? 8 : 12)}
            key={index}
            my={1}
          >
            <Row
              jc="space-between"
              p={1}
              border={1}
              borderColor={theme.palette.primary.contrastText}
              borderRadius={5}
              style={{ overflowWrap: "anywhere" }}
              mx={1}
            >
              <Column jc="space-between" px={1}>
                <Box>
                  <Row>
                    <Typography className={fontBold}>&nbsp;{cart.track_name}</Typography>
                  </Row>
                </Box>
              </Column>
            </Row>
          </StyledGrid>
          <StyledGrid item xs={12} md={4} my={1} style={{ display: !!showDownloadButton ? "" : "none" }}>
            <Row
              jc="space-between"
              p={1}
              border={1}
              borderColor={theme.palette.primary.contrastText}
              borderRadius={5}
              style={{ overflowWrap: "anywhere", cursor: "pointer" }}
              mx={2}
              onClick={()=> window.open(cart.track_url, "_blank")}
            //onClick={() => handleRemoveCart(cart.track_id)}
            >
              <Column jc="space-between" px={1}>
                <Row style={{ textAlign: "center" }}>
                  <FaDownload fontSize={20} style={{ margin: "0 1rem 0 0.5rem" }} color="#FF00C7" />
                  <Typography className={desc} fontSize={30} style={{ marginRight: "4rem", fontSize: "40px", lineHeight: "0.4" }}>| </Typography>
                  <Typography className={desc} align='center'> Download </Typography>
                </Row>
              </Column>

            </Row>
          </StyledGrid>
        </StyledGrid>
      ))}
    </>
    // <tr className={row}>
    //   <td>
    //     <Column width={width}
    //       jc="space-between"
    //       p={1}
    //       border={1}
    //       borderColor={theme.palette.primary.contrastText}
    //       borderRadius={5}
    //       my={2}
    //     >
    //       <Typography noWrap variant="h6" className={title}>
    //         {rowList.track_name}
    //       </Typography>
    //       {/* <small className={helperText}>{rowList?.user_details?.username}</small> */}
    //     </Column>
    //   </td>
    //   {/* <td align="center">
    //     <Typography variant="body1">{rowList.key}</Typography>
    //   </td>
    //   <td align="center">
    //     <Typography variant="body1">{rowList.bpm}</Typography>
    //   </td> */}
    //   <td className={btnCell} style={{ display: rowList?.download ? "" : "" }}
    //     p={1}
    //     border={1}
    //     borderColor={theme.palette.primary.contrastText}
    //     borderRadius={5}
    //     my={2}
    //   >
    //     <Button className={btn}>Download</Button>
    //   </td>
    // </tr>
  )
}

const useStyles = makeStyles((theme) => ({
  btn: {
    marginLeft: 5,
    // backgroundColor: "#F3F4F5",
    border: `1px solid ${theme.palette.primary.main}`,

    height: 43,
    width: 260,
    borderRadius: 5,
    "&:hover": {
      //backgroundColor: theme.palette.primary.main,
      color: "#ffffff"
    }
  },
  helperText: {
    color: "#9F9F9F"
  },
  btnCell: {
    width: 260
  },
  row: {
    "& td": {
      textAlign: "left",
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
      // backgroundColor: "#ffffff",
      width: 50
    },
    "& td:last-child": {
      textAlign: "left",
      borderBottom: `0px solid ${theme.palette.secondary.main}`,
      backgroundColor: "transparent"
    }
  },
  title: {
    fontSize: 17
  },
  fontBold: {
    fontWeight: "bold",
    color: theme.palette.primary.contrastText
  },
  desc: {
    //fontWeight: "bold",
    color: theme.palette.primary.contrastText
  },
}))
