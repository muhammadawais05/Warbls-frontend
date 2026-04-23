import * as React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import { AdminFilter } from "../../../_warbls/components/DashboardFilter"
import { Table } from "./Table"
import { actions } from "../../../redux/artist/actions"
import { useDispatch, useSelector } from "react-redux"
import { ContentContainer } from "../../../_warbls/components/Container"

const { useEffect } = React

export const ArtistFormTable = () => {
  const { typo, table } = useStyles()
  const dispatch = useDispatch()
  const { artists } = useSelector((state) => state.artist)

  useEffect(() => {
    dispatch(actions.getArtistsRequest())
  }, [])

  return (
    <ContentContainer
      titleLeft="60px"
      title="User & Artists"
      titleBackground={"linear-gradient(186.71deg, #41827E 12.77%, #333333 126.7%)"}
      adminGradient={true}
    >
      <Box width="90%" mx={"auto"} className={table}>
        <StyledGrid>
          <StyledGrid item>
            <AdminFilter placeholder="Search users and artists..." />
            <Table artists={artists} />
          </StyledGrid>
          {/* <StyledGrid item xs={3} px={2}>
          <PaymentBox />
        </StyledGrid> */}
        </StyledGrid>
      </Box>
    </ContentContainer>
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
  table: {
    "@media (max-width:969px)": {
      marginTop: "16rem"
    }
  }
}))
