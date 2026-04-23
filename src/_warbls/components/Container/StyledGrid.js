import * as React from "react"
import { styled, Grid } from "@material-ui/core"
import { compose, flexbox, palette, spacing, borders, sizing } from "@material-ui/system"

export const StyledGrid = styled(Grid)(compose(spacing, palette, flexbox, borders, sizing))
