import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsCloudDownload } from "react-icons/bs"
import { Button, makeStyles, Typography } from "@material-ui/core"
import { Row } from "../../../_warbls/components/Flex/Row"
import { Column } from "../../../_warbls/components/Flex/Column"
import styles from "./sidebar.module.css"
import { BiSelectMultiple } from "react-icons/bi"

export const SideBar = ({ setSideBarCheck, sideBarCheck, order }) => {
  const { table, tableContainer, typo, helperText, title, img } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_bar}>
        <h4>Order# &nbsp;&nbsp;&nbsp;&nbsp;{order?.order_id}</h4>
        <span className={styles.close_icon} onClick={(e) => setSideBarCheck(!sideBarCheck)}>
          <AiOutlineClose />
        </span>
      </div>
      <h6 className={styles.email}>{order?.user_details.email}</h6>
      <h6 className={styles.pay_status}>
        <span className={styles.pay_status_icon}>
          <BiSelectMultiple />
        </span>
        Paid
      </h6>
      <h6 className={styles.pay_date}>{order?.date_added.slice(0, 10)}</h6>
      <div className={tableContainer}>
        <table className={table}>
          <thead>
            <tr align="left">
              {heading.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order?.order_details.map((row, index) => (
              <tr key={index}>
                <td align="left">
                  <img src={row.track_details.image_url} alt="" className={img} />
                </td>

                <td align="left">
                  <Column>
                    <Typography variant="h6" className={`${title} truncate`}>
                      {row.track_details.track_name}
                    </Typography>
                    <small className={helperText}>{order.user_details.fullname}</small>
                  </Column>
                </td>
                <td align="center">
                  <Typography className={typo}>$ {row.track_details.price}</Typography>
                </td>
                <td align="center">
                  <Typography className={typo}>
                    ${" "}
                    {(
                      row.track_details.price - (row.track_details.price === "4.90" ? 2.8 : 0.7)
                    ).toFixed(2)}
                  </Typography>
                </td>
              </tr>
            ))}
            <tr>
              <td align="left">
                <Typography variant="h6" style={{ fontWeight: "bolder" }} mt={1}>
                  Total
                </Typography>
              </td>
              <td align="left">
                <Column></Column>
              </td>
              <td align="center">
                <Typography className={typo} style={{ fontWeight: "bolder" }}>
                  $ {order?.order_details.reduce((a, c) => a + c.amount, 0).toFixed(2)}
                </Typography>
              </td>
              <td align="center">
                <Typography className={typo} style={{ fontWeight: "bolder" }}>
                  ${" "}
                  {order?.order_details
                    .reduce(
                      (a, c) =>
                        a +
                        (c.track_details.price - (c.track_details.price === "4.90" ? 2.1 : 0.7)),
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const heading = ["", "Order Summary", "Revenue ", "Profit"]

const useStyles = makeStyles(() => ({
  tableContainer: {
    margin: "2rem 0",
    width: "100%",
    maxWidth: "100%",
    overflow: "auto"
  },

  table: {
    width: "100%",
    overflow: "scroll",
    maxWidth: "100%",
    borderCollapse: "collapse",
    "& thead tr": {
      border: "1px solid white",
      scroll: "auto"
    },
    "& thead tr th": {
      minWidth: "50px",
      paddingBlock: "10px",
      scroll: "auto"
    },
    "& tbody tr td": {
      paddingTop: 5,
      paddingBottom: 5,
      scroll: "auto"
    },
    "& tbody tr:last-child td": {
      paddingTop: 5,
      paddingBottom: 5,
      border: 0
    }
  },
  typo: {
    marginTop: 5,
    color: "white"
  },
  helperText: {
    color: "#9F9F9F"
  },
  title: {
    marginTop: 5,
    fontSize: 17,
    width: 170
  },
  img: {
    marginTop: 5,
    width: 40
  }
}))
