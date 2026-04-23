import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { PaymentBox } from "../../../_warbls/components/PaymentBox"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { LineChart } from "./LineChart"
import { Files } from "./Files"
import { Orders } from "./Orders"
import { BarChart } from "./BarChart"
import { ContentContainer } from "../../../_warbls/components/Container"

export const Analytics = () => {
  const { typo } = useStyles()

  return (
    <Box width="100%">
      <ContentContainer
        titleLeft="60px"
        title="Analytics"
        titleBackground={"linear-gradient(186.71deg, #41827E 12.77%, #333333 126.7%)"}
        adminGradient={true}
      >
        <StyledGrid px={2}>
          <h2 style={{ marginTop: "3rem" }}>Artists</h2>
          <StyledGrid item>
            <StyledGrid container>
              <StyledGrid item xs={6} md={4}>
                <Files title="Top 5 vocal files" />
              </StyledGrid>
              <StyledGrid item xs={6} md={4}>
                <Files title="Top 5 vocal files" />
              </StyledGrid>
              <StyledGrid item xs={6} md={4}>
                <Files title="Top 5 vocal files" />
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>

          <h2 style={{ marginTop: "3rem" }}>Vocals</h2>
          <StyledGrid item mb={6}>
            <StyledGrid container>
              <StyledGrid item xs={6} md={4}>
                <Files title="Top 5 vocal files" />
              </StyledGrid>
              <StyledGrid item xs={6} md={4}>
                <Files title="Top 5 vocal files" />
              </StyledGrid>
              <StyledGrid item xs={6} md={4}>
                <Files title="Top 5 vocal files" />
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
  c: {
    minHeight: 569
  }
}))
