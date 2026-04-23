import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { useFormik } from "formik"
import * as React from "react"
import { FaPlus } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/track/actions"
import { initValues } from "./script"
import { Vocal } from "./Vocal"
import { store } from "../../../redux/store"
import { schema } from "./schema"
import { VideoCall } from "@material-ui/icons"
const { useRef, useState } = React

export const AddVocal = ({}) => {
  const { btn, addDelBtn, publishBtnStyle, btnWrapper } = useStyles()

  const [vocals, setVocals] = useState([
    {
      ...initValues,
      id: new Date().getTime(),
      added_by: store.getState().auth.userInfo.user_id,
      formik: null
    }
  ])

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.track)

  // const formik = useFormik({
  //   initialValues: initValues,
  //   validationSchema: schema,
  //   onSubmit: async (values, { resetForm }) => {
  //     console.log(values)

  //     dispatch(actions.uploadTrackRequest(vocals))
  //   }
  // })

  const handlePublish = async () => {
    vocals.forEach((vocal) => {
      vocal.formik.handleSubmit()
    })
    setTimeout(function () {
      let isValid = true
      vocals.forEach((vocal) => {
        vocal.is_phrases == 1 && (vocal.price = 4.9)
        vocal.is_oneshot == 1 && (vocal.price = 1.9)
        vocal.formik.handleSubmit()
        isValid = isValid && vocal.formik.isValid && !!vocal.track_url && !!vocal.image_url
      })
      if (isValid) {
        dispatch(actions.uploadTrackRequest(vocals))
      }
    }, 0)
  }
  const handleAddVocal = () => {
    let vcls = [...vocals, { ...initValues, id: new Date().getTime() }]
    setVocals(vcls)
  }
  const handleRemoveVocal = ({ id }) => {
    let vcls = vocals.filter((v) => v.id != id)
    setVocals(vcls)
  }

  return (
    <>
      {vocals.map((vocal, index) => (
        <Vocal key={vocal.id} vocal={vocal} removeVocalCallback={handleRemoveVocal} />
      ))}
      <Box my={2} className={btnWrapper} display="flex">
        <Box justifyContent="center" display="flex" className={addDelBtn} onClick={handleAddVocal}>
          <FaPlus fontSize={20}></FaPlus>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handlePublish}
          // onClick={formik.handleSubmit}
          className={clsx(btn, publishBtnStyle)}
          disableElevation
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Publish"}
        </Button>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "64px",
    paddingRight: "64px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  },

  addDelBtn: {
    width: "15%",
    borderRadius: 5,
    padding: 10,
    marginRight: 7,
    cursor: "pointer",
    //paddingBottom: 10,
    border: `1px solid`,
    //backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      //backgroundColor: theme.palette.primary.main
    }
  },
  btn: {
    width: "100%",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  publishBtnStyle: {
    width: "85%",
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  }
}))
