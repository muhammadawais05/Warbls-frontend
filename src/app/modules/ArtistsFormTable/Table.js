import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import * as React from "react"
import { actions } from "../../../redux/artist/actions"
import { useDispatch } from "react-redux"
import { BsFillTrashFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import swal from "sweetalert"

export const Table = ({ artists }) => {
  const { table, deleteBtn, activeBtn, emailColor, typo, tableContainer } = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const handleArtistUpdate = (id, status) => {
    swal({
      title: "Are you sure?",
      text: "Once action performed, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          actions.updateArtistsRequest(
            {
              status,
              log: JSON.stringify({ log_added_by: userInfo?.user_id })
            },
            id
          )
        )
        swal("Poof! Action has been perfomed succesfully!", {
          icon: "success"
        })
      } else {
        swal("Cancelled! Your data is safe")
      }
    })
  }

  return (
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
          {artists.map((row, index) => (
            <tr key={index} style={{ marginTop: "20px" }}>
              <td>
                <input type="checkbox" />
              </td>
              <td align="center">
                <Typography className={typo}>{row.user_id}</Typography>
              </td>
              <td align="center">
                <Typography className={typo}>{row.status}</Typography>
              </td>

              <td align="center">
                <Typography className={typo}>{row.vocals}</Typography>
              </td>
              <td align="center">
                <Typography className={emailColor}>{row.platform_link}</Typography>
              </td>
              <td align="center">
                <Typography className={typo}>{row.previous_work}</Typography>
              </td>
              <td align="center">
                <Typography className={typo}>{row.sm_link}</Typography>
              </td>
              <td align="center">
                <Typography className={typo}>
                  {new Date(row.date_added).toLocaleDateString()}
                </Typography>
              </td>
              <td align="right" style={{ marginLeft: "20px", display: "flex" }}>
                {row.status !== "approved" && (
                  <Button
                    className={activeBtn}
                    onClick={() => handleArtistUpdate(row.form_id, "approved")}
                  >
                    Approve
                  </Button>
                )}
                {row.status !== "rejected" && (
                  <Button
                    className={deleteBtn}
                    onClick={() => handleArtistUpdate(row.form_id, "rejected")}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const heading = [
  "",
  "ID",
  "Status",
  "Vocals",
  "Platform Link",
  "Previous Work",
  "Sm Link",
  "Date Added",
  "Actions"
]

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
      minWidth: "50px",
      paddingBlock: "10px",
      scroll: "auto"
    },
    "& tbody tr td": {
      paddingTop: 5,
      paddingBottom: 5,
      scroll: "auto"
    }
  },
  deleteBtn: {
    backgroundColor: "rgba(255, 0, 0, 0.75)",
    color: "white",
    paddingInline: 13,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0.75)",
      color: "white"
    }
  },
  emailColor: {
    color: "white"
  },
  activeBtn: {
    backgroundColor: "#86DB78",
    color: "white",
    margin: "0 5px 0 0",
    textTransform: "capitalize"
  },
  typo: {
    color: "white"
  }
}))
