import * as React from "react"
import { Typography, Box, InputBase, makeStyles } from "@material-ui/core"
import { FaSearch } from "react-icons/fa"

export const AdminFilter = ({ title, length, placeholder }) => {
  const { inputField, inputSelect, searchIcon } = useStyles()

  return (
    <Box width="100%" py={3}>
      <Box display="flex" alignItems="center" width="100%">
        <FaSearch fontSize={20} className={searchIcon} />
        <InputBase className={inputField} placeholder={placeholder} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  inputField: {
    width: "100%",
    marginInline: "20px"
  },
  inputSelect: {
    width: "20%",
    border: 0,
    borderRight: "1px solid #000000"
  },
  searchIcon: {
    margin: "0px 10px"
  }
}))
