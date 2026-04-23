import * as React from "react"
import { Box, Typography } from "@material-ui/core"
import { VocalsTable } from "../../../_warbls/components/Vocals"
import { ContentContainer } from "../../../_warbls/components/Container"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { heading, smHeading } from "./script"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/track/actions"

const { useEffect, useState } = React

export const Downloads = () => {
  return (
    <Box p={{ md: 4, sm: 0 }} pt={0} width="100%">
      {/* <StyledContainer p={0} my={2}>
        <Typography variant="h6">Downloads</Typography>
      </StyledContainer> */}
      <ContentContainer
        gradient={"larger"}
        titleBackground="linear-gradient(to bottom, rgba(255, 0, 229, 0.8) , rgb(255 255 255 / 0%))"
        titleLeft="25px"
        title="Downloads"
      >
        <VocalsTable
          heading={heading}
          smHeading={smHeading}
          download={true}
          heart={false}
          downloadCheck={true}
        />
      </ContentContainer>
    </Box>
  )
}
