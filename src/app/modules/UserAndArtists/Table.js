import { Box, Button, makeStyles, Typography, Grid } from "@material-ui/core"
import * as React from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { Row } from "../../../_warbls/components/Flex/Row"
import { actions } from "../../../redux/auth/actions"
import { useDispatch } from "react-redux"
import swal from "sweetalert"

export const Table = ({
  users,
  currentUser,
  setCurrentUser,
  sideBarActivation,
  setSideBarActivation
}) => {
  const {
    table,
    deleteBtn,
    activeBtn,
    btn,
    emailColor,
    typo,
    artistStyle,
    userStyle,
    tableContainer
  } = useStyles()
  const dispatch = useDispatch()

  const handleUserType = (type, id) => {
    dispatch(actions.userUpdateRequest({ user_type: type }, id))
  }
  const handleRemoveUser = (isSuspend, id) => {
    swal({
      title: "Are you sure?",
      text: "Once action performed, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Action has been performed successfully!", {
          icon: "success"
        })
        dispatch(actions.removeAccountRequest({ is_suspended: isSuspend }, id, false))
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
            <th>
              <BsFillTrashFill fontSize={20} color={"red"} />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((row, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td align="center">
                <Typography className={typo}>{row.user_id}</Typography>
              </td>
              <td align="center">
                <Typography className={typo}>{row.full_name}</Typography>
              </td>
              <td align="center">
                <Typography className={emailColor}>{row.email}</Typography>
              </td>
              <td align="center">
                <Typography className={typo}>{setUserType(row.user_type)}</Typography>
              </td>
              <td align="center">
                <Row jc="center" width="100%">
                  {/* <Button className={btn} onClick={() => handleViewUser(row)}>
                    View
                  </Button> */}

                  <Button
                    className={setUserType(row.user_type) === "artist" ? artistStyle : btn}
                    onClick={() => handleUserType(2, row.user_id)}
                  >
                    Artist
                  </Button>
                  <Button
                    className={setUserType(row.user_type) === "user" ? userStyle : btn}
                    onClick={() => {
                      setCurrentUser(row)

                      setSideBarActivation(!sideBarActivation)
                    }}
                  >
                    Form
                  </Button>
                  {/* <Button className={btn} onClick={() => handleUserType(null, row.user_id)}>
                    User
                  </Button> */}
                </Row>
              </td>
              <td align="center">
                {row.is_suspended === 1 ? (
                  <Button className={activeBtn} onClick={() => handleRemoveUser(0, row.user_id)}>
                    Active
                  </Button>
                ) : (
                  <Button className={deleteBtn} onClick={() => handleRemoveUser(1, row.user_id)}>
                    <BsFillTrashFill fontSize={23} />
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

const setUserType = (type) => {
  return type === 1 ? "admin" : type === 2 ? "artist" : "user"
}

const heading = ["", "ID", "Name", "Email", "Type", "Actions"]

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
      overflow: "auto",
      scroll: "auto"
    },
    "& thead tr th": {
      minWidth: "50px",
      paddingBlock: "10px",
      overflow: "auto",
      scroll: "auto"
    },
    "& tbody tr td": {
      paddingTop: 5,
      paddingBottom: 5,
      overflow: "auto",
      scroll: "auto"
    }
  },

  deleteBtn: {
    backgroundColor: "rgba(255, 0, 0, 0.75)",
    color: "white",
    maxWidth: "30px",
    marginTop: 10,
    border: "1px solid rgba(255, 0, 0, 0.75)",
    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0.75)",
      color: "#000000"
    }
  },
  btn: {
    backgroundColor: "transparent",
    color: "white",
    marginTop: 10,
    border: "1px solid white",
    margin: "0px 3px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#86DB78"
    }
  },
  artistStyle: {
    marginTop: 10,
    backgroundColor: "#86DB78",
    color: "white",
    margin: "0px 3px",
    textTransform: "none"
  },
  userStyle: {
    marginTop: 10,
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid #86DB78",
    margin: "0px 3px",
    textTransform: "none"
  },
  emailColor: {
    marginTop: 10,
    color: "white"
  },
  activeBtn: {
    backgroundColor: "#86DB78",
    color: "white",
    marginTop: 10,
    textTransform: "none",
    border: "1px solid #86DB78"
  },
  typo: {
    marginTop: 10,
    color: "white"
  }
}))
