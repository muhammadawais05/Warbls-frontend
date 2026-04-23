import { Box, Button, CircularProgress, makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"
import { useFormik } from "formik"
import * as React from "react"
import { useEffect } from 'react';
// import { Select } from "../../../_warbls/components/Form/Select"
import { BiUpload } from "react-icons/bi"
import { BsImageFill } from "react-icons/bs"
import { FaMinus, FaPlus } from "react-icons/fa"
import { HiQuestionMarkCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../redux/track/actions"
import { POST } from "../../../_helpers/fetcher"
import { InputField } from "../../../_warbls/components/Form/Input"
import { bpm, formScript, genres, initValues, key, languages } from "./script"
import { APIs } from "../../../_helpers/apis"
import { schema } from "../Terms/schema"

const { useRef, useState } = React

export const Vocal = ({ reset, vocal, removeVocalCallback }) => {
  const {
    labelClass,
    btn,
    addDelBtn,
    publishBtnStyle,
    input,
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
    success_color
  } = useStyles()
  const inputRef = useRef()
  const imageRef = useRef()
  const [track, setTrack] = useState()
  const [image, setImage] = useState()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.track)
  const [phraseShot, setPhraseShot] = useState()
  const [dry, setDry] = useState()
  useEffect(() => {
    handlePhrase();
    handleOneShot();
    handleDry();
    handleWet();
  }, []);
  // const { auth, userInfo } = useSelector((state) => state.auth)

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      // console.log(values)
    }
  })
  vocal.formik = formik
  const handleSelectFile = () => {
    inputRef.current.click()
  }

  const handleSelectImage = () => {
    imageRef.current.click()
  }

  const handleTrack = async (e) => {
    let file = e.target.files[0]
    if (file) {
      let fd = new FormData()
      fd.append("files", file)
      vocal["track"] = fd
      setTrack({ name: "Please wait file is uploading...", isUploading: true })
      const imageResponse = await POST(APIs.uploadTrack, fd)
      vocal["track_url"] = imageResponse?.data.location
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
      vocal["image_url"] = trackResponse?.data.location
      setImage(file)
    }
  }
  const handlePhrase = () => {
    if (!vocal["is_phrases"]) {
      vocal["is_phrases"] = 1
      vocal["is_oneshot"] = 0
      setPhraseShot("phrase")
    } else {
      vocal["is_phrases"] = 0
      setPhraseShot("")
    }
  }

  const handleOneShot = () => {
    if (!vocal["is_oneshot"]) {
      vocal["is_oneshot"] = 1
      vocal["is_phrases"] = 0
      setPhraseShot("shot")
    } else {
      vocal["is_oneshot"] = 0
      setPhraseShot("")
    }
  }

  const handleDry = () => {
    if (!vocal["is_dry"]) {
      vocal["is_dry"] = 1
      vocal["is_wet"] = 0
      setDry("dry")
    } else {
      vocal["is_dry"] = 0
      setDry("")
    }
  }

  const handleWet = () => {
    if (!vocal["is_wet"]) {
      vocal["is_wet"] = 1
      vocal["is_dry"] = 0
      setDry("wet")
    } else {
      vocal["is_wet"] = 0
      setDry("")
    }
  }

  const handleRemoveVocal = () => {
    removeVocalCallback(vocal)
  }
  return (
    <>
      <Box mt={6} display="flex" className={uploadsBoxes}>
        <input
          type="file"
          ref={inputRef}
          accept="audio/*,video/*"
          onChange={handleTrack}
          className={fileInput}
        />
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          onChange={handleImage}
          className={fileInput}
        />

        <Box
          onClick={handleSelectFile}
          display="flex"
          // bgcolor="#fff"
          justifyContent="space-around"
          alignItems="center"
          borderRadius={5}
          className={`${imgUpload} pointer`}
        >
          <Box p={1}>
            <BiUpload fontSize={22} />
          </Box>
          <Box p={1}>
            <Typography className={typo}>Add vocal file</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          onClick={handleSelectImage}
          px={2}
          //bgcolor="#fff"
          justifyContent="space-around"
          alignItems="center"
          borderRadius={5}
          className={`${imgUpload} pointer`}
        >
          <Box p={1}>
            <BsImageFill fontSize={22} />
          </Box>
          <Box p={1}>
            <Typography className={typo}>Add cover image</Typography>
          </Box>
        </Box>
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
      <Box display="block" className={exampleTypoBox}>
        <Typography className={boldTypo}>
          {" "}
          Correct order for filename: Artist_Name_Song_Name_BPM_KEY &nbsp;
        </Typography>
        <Typography className={boldTypo}>
          Example on valid filename: John_Smith_Hey_You_110_Em.waw&nbsp;
        </Typography>
      </Box>

      {track && (
        <Box
          display="flex"
          className={textBoxes}
          flexDirection="column"
          justifyContent="space-around"
          pt={3}
          pb={0.5}
        >
          <Box display="flex" justifyContent="center">
            <Typography className={boldTypo}>Track:&nbsp;</Typography>
            <Typography className={boldTypo}>
              {" "}
              <span className={success_color}>{track.name}</span>
            </Typography>
          </Box>
        </Box>
      )}
      {image && (
        <Box
          display="flex"
          className={textBoxes}
          flexDirection="column"
          justifyContent="space-around"
          pt={0}
          pb={0}
        >
          <Box display="flex" justifyContent="center">
            <Typography className={boldTypo}>Cover Image:&nbsp;</Typography>
            <Typography className={boldTypo}>
              {" "}
              <span className={success_color}>{image.name}</span>
            </Typography>
          </Box>
        </Box>
      )}

      <Box mt={4} className={inputBox}>
        {formScript.map((field, index) => (
          <InputField
            onChange={(event) => {
              vocal[field.name] = event.target.value
            }}
            label={field.label}
            key={index}
            placeholder={field.placeholder}
            name={field.name}
            type={field.type}
            formik={formik}
            classes={input}
            labelClass={labelClass}
          />
        ))}
      </Box>

      <Box className={inputBox} mb={0} display="flex" justifyContent="space-between">
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
      <Box className={inputBox} mb={0} mt={1} display="flex" justifyContent="space-between">
        <Box
          className={clsx(phraseBox, "pointer", dry === "dry" && phraseShotStyle)}
          onClick={handleDry}
        >
          <Box width="100%" justifyContent="center" display="flex">
            <Typography className={typo}>Dry</Typography>
          </Box>
          <HiQuestionMarkCircle fontSize={25} />
        </Box>
        <Box
          className={clsx(phraseBox, "pointer", dry === "wet" && phraseShotStyle)}
          onClick={handleWet}
        >
          <Box width="100%" justifyContent="center" display="flex">
            <Typography className={typo}>Wet</Typography>
          </Box>
          <HiQuestionMarkCircle fontSize={25} />
        </Box>
      </Box>

      <Box mt={1} className={inputBox} display="flex" justifyContent="space-between">
        <Select
          options={genres.sort((a, b) => a.label.localeCompare(b.label))}
          classes={selectStyle}
          formik={formik}
          name="genre"
          onChange={(event) => {
            vocal["genre"] = event.target.value
          }}
        />
        <Select
          options={languages.sort((a, b) => a.label.localeCompare(b.label))}
          classes={selectStyle}
          formik={formik}
          name="language"
          onChange={(event) => {
            vocal["language"] = event.target.value
          }}
        />
        <Select
          options={bpm}
          classes={selectStyle}
          formik={formik}
          name="bpm"
          onChange={(event) => {
            vocal["bpm"] = event.target.value
          }}
        />
        <Select
          options={key.sort((a, b) => a.label.localeCompare(b.label))}
          classes={selectStyle}
          formik={formik}
          name="key"
          onChange={(event) => {
            vocal["key"] = event.target.value
          }}
        />
      </Box>

      <Box my={1} className={btnWrapper} display="flex">
        <Box
          justifyContent="center"
          display="flex"
          className={addDelBtn}
          onClick={handleRemoveVocal}
        >
          <FaMinus fontSize={20}></FaMinus>
        </Box>
      </Box>
    </>
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
  uploadsBoxes: {
    width: "45%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      width: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      justifyContent: "space-between"
    }
  },
  textBoxes: {
    width: "50%",
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
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 64,
    paddingRight: 64,
    [theme.breakpoints.down("md")]: {
      width: "70%",
      paddingLeft: 0,
      paddingRight: 0
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      paddingLeft: 0,
      paddingRight: 0
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      paddingLeft: 0,
      paddingRight: 0
    }
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
    border: "1px solid #969696",
    color: theme.palette.primary.contrastText,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  select: {
    backgroundColor: `${theme.palette.primary.contrastText}00`,
    color: `${theme.palette.primary.contrastText}`,
    borderRadius: 5,
    border: `1px solid ${theme.palette.primary.contrastText}`,
    padding: "6px 7px",
    //        width: "11%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "5px 0px",
      padding: "12px 7px"
    }
  },
  selectStyle: {
    //       width: "24% !important",
    //border: "0px",
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 5
  },
  phraseShotStyle: {
    border: "2px solid #86DB78"
  }
}))

export const Select = ({ options, name, formik, onChange }) => {
  const { select, selectStyle } = useStyles()

  return (
    <span style={{ flexDirection: "column", display: "flex", width: "24%" }}>
      <select
        onChangeCapture={onChange}
        className={clsx(select, selectStyle)}
        {...formik.getFieldProps(name)}
      >
        {options.map((o, index) => (
          <option key={index} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] && (
        <small className={clsx("error")}>{formik.errors[name]}</small>
      )}
    </span>
  )
}
