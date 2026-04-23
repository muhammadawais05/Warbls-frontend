import { Box, makeStyles, Typography } from "@material-ui/core"
import * as React from "react"
import { SideBar } from "./sidebar"
import { actions } from "../../../redux/orders/actions"
import { useDispatch, useSelector } from "react-redux"
import { Orders } from "../Analytics/Orders"

export const Table = ({ sideBarActivation, setSideBarActivation, setOrder }) => {
  const { table, typo, emailColor, tableContainer, username } = useStyles()
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.order)

  React.useEffect(() => {
    dispatch(actions.getOrders())
  }, [])

  return (
    <div>
      <div className={tableContainer}>
        <table className={table}>
          <thead>
            <tr>
              {heading.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((row, index) => (
              <tr
                key={index}
                onClick={() => {
                  setSideBarActivation(!sideBarActivation)
                  setOrder(row)
                }}
              >
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <Typography className={typo}>{row.order_id}</Typography>
                </td>
                <td align="center">
                  <Typography className={username}>{row.user_details.full_name}</Typography>
                </td>
                <td align="center">
                  <Typography className={emailColor}>{row.user_details.email}</Typography>
                </td>
                <td align="center">
                  <Typography className={typo}>{row.date_added.slice(0, 10)}</Typography>
                </td>
                <td align="center">
                  <Typography className={typo}>{row.order_details.length}</Typography>
                </td>
                <td align="center">
                  <Typography className={typo}>
                    ${row.order_details.reduce((a, c) => a + c.amount, 0)}
                  </Typography>
                </td>
                <td align="center">
                  <Typography className={typo} style={{ textTransform: "uppercase" }}>
                    {row.order_status}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const heading = ["", "ID", "Name", "Email", "Date", "Products", "Price", "Status"]

const useStyles = makeStyles(() => ({
  tableContainer: {
    width: "100%",
    maxWidth: "100%",
    overflow: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    "& thead tr": {
      border: "1px solid white",
      scroll: "auto"
    },
    "& thead tr th": {
      padding: "10px 0px",
      scroll: "auto"
    },
    "& thead tr th:last-child": {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    },
    "& thead tr th:first-child": {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8
    },
    "& tbody tr td": {
      paddingTop: 15,
      paddingBottom: 15,
      scroll: "auto"
      //   borderBottom: "1px solid #000000"
    },
    "& tbody tr:last-child td": {
      paddingTop: 15,
      paddingBottom: 15,
      border: 0
    }
  },
  typo: {
    color: "white"
  },
  username: {
    color: "white"
  },
  emailColor: {
    color: "white"
  }
}))
