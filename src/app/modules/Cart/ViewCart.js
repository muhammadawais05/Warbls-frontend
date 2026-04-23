import { Box, Button, makeStyles, Typography, useTheme } from "@material-ui/core"
import * as React from "react"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { Select } from "../../../_warbls/components/Form/Select"
import { FiMusic } from "react-icons/fi"
import { FaCheck } from "react-icons/fa"

import { Row } from "../../../_warbls/components/Flex/Row"
import { Column } from "../../../_warbls/components/Flex/Column"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/track/actions"
import { color } from "@material-ui/system"

export const Cart = (props) => {
  const { handleNext } = props
  const { selectClass, fontBold, wan, link, desc, proceedBtn, continues, imgClass } = useStyles()
  const cart = useSelector((state) => state.track.cart || []);
  const theme = useTheme();
  const dispatch = useDispatch()

  const handleRemoveCart = (id) => {
    dispatch(actions.removeCartRequest(id))
  }
  const cart_sum = (cart.reduce(function (r, a) {
    return r + parseFloat(a['price']);
  }, 0)).toFixed(2);
  return (
    <>
      <StyledGrid container spacing={1}>
        <StyledGrid item xs={12} md={8}>
          <Typography style={{ marginBottom: '1rem' }} variant="h5">{`Your cart (${cart.length} items)`}</Typography>
          {cart.map((cart, index) => (
            <>
              <StyledGrid container >

                <StyledGrid item xs={12} md={8}
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
                    {/* <img src={cart.image_url} className={imgClass} alt="img" /> */}
                    {/* <Box bgcolor="#EBEBEB" py={2} px={4}>
                  <FiMusic fontSize={100} color="rgba(196, 196, 196, 0.6)" />
                </Box> */}
                    <Column jc="space-between" px={1}>
                      <Box>
                        <Row>
                          {/* <FiMusic fontSize={20} color="rgba(196, 196, 196, 0.6)" /> */}
                          <Typography className={fontBold}>&nbsp;{cart.track_name}</Typography>
                        </Row>
                        {/* <Row>
                      <Typography>by&nbsp;</Typography>{" "}
                      <div className={link}>{cart.user_details?.username}</div>
                    </Row>
                    <Typography className={wan}>WAV</Typography> */}
                      </Box>
                      {/* <div
                    className={`${link} pointer`}
                    onClick={() => handleRemoveCart(cart.track_id)}
                  >
                    Remove
                  </div> */}
                    </Column>
                  </Row>
                  {/* <Row jc="space-between" width="40%">
                <div>
                  <Typography>&nbsp;&nbsp;&nbsp;License</Typography>
                  <Select options={languages} classes={selectClass} />
                </div>
                <Typography variant="h5">&euro;49</Typography>
              </Row> */}
                </StyledGrid>
                <StyledGrid xs={12} md={4}

                  my={1}

                >
                  <Row
                    jc="space-between"
                    p={1}
                    border={1}
                    borderColor={theme.palette.primary.contrastText}
                    borderRadius={5}
                    style={{ overflowWrap: "anywhere", cursor: "pointer" }}
                    mx={2}
                    onClick={() => handleRemoveCart(cart.track_id)}
                  >
                    <Column jc="space-between" px={1}>
                      <Row style={{ textAlign: "center" }}>
                        <FaCheck fontSize={20} style={{ margin: "0 1rem 0 0" }} color={theme.palette.success.main} />
                        <Typography className={desc} fontSize={30} style={{ marginRight: "2rem", fontSize: "40px", lineHeight: "0.4" }}>| </Typography>
                        <Typography className={desc} align='center'> Remove (${cart.price}) </Typography>
                      </Row>
                    </Column>

                  </Row>
                </StyledGrid>
              </StyledGrid>

            </>

          ))}
        </StyledGrid>
        <StyledGrid item xs={12} md={4}>
          <Typography style={{ marginBottom: '1.5rem' }} variant="h5">Order Summary</Typography>
          <Column
            jc="space-between"
            p={2}
            border={2}
            borderColor={theme.palette.primary.contrastText}
            borderRadius={5}
            my={2}
          >
            <Typography className={desc} align="center" style={{fontSize:"17px", margin:"0.5rem 0"}}>
              {cart.length}, royalty-free vocalfiles
            </Typography>
            {/* <Row mt={3}>
              <FiMusic fontSize={20} color={theme.palette.primary.contrastText} />
              <Typography className={desc}>4 music tracks</Typography>
            </Row>
            <Row my={2} p={2} border={1} borderColor="rgba(196, 196, 196, 0.6)" borderRadius={5}>
              <input type="radio" />
              <Column ml={2}>
                <Typography className={desc}>One Time Purchase</Typography>
                <Typography className={desc}>${cart_sum}
                </Typography>
              </Column>
            </Row>
            <Box border={1} borderColor="rgba(196, 196, 196, 0.6)"></Box> */}
            {/* <Row mt={3} jc="space-between">
              <Typography className={desc}>Estimated amount due today</Typography>
              <Typography className={desc}>&euro;196</Typography>
            </Row> */}

            <Typography className={desc} align="center" style={{fontSize:"30px",margin:"0.5rem 0"}} >
              $ {cart_sum}  
            </Typography>
            <Column ai="center">
              <Button className={proceedBtn} onClick={handleNext}>
                Proceed to checkout
              </Button>
              {/* <a href="" className={continues}>
                Continue Shopping
              </a> */}
            </Column>
          </Column>
        </StyledGrid>
      </StyledGrid>
    </>
  )
}

const languages = [
  { label: "Standard $49", value: "", disabled: true },
  { label: "Standard $49", value: "english" },
  { label: "Standard $49", value: "french" }
]

const useStyles = makeStyles((theme) => ({
  imgClass: {
    width: 150,
    height: 150
  },
  selectClass: {
    border: "0px",
    color: "#000000",
    width: "100%"
  },
  fontBold: {
    fontWeight: "bold",
    color: theme.palette.primary.contrastText
  },
  desc: {
    //fontWeight: "bold",
    color: theme.palette.primary.contrastText
  },
  link: {
    color: "#4099F3"
  },
  wan: {
    fontWeight: "bold",
    fontSize: "17px",
  },
 
  proceedBtn: {
    backgroundColor: theme.palette.success.main,
    color: "#ffffff",
    borderRadius: 5,
    textTransform: "none",
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 10,
    marginBottom: 5,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      color: "#ffffff"
    }
  },
  continues: {
    textDecoration: "none"
  }
}))
