import { Box, makeStyles, Typography } from "@material-ui/core"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import PropTypes from "prop-types"
import * as React from "react"
import { toAbsoluteUrl } from "../../../_helpers/toAbsoluteUrl"
import { QAs } from "./script"
import { StyledContainer } from "../../../_warbls/components/Container/StyledContainer"
import { StyledGrid } from "../../../_warbls/components/Container/StyledGrid"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
export const QA = (props) => {
  const {
    btn,
    input,
    labelClass,
    root,
    rootInner,
    textContainer,
    typo,
    browseVocals,
    bgContainerQuestions,
    bgContainerQuestionsMark,
    tabBody,
    accordionSummaryHeading
  } = useStyles()
  const [activeTab, setactiveTabValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setactiveTabValue(newValue)
  }
  return (
    <>
      <div className={root}>
        <div className={bgContainerQuestions}> </div>
        <div className={bgContainerQuestionsMark}> </div>
        <StyledGrid className={rootInner} container>
          <StyledGrid item xs={12} sm={12} md={12} lg={12}>
            <Box className={textContainer} width="80%">
              <StyledContainer p={0} my={0}>
                <Typography
                  variant="h3"
                  style={{ lineHeight: "80.59px", marginTop: "0px" }}
                  className={labelClass}
                >
                  Have a Question ?
                </Typography>
                <Typography
                  variant="h3"
                  style={{ lineHeight: "80.59px", marginTop: "0px" }}
                  className={labelClass}
                >
                  Look here
                </Typography>
              </StyledContainer>

              <StyledContainer p={0} my={0} mt={10}>
                <Box
                  style={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex"
                    // width: "350px"
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    style={{ borderRight: 1, borderColor: "divider", width: "350px" }}
                  >
                    {QAs.map((qa, index) => (
                      <Tab
                        label={qa.group}
                        {...a11yProps(index)}
                        key={`Tab_${qa.group}_${index}`}
                      />
                    ))}
                  </Tabs>
                  {QAs.map((qa, index) => (
                    <TabPanel value={activeTab} index={index} key={`TabPanel_${qa.group}_${index}`}>
                      {qa.qa.map((QAobj, ind) => (
                        <div className={tabBody}>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id={`panel_${index}_${ind}-header`}
                            >
                              <Typography className={accordionSummaryHeading}>{QAobj.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>{QAobj.a}</Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      ))}
                    </TabPanel>
                  ))}
                </Box>
              </StyledContainer>
              {/* <StyledContainer p={0} my={0} mt={10}>
                                <Typography variant="p" className={clsx(browseVocals)}>
                                    Browse <span className={"vocals"} >Vocals</span>
                                </Typography>
                            </StyledContainer> */}
            </Box>
          </StyledGrid>
        </StyledGrid>
      </div>
    </>
  )
}
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  typo: {
    fontSize: "18px"
  },
  btn: {
    width: 180,
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    }
  },
  input: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main
  },
  labelClass: {
    // fontSize: 17,
    // fontWeight: "normal",
    color: theme.palette.primary.contrastText,
    margin: "0px"
  },
  browseVocals: {
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
    "& .vocals": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      padding: "0.25rem",
      borderRadius: "0.25rem"
    }
  },
  tabBody: {
    width: "80%",
    marginLeft: "2rem",
    marginBottom: "0.5rem"
  },
  accordionSummaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#333333"
  },
  rootInner: {
    width: "100%",
    height: "80%"
  },
  bgContainerQuestions: {
    background: `url(${toAbsoluteUrl("/media/Questions.png")})`,
    backgroundSize: "auto",
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",
    height: "40%",
    width: "80%",
    position: "absolute",
    left: "16rem",
    top: "2rem",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  bgContainerQuestionsMark: {
    background: `url(${toAbsoluteUrl("/media/question-mark.svg")})`,
    backgroundSize: "auto",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    height: "40%",
    width: "80%",
    position: "absolute",
    right: "8rem",
    top: "10rem",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  textContainer: {
    marginTop: "8rem",
    marginLeft: "2rem"
  }
}))
