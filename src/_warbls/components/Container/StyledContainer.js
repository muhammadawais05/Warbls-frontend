import * as React from "react"
import { styled, Container } from "@material-ui/core"
import { compose, flexbox, palette, spacing, borders, sizing } from "@material-ui/system"

export const StyledContainer = styled(Container)(
  compose(spacing, palette, flexbox, borders, sizing)
)
