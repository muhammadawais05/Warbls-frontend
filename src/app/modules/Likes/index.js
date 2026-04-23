import * as React from "react"
import { Box, Typography } from "@material-ui/core"
import { VocalsTable } from "../../../_warbls/components/Vocals"
import { ContentContainer } from "../../../_warbls/components/Container"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { heading } from "./script"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { actions } from "../../../redux/track/actions"

const { useEffect, useState } = React

export const Likes = () => {
    
  return (
    <Box p={{ md: 4, sm: 0 }} px={{ sm: 0, xs: 0 }} pt={0} width="100%">
      {/* <StyledContainer p={0} my={2}>
        <Typography variant="h6">Likes</Typography>
      </StyledContainer> */}
      <ContentContainer titleBackground="linear-gradient(to bottom, rgba(0, 255, 194, 0.8) , rgb(255 255 255 / 0%))" titleLeft="25px" title="Likes" gradient={'larger'}>
        <VocalsTable
          heading={heading} 
          download={false}
          heart={true} 
        />
      </ContentContainer>
    </Box>
  )
}
