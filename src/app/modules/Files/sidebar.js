import React, { useState } from "react"
import clsx from "clsx"
import { useFormik } from "formik"
import { AiOutlineClose } from "react-icons/ai"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { BiSelectMultiple } from "react-icons/bi"
import { HiQuestionMarkCircle } from "react-icons/hi"
import { BsPencilSquare } from "react-icons/bs"
import {
  AiFillPlayCircle,
  AiFillHeart,
  AiOutlineCloudDownload,
  AiFillDollarCircle
} from "react-icons/ai"
import styles from "./sidebar.module.css"
import swal from "sweetalert"
import { useSelector, useDispatch } from "react-redux"
import { bpm, formScript, genres, initValues, key, languages } from "../Terms//script"
import { schema } from "../Terms/schema"
import { APIs } from "../../../_helpers/apis"
import { POST } from "../../../_helpers/fetcher"
import { actions } from "../../../redux/track/actions"
import { actions as authActions } from "../../../redux/auth/actions"
import { AddVocal } from "../Terms/AddVocal"
export const SideBar = ({ setSideBarCheck, sideBarCheck, vocal, filters, setFilters }) => {
  const inputRef = React.useRef()
  const imageRef = React.useRef()
  const [track, setTrack] = useState()
  const [image, setImage] = useState()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.track)
  const [phraseShot, setPhraseShot] = useState()
  const [dry, setDry] = useState()
  const [vocalName, setVocalName] = React.useState(vocal?.track_name)

  const {
    uploadsBoxes,
    selectStyle,
    typo,
    fileInput,
    boldTypo,
    phraseBox,
    textBoxes,
    inputBox,
    btnWrapper,
    imgUpload,
    phraseShotStyle,
    exampleTypoBox,
    success_color,
    dryBox
  } = useStyles()

  React.useEffect(() => {
    setTrack(null)
    setImage(null)
    setVocalName(vocal?.track_name)

    setFilters({
      ...filters,
      bpm: vocal?.bpm || "",
      key: vocal?.key || "",
      language: vocal?.language || "",
      gener: vocal?.genre || "",
      isOneShot: vocal?.is_oneshot && 1,
      isPhrase: vocal?.is_phrases && 1,
      isDry: vocal?.is_dry && 1,
      isWet: vocal?.is_wet && 1
    })
    setPhraseShot((vocal?.is_phrases && "phrase") || (vocal?.is_oneshot && "shot"))
    setDry((vocal?.is_dry && "dry") || (vocal?.is_wet && "wet"))
  }, [vocal])
  // console.log("filters value", filters)
  // console.log("vocal is", vocal)

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      // console.log(values)
    }
  })
  // vocal.formik = formik

  const handleTrack = async (e) => {
    let file = e.target.files[0]
    if (file) {
      let fd = new FormData()
      fd.append("files", file)
      vocal["track"] = fd
      setTrack({ name: "Please wait file is uploading...", isUploading: true })
      const imageResponse = await POST(APIs.uploadTrack, fd)
      vocal["image_url"] = imageResponse?.data.location
      setTrack(file)
    }
  }

  const handleImage = async (e) => {
    let file = e.target.files[0]
    if (file) {
      let fd = new FormData()
      fd.append("files", file)
      vocal["image"] = fd
      setImage({ name: "Please wait file is uploading...", isUploading: true })
      const trackResponse = await POST(APIs.uploadTrack, fd)
      vocal["track_url"] = trackResponse?.data.location
      setImage(file)
    }
  }

  const handlePhrase = () => {
    if (!filters.isPhrase) {
      setFilters({ ...filters, isPhrase: 1, isOneShot: 0 })

      setPhraseShot("phrase")
    } else {
      setFilters({ ...filters, isPhrase: 0 })
      setPhraseShot("")
    }
  }

  const handleOneShot = () => {
    if (!filters.isOneShot) {
      setFilters({ ...filters, isPhrase: 0, isOneShot: 1 })

      setPhraseShot("shot")
    } else {
      setFilters({ ...filters, isOneShot: 1 })
      setPhraseShot("")
    }
  }

  const handleDry = () => {
    if (!filters.isDry) {
      setFilters({ ...filters, isWet: 0, isDry: 1 })
      setDry("dry")
    } else {
      setFilters({ ...filters, isDry: 0 })
      setDry("")
    }
  }

  const handleWet = () => {
    if (!vocal["is_wet"]) {
      setFilters({ ...filters, isDry: 0, isWet: 1 })

      setDry("wet")
    } else {
      setFilters({ ...filters, isWet: 0 })
      setDry("")
    }
  }

  const handleSelectFile = () => {
    inputRef.current.click()
  }

  const handleSelectImage = () => {
    imageRef.current.click()
  }

  const handleSave = (track) => {
    const payload = {
      is_wet: parseInt(filters.isWet),
      is_dry: parseInt(filters.isDry),
      is_oneshot: parseInt(filters.isOneShot),
      is_pharses: parseInt(filters.isPhrase),
      language: filters.language,
      bpm: parseInt(filters.bpm),
      key: filters.key,
      genre: filters.gener,
      track_name: vocalName,
      log: JSON.stringify({ log_added_by: userInfo.user_id })
    }
    const id = track.track_id
    swal({
      title: "Are you sure?",
      text: "Once action performed, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Action has been perfomed succesfully!", {
          icon: "success"
        })
        dispatch(actions.updateTracksRequest(payload, id))
      } else {
        swal("Cancelled! Your data is safe")
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_bar}>
        <h4>Vocal# &nbsp;&nbsp;&nbsp;&nbsp;{vocal?.track_id}</h4>
        <div className={styles.stats_wrapper}>
          <span>
            <AiFillPlayCircle /> <p>0</p>
          </span>
          <span>
            <AiFillHeart />
            <p>{vocal?.liked}</p>
          </span>
          <span>
            <AiOutlineCloudDownload />
            <p>{vocal?.download}</p>
          </span>
          <span>
            <AiFillDollarCircle />
            <p>{vocal?.price}</p>
          </span>
        </div>
        <span className={styles.close_icon} onClick={(e) => setSideBarCheck(!sideBarCheck)}>
          <AiOutlineClose />
        </span>
      </div>

      <h6 className={styles.email}>{vocal?.user_details?.email || "N/A"}</h6>
      <h6 className={styles.name}>{vocal?.user_details?.full_name || "N/A"}</h6>

      <div className={styles.vocal_input_container}>
        <form>
          <input
            type="text"
            value={vocalName}
            className={styles.vocal_input}
            onChange={(e) => {
              e.preventDefault()
              setVocalName(e.target.value)
            }}
          />
        </form>
        <span>
          <BsPencilSquare />
        </span>
      </div>

      <Box display="flex" className={uploadsBoxes}>
        <Box
          display="flex"
          //bgcolor="#fff"
          justifyContent="space-around"
          alignItems="center"
        ></Box>
      </Box>

      <Box display="flex" className={uploadsBoxes}>
        <Box
          display="flex"
          //bgcolor="#fff"
          justifyContent="space-around"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            onClick={handleSelectImage}
            px={2}
            //bgcolor="#fff"
            justifyContent="space-around"
            alignItems="center"
          >
            {typeof track != "object" && (
              <small className={clsx("error")}>track file is required</small>
            )}
          </Box>
          <Box
            display="flex"
            onClick={handleSelectImage}
            px={2}
            //bgcolor="#fff"
            justifyContent="space-around"
            alignItems="center"
          >
            {typeof image != "object" && (
              <small className={clsx("error")}>image file is required</small>
            )}
          </Box>
        </Box>
      </Box>
      <Box className={inputBox} mb={0} mt={2} display="flex" justifyContent="space-between">
        <Box
          className={clsx(phraseBox, "pointer", phraseShot === "phrase" && phraseShotStyle)}
          onClick={handlePhrase}
        >
          <Box width="100%" justifyContent="center" display="flex">
            <Typography className={typo}>Phrase(s)</Typography>
          </Box>
          <HiQuestionMarkCircle fontSize={25} />
        </Box>

        <Box
          className={clsx(phraseBox, "pointer", phraseShot === "shot" && phraseShotStyle)}
          onClick={handleOneShot}
        >
          <Box width="100%" justifyContent="center" display="flex">
            <Typography className={typo}>One-Shot</Typography>
          </Box>
          <HiQuestionMarkCircle fontSize={25} />
        </Box>
      </Box>

      <Box
        mt={1}
        className={inputBox}
        display="flex"
        justifyContent="space-between"
        style={{ columnGap: ".5rem" }}
      >
        <Select
          options={genres.sort((a, b) => a.label.localeCompare(b.label))}
          classes={selectStyle}
          formik={formik}
          value={filters.gener}
          name="gener"
          setHandle={(value) => {
            setFilters({
              ...filters,
              gener: value
            })
          }}
        />
        <Select
          options={languages.sort((a, b) => a.label.localeCompare(b.label))}
          classes={selectStyle}
          formik={formik}
          value={filters.language}
          name="language"
          setHandle={(value) => {
            setFilters({
              ...filters,
              language: value
            })
          }}
        />
        <Select
          options={bpm}
          classes={selectStyle}
          value={filters.bpm}
          formik={formik}
          name="bpm"
          setHandle={(value) => {
            setFilters({
              ...filters,
              bpm: value
            })
          }}
        />
        <Select
          options={key.sort((a, b) => a.label.localeCompare(b.label))}
          classes={selectStyle}
          formik={formik}
          value={filters.key}
          name="key"
          setHandle={(value) => {
            setFilters({
              ...filters,
              key: value
            })
          }}
        />
      </Box>
      <div className={styles.vocal_results}>
        <button className={styles.valid_btn}>Valid</button>
        <p>{vocal?.status === "active" ? "Published" : "Not Published"}</p>
        <span>{vocal?.status === "active" ? <BiSelectMultiple /> : <AiOutlineClose />}</span>
        <Box
          className={inputBox}
          mt={-1}
          display="flex"
          justifyContent="space-between"
          flexDirection={"column"}
          style={{ rowGap: ".5rem" }}
        >
          <Box
            className={clsx(dryBox, "pointer", dry === "dry" && phraseShotStyle)}
            onClick={handleDry}
          >
            <Box width="100%" justifyContent="center" display="flex">
              <Typography style={{ color: "white" }}>Dry</Typography>
            </Box>
          </Box>
          <Box
            className={clsx(dryBox, "pointer", dry === "wet" && phraseShotStyle)}
            onClick={handleWet}
          >
            <Box width="100%" justifyContent="center" display="flex">
              <Typography style={{ color: "white" }}>Wet</Typography>
            </Box>
          </Box>
        </Box>
      </div>
      <button className={styles.save_btn} onClick={() => handleSave(vocal)}>
        Save
      </button>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  typo: {
    color: `${theme.palette.primary.contrastText} !important`,
    "&.MuiTypography-body1": {
      fontSize: 17,
      fontWeight: 500,
      color: "#000000",
      wordSpacing: 2,
      [theme.breakpoints.down("sm")]: {
        fontSize: 14
      }
    }
  },
  success_color: {
    color: theme.palette.success.main
  },
  exampleTypoBox: {
    width: "100%",
    margin: "auto",
    marginTop: "2rem",
    textAlign: "center",
    "& .MuiTypography-body1": {
      color: theme.palette.primary.contrastText + " !important"
    }
  },
  listStyle: {
    listStyle: "disk"
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
      //  backgroundColor: theme.palette.primary.main
    }
  },
  publishBtnStyle: {
    width: "85%",
    backgroundColor: "#86DB78",
    "&:hover": {
      backgroundColor: "#477b3f"
    }
  },
  input: {
    backgroundColor: "#ffffff00"
  },
  labelClass: {
    fontSize: 16,
    fontWeight: 500,
    color: "#000000"
  },

  fileInput: {
    display: "none"
  },
  boldTypo: {
    "&.MuiTypography-body1": {
      fontSize: 17,
      fontWeight: 500,
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.down("sm")]: {
        fontSize: 14
      }
    }
  },
  phraseBox: {
    //backgroundColor: "#ffffff",
    borderColor: theme.palette.primary.contrastText,
    border: "1px solid",
    padding: 8,
    width: "49%",
    borderRadius: 5,
    display: "flex",
    alignItems: "center"
  },
  dryBox: {
    borderColor: theme.palette.primary.contrastText,
    border: "1px solid",
    padding: 3,
    width: "100%",
    borderRadius: 5,
    display: "flex",
    alignItems: "center"
  },
  uploadsBoxes: {
    // border: "1px solid white",
    width: "100%",
    columnGap: ".5rem",
    justifyContent: "space-between"
  },
  textBoxes: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("md")]: {
      width: "70%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  inputBox: {
    width: "100%"
  },
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
  imgUpload: {
    width: "100%",
    height: "80px",
    textAlign: "center",
    border: "1px solid #969696",
    color: theme.palette.primary.contrastText,
    paddingLeft: 16,
    paddingRight: 16
  },
  select: {
    backgroundColor: `${theme.palette.primary.contrastText}00`,
    color: `${theme.palette.primary.contrastText}`,
    borderRadius: 5,
    border: `1px solid ${theme.palette.primary.contrastText}`,
    padding: "6px 7px"
  },
  selectStyle: {
    width: "80%",
    color: "white",
    backgroundColor: "transparent",
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 5
  },
  phraseShotStyle: {
    border: "2px solid #86DB78"
  }
}))

export const Select = ({ options, value, haddleQueryParams, setHandle }) => {
  const { select, selectStyle } = useStyles()
  // useEffect(haddleQueryParams, [value])

  return (
    <select
      value={value}
      onChange={({ target }) => setHandle(target.value)}
      className={clsx(select, selectStyle)}
    >
      {options.map((o, index) => (
        <option key={index} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
