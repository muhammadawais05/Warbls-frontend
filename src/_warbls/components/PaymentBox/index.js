import * as React from "react"
import { Box, makeStyles } from "@material-ui/core"
import { SvgInline } from "../Svg"

export const PaymentBox = () => {
  const { td } = useStyles()

  return (
    <Box display="flex" flexDirection="column">
      <table>
        <tbody>
          {priceList.map((row, index) => (
            <tr key={index}>
              <td className={td}>{row.label}</td>
              <td className={td}>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box display="flex" justifyContent="space-between">
        <Box
          width="175px"
          height="157px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#C4C4C4"
          borderRadius="5px"
        >
          <SvgInline src="/media/paypal.svg" w="100px" h="100px" />
        </Box>
        <Box
          width="175px"
          height="157px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#C4C4C4"
          borderRadius="5px"
        >
          <SvgInline src="/media/stripe.svg" w="100px" h="100px" />
        </Box>
      </Box>
    </Box>
  )
}

const priceList = [
  { label: "Balance", price: "$8900" },
  { label: "Balance / Withdraw", price: "$4499" },
  { label: "Artists Earned", price: "$4500" },
  { label: "Artists withdraw total", price: "$3200" }
]

const useStyles = makeStyles((theme) => ({
  td: {
    fontSize: 17,
    fontStyle: "normal",
    color: theme.palette.primary.main,
    paddingTop: 4,
    paddingBottom: 4
  }
}))
