import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

const { breakpoints } = createMuiTheme()

let theme = createMuiTheme({
  typography: {
    fontFamily: ["Eina01","Roboto Mono", "sans-serif"].join(","),
    body1: {
      color: "#9F9F9F",
      fontSize: 14
    },
    h6: {
      [breakpoints.down("sm")]: {
        fontSize: 18
      },
      [breakpoints.down("xs")]: {
        fontSize: 16
      }
    }
  },
  palette: {
    type: "dark",
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#202020",
      contrastText: "#FFFFFF",
      // dark: will be calculated from palette.primary.main,
      // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: "#C4C4C4"
      // dark: will be calculated from palette.primary.main,
      // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
    },
    error: {
      // light: will be calculated from palette.primary.main,
      main: "#f018a6"
      // dark: will be calculated from palette.primary.main,
      // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
    },
    btns: {
      main: "#242424"
    }
  },
  overrides: {
    MuiButton: {
      outlined: {

        backgroundColor: "#ffffff",
        color: "#000000",
        textTransform: "none"
      },
      contained: {
        backgroundColor: "#ffffff",
        color: "#000000",
        textTransform: "none"
      }
    }
  },
  props: {
    MuiButton: {
      disableRipple: true
    }
  }
})
theme = responsiveFontSizes(theme);
export { theme }
