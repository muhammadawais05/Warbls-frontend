import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { PaymentBox } from "./PaymentBox"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { StatBox } from "./StatBox"
import { OnlineStoreStat } from "./OnlineStoreStat"
import { visitFromSocial, visitFromSource, statsList } from "./script"
import { ContentContainer } from "../../../_warbls/components/Container"
import TopStatBox from "./TopStatBox"

export const Dashboard = () => {
  const { typo, firstBox, secondBox, thirdBox } = useStyles()
  const topStats = [
    { title: "Total Vocals", stat: "1203" },
    { title: "Vocals Sold", stat: "17k" },
    { title: "Vocals sold this Month", stat: "788" },
    {
      title: "Total Customers",
      stat: "12k"
    },
    // {
    //   title: "Total customers  this month",
    //   stat: "1689"
    // },
    {
      title: "Total Orders",
      stat: "8895"
    },
    {
      title: "Orders this month",
      stat: "3.7"
    }
  ]

  return (
    <Box width="100%">
      <ContentContainer
        titleLeft="60px"
        title="Dashboard"
        titleBackground={"linear-gradient(186.71deg, #824141 12.77%, #333333 126.7%)"}
        adminGradient={true}
      >
        {/* <StyledGrid item lg={12} md={12} xs={12} sm={12} px={2} className={secondBox}>
          <PaymentBox />
        </StyledGrid> */}
        <StyledGrid mx={2}>
          <StyledGrid item lg={12} md={12} xs={12} sm={12} className={firstBox}>
            <StyledGrid container my={6}>
              <PaymentBox />
              <PaymentBox />
              <PaymentBox />
            </StyledGrid>
          </StyledGrid>
          <StyledGrid mx={2} item lg={12} md={12} xs={12} sm={12} className={firstBox}>
            <StyledGrid container my={6} style={{ borderRadius: 5, border: "1px solid white" }}>
              {topStats.map(({ title, stat, index }) => {
                return (
                  <StyledGrid item lg={2} md={2} sm={3} xs={4} key={index}>
                    <TopStatBox title={title} stat={stat} />
                  </StyledGrid>
                )
              })}
            </StyledGrid>
          </StyledGrid>

          <StyledGrid item lg={12} md={12} xs={12} sm={12} className={firstBox}>
            <StyledGrid container>
              {statsList.map((stat, index) => (
                <StyledGrid item lg={4} md={6} sm={6} xs={12} key={index}>
                  <StatBox key={index} list={stat} />
                </StyledGrid>
              ))}
            </StyledGrid>
          </StyledGrid>

          <StyledGrid item xs={12} className={thirdBox}>
            <StyledGrid container py={6}>
              <StyledGrid item md={12} lg={6} sm={12} xs={12}>
                <OnlineStoreStat list={visitFromSocial} title="Online Store Visits By Social" />
              </StyledGrid>
              <StyledGrid item md={12} lg={6} sm={12} xs={12}>
                <OnlineStoreStat
                  list={visitFromSource}
                  title="Online Store Visits From Source"
                  mt={{ sm: 8, xs: 8, md: 8, lg: 0 }}
                />
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </ContentContainer>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  typo: {
    fontSize: 20,
    color: theme.palette.primary.main,
    fontStyle: "normal",
    fontWeight: "normal",
    marginBottom: 5
  },
  firstBox: {
    order: 1,

    [theme.breakpoints.down("sm")]: {
      order: 2,
      border: 0
    }
  },
  secondBox: {
    order: 2,
    [theme.breakpoints.down("sm")]: {
      order: 1,
      borderTop: `1px solid ${theme.palette.primary.main}`
    }
  },
  thirdBox: {
    marginInline: "1rem",
    order: 3
  }
}))
