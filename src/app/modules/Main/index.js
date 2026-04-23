import { FaAngleDown } from "react-icons/fa"
import { Box, Typography, Button, makeStyles } from "@material-ui/core"
import * as React from "react"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { Header } from "../../../_warbls/components/Header"
import { useDispatch, useSelector } from "react-redux"
import CoverImg from "../../../_warbls/assets/images/cover_image-min.png"
import HomePageImage1 from "../../../_warbls/assets/images/homepage-image2.png"
import HomePageImage2 from "../../../_warbls/assets/images/homepage-image1.png"
import HomePageImage3 from "../../../_warbls/assets/images/homepage-image3.png"
import payments from "../../../_warbls/assets/images/payments.png"
import music from "../../../_warbls/assets/images/music.png"
import music1 from "../../../_warbls/assets/images/music1.png"
import music2 from "../../../_warbls/assets/images/music2.png"
import play from "../../../_warbls/assets/images/play.png"
import laptop from "../../../_warbls/assets/images/laptop.png"
import { AppContext } from "../../../_warbls/providers/AppProvider"
import clsx from "clsx"
import { Column } from "../../../_warbls/components/Flex/Column"
import { Row } from "../../../_warbls/components/Flex/Row"
import { useHistory } from "react-router"
import { actions as authActions } from "../../../redux/auth/actions"
const { useContext, useRef, useEffect } = React

