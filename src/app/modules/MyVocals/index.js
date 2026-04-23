import swal from "sweetalert"
import { Button, makeStyles, Typography, CircularProgress } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import * as React from "react"
import { useSelector } from "react-redux"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { ContentContainer } from "../../../_warbls/components/Container"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { Column } from "../../../_warbls/components/Flex/Column"
import { Row } from "../../../_warbls/components/Flex/Row"
import { Table } from "./Table"
import axios from "axios"
import { APIs } from "../../../_helpers/apis"
import { AiOutlineLoading } from "react-icons/ai"
import { color } from "@material-ui/system"

export const MyVocals = () => {
  const { animate, sideBtn, divider, topBtn, addBtn, imgIcon, withdrawBtn, borderWhite ,loadingTextWrap} = useStyles();
  const { userInfo, auth } = useSelector((state) => state.auth)
  const [isGeneratingLink, setIsGeneratingLink] = React.useState(false);
  const [loading,setLoading]=React.useState(false);
  const [tracks,setTracks]=React.useState([]);
  const [transactionData,setTransactionData]=React.useState([]);
  const [availableBalance,setAvailableBalance]=React.useState(0);
  const [withdrawAmountThreshold,setWithDrawAmountThreshold]=React.useState(0);

  const getMyVocals=async()=>{
    setLoading(true);
  try{
    const {data}= await axios.get(APIs.myVocals+userInfo?.user_id);
   
    if(data?.amount?.length !=0 || data?.tracks?.length !=0){
     setTracks(data?.tracks);
     setTransactionData(data?.amount);
     setWithDrawAmountThreshold(parseFloat(data.withdrawAmountThreshold ? data.withdrawAmountThreshold : 100));
   
     if(data?.amount.length>0){
        var deposit,withdraw;
        deposit=withdraw=0;

       data.amount.map((value)=>{
         if(value.type==='deposit'){
           deposit=value.amount;
         }else{
           withdraw=value.amount
         }
       })
       setAvailableBalance((deposit-withdraw).toFixed(2));   
     }
     setLoading(false)
    }else{
     setLoading(false);
   }
  }
  catch(err){
      swal({title:"Oh noes!", text:"Error fetching My Vocals list", icon:"error"});
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getMyVocals();
  }, []);

  const startOnboardingProcess = React.useCallback(async () => {
    try {
      setIsGeneratingLink(true);
      const { data } = await axios.get(APIs.onboarding + userInfo?.user_id, {
        headers: {
          'token': auth
        }
      });
      if (data != null && data != '') {
        window.location.href = data;
      }
      setIsGeneratingLink(false);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsGeneratingLink(false);
    }
  }, [APIs, axios, userInfo]);

  const handleWithdrawButtonClicked = async () => {
    swal({
      text: `Enter amount to withdraw. ($ ${availableBalance} available)`,
      content: "input",
      button: {
        text: "Withdraw!",
        closeModal: false,
      },
    })
      .then(amount => {
        if (!amount && isNaN(amount)) throw null;
        if(parseFloat(amount) > availableBalance) throw "available_balance_error";
        if(parseFloat(amount) < withdrawAmountThreshold) throw "withdraw_threshold_error"

        return axios.post(APIs.withdraw, {
          user_id: userInfo.user_id,
          amount: amount
        }, {
          headers: { 'token': auth }
        });
      })
      .then(response => {
        const { data } = response;
        if (!data || data == '') {
          return swal("Withdraw failed!");
        }

        swal({
          title: "Withdraw success!",
          text: "Your money is on the way!",
          icon: 'success',
        });
      })
      .catch(err => {
        
        if(err === "available_balance_error"){
          swal("Oh noes!", `amount greater then available balance ${availableBalance}$`, "error");
        }
        else if(err === "withdraw_threshold_error"){
          swal("Oh noes!",`Can't withdraw less then ${withdrawAmountThreshold}$` , "error");
        }
        else if (err) {
          swal("Oh noes!", "Withdraw Failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  }

  return (
    <ContentContainer titleBackground="linear-gradient(91.97deg, #5F5F5F 9.8%, #E3B8EA 133.46%)" titleLeft="25px" title='My Vocals' >
      {
        !userInfo.isOnboardingComplete &&
        <StyledContainer style={{ padding: "25px" }}>
          <Alert
            className={animate}
            action={<Button
              disabled={!userInfo?.user_id || isGeneratingLink || !auth}
              onClick={startOnboardingProcess}
              className={sideBtn}
            >
              Start{isGeneratingLink && 'ing'} Onboarding
            </Button>}

            variant="standard" severity="warning" >
            Your onboarding is pending. If you have already submitted your information, then please wait for approval.
          </Alert>
        </StyledContainer>
      }
      <StyledContainer style={{ padding: "25px" }}>
        <StyledGrid container spacing={1}>
          {/* <StyledGrid xs={6} md={2} item>
            <p>“when they click on the + this box come up with albums to add the song to</p>
            <Row jc="space-between" ai="center">
              <Column p={1} mt={2} className={borderWhite} borderRadius={5} width="100px">
                <Button className={sideBtn}>Album 1</Button>
                <div className={divider} />
                <Button className={sideBtn}>Album 2</Button>
                <div className={divider} />
                <Button className={sideBtn}>Album 3</Button>
              </Column>
              <img src={toAbsoluteUrl("/media/add-img.svg")} alt="" className={imgIcon} />
            </Row>
          </StyledGrid> */}
          <StyledGrid xs={12} md={8} item>
            {/* <Row>
              <Button className={topBtn}>All</Button>
              <Button className={topBtn}>Album 1</Button>
              <Button className={topBtn}>Album 2</Button>
              <Button className={topBtn}>Album 3</Button>
              <Button className={addBtn}>+ &nbsp;Add Album</Button>
            </Row> */}
            {loading ? (<span className={loadingTextWrap}>Loading Please wait ...</span>):(<Table tracks={tracks} />)}
          </StyledGrid>
          <StyledGrid xs={6} md={2} order={{}} item>

            <Button onClick={handleWithdrawButtonClicked} className={withdrawBtn}>$&nbsp;&nbsp;Withdraw (${availableBalance}) </Button>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    </ContentContainer >
  )
}

const useStyles = makeStyles((theme) => ({
  borderWhite: {
    border: "1px solid #fff"
  },
  loadingTextWrap:{
    display:'flex',
    width:'100%',
    justifyContent:'center',
    marginTop:'15px'
  },
  sideBtn: {
    textTransform: "none",
    color: "#fff",
  },
  divider: {
    borderTop: "1px solid #000000",
    height: 2,
    width: "100%"
  },
  topBtn: {
    textTransform: "none",
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.contrastText}`,
    marginLeft: 3,
    boxSizing: "border-box",
    padding: "5px 15px",
    "&:hover": {
      backgroundColor: "#777777"
      //   border: "2px solid #000000"
    }
  },
  addBtn: {
    backgroundColor: "rgba(64, 64, 64, 0.87)",
    textTransform: "none",
    marginLeft: 3,
    color: "#ffffff",
    padding: "5px 15px",
    "&:hover": {
      backgroundColor: "rgba(64, 64, 64, 0.87)"
    }
  },
  imgIcon: {
    width: "20px",
    height: "20px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  withdrawBtn: {
    backgroundColor: "rgba(36, 36, 36, 0.87)",
    textTransform: "none",
    marginLeft: 3,
    padding: "8px 20px",
    borderRadius: 8,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "rgba(36, 36, 36, 0.87)"
    }
  },
  animate: {
    "< *": {
      transition: "all 0.5s ease-in"
    }
  }
}))
