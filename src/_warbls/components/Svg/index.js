import * as React from "react"
import SVG from "react-inlinesvg"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"

export const SvgInline = (props) => {
  return (
    <SVG
      className={props.classes}
      src={toAbsoluteUrl(props.src)}
      width={props.w}
      height={props.h}
    />
  )
}