export const Main = () => {
  const {
    footerWrapper,
    signupWrapperInner,
    wrapperPayment,
    wrapperInnerPayment,
    featureContainer,
    featureCard,
    uniqueContent,
    uniqueHeading,
    btn,
    header,
    mainImgBox,
    innerBox,
    typo,
    wrapper,
    wrapperSubscription,
    advantageWrapper,
    signupWrapper,
    bottomBox,
    learnMore,
    wrapperComposition
  } = useStyles()
  const anchorRef = useRef()
  const dispatch = useDispatch()
  const { handleSignup } = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    dispatch(authActions.userInfoRequest())
  }, [dispatch])

  return (
    <Box>
      <Box className={header}>
        <Header open={true} indexPage={true} />
      </Box>
      <Box className={mainImgBox} width="100%">
        <Box className={innerBox}>
          <Typography variant="h3" className={typo}>
            Complete your music project <br />
            with royalty-free vocals
          </Typography>
          <Button className={btn} onClick={handleSignup}>
            Sign up for free
          </Button>
        </Box>
        <Box className={bottomBox}>
          <Typography
            onClick={() => {
              window.scroll({
                top: (window.innerHeight * 50) / 100
              })
            }}
            variant="h6"
            className={learnMore}
          >
            Learn more
            <FaAngleDown />
          </Typography>
        </Box>
      </Box>
      <StyledContainer style={{ maxWidth: "unset" }} className={wrapper}>
        <Box className={wrapperComposition}>
          <Box>
            <Typography variant="h4" className={uniqueHeading}>
              Unique and experienced
            </Typography>
            <Typography variant="p" className={uniqueContent}>
              With artists from all around the world, the vocalfiles that gets uploaded offers a
              variaty of styles. This will help you as an music producer to be more unique and stand
              out from the crowd.
            </Typography>
            <Button
              className={clsx(btn)}
              onClick={() => {
                history.push(`/vocals`)
              }}
            >
              Vocals
            </Button>
          </Box>
          <div className="composition" style={{ marginTop: "3rem" }}>
            <img
              alt=""
              className="composition__photo composition__photo--p1"
              src={HomePageImage1}
            />
            <img
              alt=""
              className="composition__photo composition__photo--p2"
              src={HomePageImage2}
            />
            <img
              alt=""
              className="composition__photo composition__photo--p3"
              src={HomePageImage3}
            />
          </div>
        </Box>
        <Box className={wrapperSubscription}>
          <Box style={{ width: "95%" }}>
            <Typography variant="h5" style={{ fontWeight: "600", textAlign: "center" }}>
              No subscription needed
            </Typography>
            <br />
            <Typography
              variant="p"
              style={{ lineHeight: "20px", display: "block", textAlign: "center" }}
            >
              We know you are tired of all the subscription based models. As music producers we
              <br /> know the struggle of finding good vocalfiles, and if we find one we have to
              ether
              <br /> buy a whole album pack or a big subscription pack. With Warbls you can just buy
              <br />
              the vocalfile you need and nothing else.{" "}
            </Typography>
          </Box>
        </Box>
        <Box className={wrapperPayment}>
          <Box className={wrapperInnerPayment}>
            <Box style={{ width: "100%", display: "flex" }}>
              <img width="100%" src={payments} alt="" style={{ marginTop: "80px" }} />
            </Box>
            <Box style={{ width: "67%", textAlign: "end" }}>
              <Typography variant="h5" style={{ fontWeight: "600" }}>
                {" "}
                Trusted
                <br /> payment methods
              </Typography>
              <br />
              <Typography
                variant="p"
                style={{ lineHeight: "20px", maxWidth: "400px", display: "inline-block" }}
              >
                We are using secure and well known payments as
                <br /> Visa, MasterCard, American Express and PayPal{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledContainer>
      <StyledContainer style={{ maxWidth: "unset" }} className={advantageWrapper}>
        <Row style={{ marginBottom: "0px", paddingTop: "15px" }}>
          <Typography variant="h4" style={{ fontWeight: "600" }}>
            Advantages of using Warbls
          </Typography>
        </Row>
        <Row className={featureContainer}>
          <Column className={featureCard}>
            <img alt="" width="210px" src={music} />
            <Typography
              variant="h6"
              style={{ marginTop: "65px", fontWeight: "bolder", textAlign: "left" }}
            >
              100% royalty-free
            </Typography>
            <Typography
              style={{
                lineHeight: "20px",
                marginTop: "15px",
                maxWidth: "200px",
                display: "inline-block"
              }}
              variant="p"
            >
              Vocalfiles bought from Warbls are all cleared for commerical use.
            </Typography>
          </Column>
          <Column className={featureCard}>
            <img alt="" width="250px" src={laptop} />
            <Typography
              variant="h6"
              style={{ marginTop: "65px", fontWeight: "bolder", textAlign: "left" }}
            >
              One-time purschase
            </Typography>
            <Typography
              style={{
                lineHeight: "20px",
                marginTop: "15px",
                maxWidth: "220px",
                display: "inline-block"
              }}
              variant="p"
            >
              When you buy a vocalfile from ous, the files are yours forever.
            </Typography>
          </Column>
          <Column className={featureCard}>
            <img alt="" width="175px" src={play} />
            <Typography
              variant="h6"
              style={{ marginTop: "65px", fontWeight: "bolder", textAlign: "left" }}
            >
              Find the perfect Vocal
            </Typography>
            <Typography
              style={{
                lineHeight: "20px",
                marginTop: "15px",
                maxWidth: "180px",
                display: "inline-block"
              }}
              variant="p"
            >
              Browse through vocalfiles to find the one that fits you’re project.
            </Typography>
          </Column>
        </Row>
      </StyledContainer>
      <StyledContainer style={{ maxWidth: "unset" }} className={signupWrapper}>
        <Box
          className={signupWrapperInner}
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "20px", fontWeight: "bolder" }}>
            Take you’re music career to the next level
          </Typography>
          <Button className={clsx(btn)} onClick={handleSignup}>
            Sign up for free
          </Button>
        </Box>
      </StyledContainer>
      <StyledContainer style={{ maxWidth: "unset" }} className={footerWrapper}>
        <Typography>© {new Date().getFullYear()} Warbls.com All Rights Reserved</Typography>
        <a href="#terms">Terms of use</a>
        <a href="#privacy">Privacy Policy</a>
        <p style={{ margin: "0 15px", cursor: "pointer" }} onClick={(e) => history.push("/q&a")}>
          Q&A
        </p>
        <p style={{ cursor: "pointer" }} onClick={(e) => history.push("/contact-us")}>
          Contact
        </p>
      </StyledContainer>
      <a ref={anchorRef} style={{ visibility: "hidden" }}></a>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: "flex",
    padding: "10px 0",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    "& > *": {
      color: theme.palette.primary.contrastText
    },
    "& a": {
      marginLeft: "15px",
      lineHeight: "29px",
      textDecoration: "none"
    },
    "@media (max-width:800px)": {
      flexDirection: "column"
    }
  },
  btn: {
    backgroundColor: "#86DB78",
    color: theme.palette.primary.contrastText,
    borderRadius: 5,
    width: 175,
    padding: "12px 20px 8px 20px",
    textTransform: "none",
    fontWeight: 600,
    fontSize: 18,
    marginTop: 30,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  header: {
    backgroundColor: theme.palette.primary.main
  },
  mainImgBox: {
    backgroundColor: "lightgray",
    height: "calc(100vh - 64px)",
    position: "relative",
    background: `linear-gradient(0deg, rgba(48, 48, 48, 0.2), rgba(48, 48, 48, 0.2)), linear-gradient( 269deg , rgb(87 164 255 / 50%) -47.15%, rgb(170 87 212 / 50%) 118.8%, rgb(170 87 212 / 50%) 118.8%),
      url(${CoverImg})`,
    backgroundSize: "cover",
    overflow: "hidden"
  },
  innerBox: {
    width: "100%",
    position: "absolute",
    top: "67%",
    left: "50%",
    padding: "0rem 10rem",
    transform: "translate(-50%, -50%)",

    // textAlign: "center"
    "@media (max-width:780px)": {
      padding: "0 3rem"
    },
    "@media (max-width:560px)": {
      padding: "0 4rem"
    }
  },
  bottomBox: {
    width: "100%",
    height: "139px",
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.001), rgba(0,0,0, .65))`,
    position: "absolute",
    bottom: "0",
    left: "0"
  },
  learnMore: {
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width:550px)": {
      flexDirection: "row",
      columnGap: ".5rem",
      bottom: "2%"
    }
  },

  typo: {
    fontWeight: 600,
    color: "#ffffff",
    "@media (max-width:780px)": {
      fontSize: "2rem"
    },
    "@media (max-width:580px)": {
      fontSize: "1.5rem"
    }
  },
  wrapper: {
    padding: "20px 0px 80px 0px",
    backgroundImage: `linear-gradient(to right,   rgba(79,141,214, .8) ,  rgba(142, 82, 181, 1) )`
  },
  wrapperComposition: {
    height: "70vh",
    padding: "5rem 10rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width:800px)": {
      textAlign: "center",
      padding: "0 1rem"
    }
  },

  uniqueHeading: {
    lineHeight: "30px",
    width: "30%",
    fontWeight: 600,
    fontSize: "25px",
    "@media (max-width:1000px)": {
      width: "100%"
    }
  },

  uniqueContent: {
    lineHeight: "20px",
    display: "block",
    width: "42%",
    marginTop: "20px",
    "@media (max-width:1250px)": {
      width: "100%"
    }
  },

  wrapperSubscription: {
    height: "auto",
    width: "70%",
    margin: "15px auto",
    padding: "3rem 5rem 6rem 5rem",
    display: "flex",
    justifyContent: "center",
    "@media (max-width:1100px)": {
      width: "85%"
    },
    "@media (max-width:800px)": {
      margin: "15px auto 0 auto",
      textAlign: "center",
      padding: "0rem 0"
    }
  },
  wrapperPayment: {
    display: "flex",
    justifyContent: "center",
    padding: "0 10rem",
    "@media (max-width:800px)": {
      textAlign: "center",
      padding: "0"
    }
  },
  wrapperInnerPayment: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width:1200px)": {
      rowGap: "3rem",
      flexDirection: "column",
      justifyContent: "center"
    }
  },

  advantageWrapper: {
    height: "auto",
    padding: "90px 10rem",
    backgroundImage: `linear-gradient(to right,   rgba(113,179, 86, 1) ,  rgba(80,180, 132, 1) )`,
    "@media (max-width:600px)": {
      padding: "1rem 3rem 2rem 3rem"
    }
  },

  signupWrapper: {
    // padding: "20px 0px 40px 0px",
    padding: "90px",
    backgroundImage: `linear-gradient(to right,   rgba(79,141,214, .8) ,  rgba(142, 82, 181, 1) )`,
    "@media (max-width:400px)": {
      padding: "90px 90px 20px 90px"
    }
  },
  signupWrapperInner: {
    position: "relative",
    height: "300px",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "0",
      right: "0",
      width: "100%",
      height: "100%",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      background: `url(${music1})`
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "100%",
      width: "100%",
      height: "100%",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      background: `url(${music2})`,
      transform: "translateX(-25%)"
    }
  },
  featureContainer: {
    display: "grid",
    gridGap: "3rem",
    margin: "4rem 0 1rem 0",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    "@media (max-width:700px)": {
      margin: "3rem 0 1rem 0"
    }
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  featureCard: {
    display: "flex",
    alignItems: "center"
  }
}))
