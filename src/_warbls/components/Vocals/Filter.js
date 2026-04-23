import * as React from "react"
import { Box, makeStyles, InputBase, Typography, Tooltip, styled } from "@material-ui/core"

import { FaSearch } from "react-icons/fa"
import clsx from "clsx"
import { languages, bpm, key, genres, popular } from "./script"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import RangeSlider from "../RangeSlider/index"
import Button from "@mui/material/Button"
import { tooltipClasses } from "@mui/material/Tooltip"

const { useState, useRef } = React

export const Filter = ({ filters, setFilters }) => {
  const {
    root,
    search,
    searchIcon,
    inputRoot,
    inputInput,
    langs,
    filterBox,
    phraseBox,
    typo,
    phraseBox1,
    phrase,
    active
  } = useStyles()
  const history = useHistory()
  const cart = useSelector((state) => state.track.cart || [])
  const [bpmValue, setBpmValue] = useState([50, 200])
  const [showBpmTooltip, setShowBpmTooltip] = useState(false)
  const bpmref = useRef(null)

  const handleBPMFilters = (e) => {
    if (bpmValue[0] > 50) {
      setFilters({ ...filters, bpm: bpmValue[0] })
    }
    setShowBpmTooltip(false)
  }

  return (
    <Box className={root}>
      <Box display="flex" flexDirection="column" width="20%" style={{ rowGap: "5px" }}>
        <Box
          className={clsx(phraseBox, phrase, "pointer", {
            [active]: filters.isPhrase == "1" && filters.isOneShot == "1"
          })}
          onClick={() => {
            setFilters({
              ...filters,
              isPhrase: filters.isPhrase == "1" && filters.isOneShot == "1" ? "" : "1",
              isOneShot: filters.isPhrase == "1" && filters.isOneShot == "1" ? "" : "1"
            })
          }}
        >
          <Box width="100%" justifyContent="center" display="flex">
            <Typography className={typo}>Phrases & One-Shot</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" style={{ columnGap: "3px" }}>
          <Box
            className={clsx(phraseBox1, phrase, "pointer", {
              [active]: filters.isPhrase == "1" && filters.isOneShot == "0"
            })}
            onClick={() => {
              setFilters({
                ...filters,
                isPhrase: filters.isPhrase == "1" && filters.isOneShot == "0" ? "" : "1",
                isOneShot: filters.isPhrase == "1" && filters.isOneShot == "0" ? "" : "0"
              })
            }}
          >
            <Box width="100%" justifyContent="center" display="flex">
              <Typography className={typo}>Phrases</Typography>
            </Box>
          </Box>
          <Box
            className={clsx(phraseBox1, phrase, "pointer", {
              [active]: filters.isOneShot == "1" && filters.isPhrase == "0"
            })}
            onClick={() => {
              setFilters({
                ...filters,
                isPhrase: filters.isOneShot == "1" && filters.isPhrase == "0" ? "" : "0",
                isOneShot: filters.isOneShot == "1" && filters.isPhrase == "0" ? "" : "1"
              })
            }}
          >
            <Box width="100%" justifyContent="center" display="flex">
              <Typography className={typo}>One-Shots</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" style={{ rowGap: "5px", margin: "0 0 0 3px" }}>
        <Box
          className={clsx(phrase, "pointer", {
            [active]: filters.isDry == "1"
          })}
          onClick={() => {
            setFilters({
              ...filters,
              isDry: filters.isDry == "1" ? "0" : "1"
            })
          }}
        >
          <Box width="100%" justifyContent="center" display="flex">
            <Typography className={typo}>Dry</Typography>
          </Box>
        </Box>
        <Box
          className={clsx(phrase, "pointer", {
            [active]: filters.isWet == "1"
          })}
          onClick={() => {
            setFilters({
              ...filters,
              isWet: filters.isWet == "1" ? "0" : "1"
            })
          }}
        >
          <Box width="100%" justifyContent="center" display="flex">
            <Typography className={typo}>Wet</Typography>
          </Box>
        </Box>
      </Box>

      <Box p={2} className={filterBox}>
        <Select
          options={genres.sort((a, b) => a.label.localeCompare(b.label))}
          classes={langs}
          value={filters.gener}
          setHandle={(value) => {
            setFilters({
              ...filters,
              gener: value
            })
          }}
          //haddleQueryParams={haddleQueryParams}
        />

        <Select
          options={key.sort((a, b) => a.label.localeCompare(b.label))}
          classes={langs}
          value={filters.key}
          setHandle={(value) => {
            setFilters({
              ...filters,
              key: value
            })
          }}
          //setHandle={setKeys}
          //haddleQueryParams={haddleQueryParams}
        />

        <div className="bpm-wrapper">
          <button className="bpm-button" onClick={() => setShowBpmTooltip(true)} ref={bpmref}>
            BPM
          </button>
          <div className={`bpm-tooltip ${showBpmTooltip && "active"}`}>
            <div>
              <h6>
                {bpmValue[0]}-{bpmValue[1]}
              </h6>
              <RangeSlider value={bpmValue} setValue={setBpmValue} />
              <button className="apply-button" onClick={handleBPMFilters}>
                Apply
              </button>
            </div>
          </div>
        </div>

        <Select
          options={languages.sort((a, b) => a.label.localeCompare(b.label))}
          classes={langs}
          value={filters.language}
          setHandle={(value) => {
            setFilters({
              ...filters,
              language: value
            })
          }}
          //setHandle={setLanguage}
          //haddleQueryParams={haddleQueryParams}
        />

        <div className={search}>
          <InputBase
            //onChange={(e) => handleInputChange(e)}
            onChange={({ target }) => {
              setFilters({
                ...filters,
                searchKey: target.value
              })
            }}
            placeholder="Search for vocals"
            value={filters.searchKey}
            classes={{
              root: inputRoot,
              input: inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <div className={searchIcon}>
            <FaSearch />
          </div>
        </div>

        <Select
          options={popular}
          classes={langs}
          value={filters.random}
          setHandle={(value) => {
            setFilters({
              ...filters,
              trending: value
            })
          }}

          //setHandle={setLanguage}
          //haddleQueryParams={haddleQueryParams}
        />

        <Box
          className={clsx(phrase, "pointer")}
          onClick={() => {
            history.push(`/cart`)
          }}
          mx={0.5}
        >
          <Box width="100%" justifyContent="center" display="flex" px={1}>
            <Typography
              style={{
                borderRight: "1px solid white",
                margin: "-5px 0"
              }}
            >
              <p
                style={{
                  padding: "15px 10px 15px 3px",
                  alignSelf: "center",
                  color: "white"
                }}
              >
                {cart.length}
              </p>
            </Typography>

            <Typography
              className={typo}
              style={{ padding: "0 0 0 20px", width: "90px", alignSelf: "center" }}
            >
              View Cart{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  langs: {
    width: "13.5%",
    padding: "0 3rem",
    "@media screen and (max-width: 1500px)": {
      width: "12%",
      minWidth: "12%"
    }
  },
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    "@media screen and (max-width: 1250px)": {
      flexWrap: "wrap"
    }
    // flexWrap: "wrap"
  },
  filterBox: {
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    borderRadius: 5,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    marginLeft: "3px",
    "@media screen and (max-width: 1250px)": {
      width: "100%",
      border: "1px solid white",
      columnGap: "1rem"
    }
  },
  search: {
    //  position: "relative",
    borderRadius: 5,
    margin: " 0 4px",
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    border: "1px solid " + theme.palette.primary.contrastText,
    // "&:hover": {
    //   backgroundColor: "#ffffff"
    // },
    display: "flex",
    justifyContent: "space-between",
    // marginRight: 0,
    // marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    // /borderLeft: "1px solid",
    //border: "0px solid " + theme.palette.primary.contrastText,
    // borderTopRightRadius: 5,
    //borderBottomRightRadius: 5,
    [theme.breakpoints.down("md")]: {
      height: "40.63px"
    }
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: "8px 8px",
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      padding: "12px 8px"
    }
  },
  phrase: {
    borderRadius: 5,
    display: "flex",
    padding: 2,
    border: "1px solid white",
    alignItems: "center",
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    // border: "1px solid " + theme.palette.primary.contrastText,
    boxSizing: "border-box"
  },
  phraseBox: {
    width: "100%"
  },
  phraseBox1: {
    width: "50%",
    margin: "0"
  },
  typo: {
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    // border: "1px solid " + theme.palette.primary.contrastText,
    "&.MuiTypography-body1": {
      fontSize: 12,
      fontWeight: 500,

      backgroundColor: "transparent",
      color: theme.palette.primary.contrastText,
      // border: "1px solid " + theme.palette.primary.contrastText,
      wordSpacing: 5,
      "@media screen and (max-width: 1250px)": {}
    }
  },
  active: {
    boxSizing: "border-box",
    border: "2px solid #86DB78"
  },
  selectStyle: {
    width: "24%",
    border: "0px",
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 5
  },
  select: {
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    border: "1px solid " + theme.palette.primary.contrastText,
    borderRadius: 5,
    margin: "0 3px",
    // border: `1px solid ${theme.palette.secondary.main}`,
    padding: "6px 7px",
    width: "12.6%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "5px 0px",
      padding: "12px 7px"
    }
  }
}))

export const Select = ({ options, value, haddleQueryParams, setHandle, type }) => {
  const { select, selectStyle } = useStyles()
  const [bpmValue, setBpmValue] = useState([0, 100])

  return (
    <>
      {type === "bpm" ? (
        <div style={{ width: "100px" }}>
          <RangeSlider value={bpmValue} setValue={setBpmValue} />
        </div>
      ) : (
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
      )}
    </>
  )
}
