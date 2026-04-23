import * as React from "react"
import { Box, makeStyles, InputBase, Typography } from "@material-ui/core"
import { Select } from "../Form/Select"
import { FaSearch } from "react-icons/fa"
import clsx from "clsx"
import { languages, bpm, key, genres, popular } from "./script"
import { StyledGrid } from "../Container/StyledGrid"

const { useState } = React

export const SMFilter = ({
  bpms,
  setBpm,
  language,
  setLanguage,
  phrases,
  setPhrase,
  oneShot,
  setOneShot,
  keys,
  setKeys,
  genre,
  setGenre,
  searches,
  setSearches
}) => {
  const {
    search,
    searchIcon,
    inputRoot,
    inputInput,
    langs,
    phraseBox,
    typo,
    phraseBox1,
    phrase,
    active
  } = useStyles()
  const [activePhrase, setActivePhrase] = useState("")

  return (
    <Box>
      <StyledGrid container spacing={1}>
        <StyledGrid item xs={12}>
          <Box
            className={clsx(phraseBox, phrase, "pointer", { [active]: activePhrase === "phr&one" })}
            onClick={() => setActivePhrase("phr&one")}
          >
            <Box width="100%" justifyContent="center" display="flex">
              <Typography className={typo}>Phrases & One-Shot</Typography>
            </Box>
          </Box>
        </StyledGrid>
        <StyledGrid item xs={6}>
          <Box
            className={clsx(phraseBox1, phrase, "pointer", {
              [active]: activePhrase === "phrases"
            })}
            onClick={() => setActivePhrase("phrases")}
          >
            <Box width="100%" justifyContent="center" display="flex">
              <Typography className={typo}>Phrases</Typography>
            </Box>
          </Box>
        </StyledGrid>
        <StyledGrid item xs={6}>
          <Box
            className={clsx(phraseBox1, phrase, "pointer", {
              [active]: activePhrase === "oneshot"
            })}
            onClick={() => setActivePhrase("oneshot")}
          >
            <Box width="100%" justifyContent="center" display="flex">
              <Typography className={typo}>One-Shots</Typography>
            </Box>
          </Box>
        </StyledGrid>
      </StyledGrid>
      <StyledGrid container spacing={1}>
        <StyledGrid item xs={3}>
          <Select options={languages} classes={langs} />
        </StyledGrid>
        <StyledGrid item xs={3}>
          <Select options={bpm} classes={langs} />
        </StyledGrid>
        <StyledGrid item xs={3}>
          <Select options={key} classes={langs} />
        </StyledGrid>
        <StyledGrid item xs={3}>
          <Select options={genres} classes={langs} />
        </StyledGrid>
        <StyledGrid item xs={9} display="flex" alignItems="center">
          <div className={search}>
            <InputBase
              placeholder="Search for vocals"
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
        </StyledGrid>
        <StyledGrid item xs={3}>
          <Select options={popular} classes={langs} />
        </StyledGrid>
      </StyledGrid>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  langs: {
    width: "100%",
    backgroundColor: "transparent",
    color: "white",
    paddingBlock: 12
  },
  root: {
    width: "61%",
    position: "fixed",
    [theme.breakpoints.down("lg")]: {
      width: "71%"
    },
    "@media screen and (max-width: 1500px)": {
      width: "75%"
    },
    [theme.breakpoints.down("md")]: {
      width: "70%"
    }
    // top: 0,
    // left: 0
    // justifyContent: "center"
  },
  filterBox: {
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      //   flexDirection: "column"
      width: "100%"
    }
  },
  search: {
    position: "relative",
    borderRadius: 10,
    border: `1px solid white`,
    backgroundColor: "transparent",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 0,
    // marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //   marginLeft: theme.spacing(3),
      width: "auto"
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "5px 0px"
    }
  },
  searchIcon: {
    padding: "0px 10px",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `transparent`,
    color: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
    // display: "flex",
    // alignItems: "center",
    backgroundColor: "#EBEBEB",
    padding: 10,
    boxSizing: "border-box"
  },
  phraseBox: {
    // width: "100%"
    backgroundColor: "transparent",
    borderRadius: 10,
    border: "1px solid white"
  },
  phraseBox1: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 5,
    border: "1px solid white"
  },
  typo: {
    "&.MuiTypography-body1": {
      fontSize: 12,
      fontWeight: 500,
      color: "white",
      wordSpacing: 2
    }
  },
  active: {
    boxSizing: "border-box",
    border: "2px solid #86DB78"
  }
}))
