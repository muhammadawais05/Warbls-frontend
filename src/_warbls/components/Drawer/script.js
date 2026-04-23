import { makeStyles } from "@material-ui/core"

export const list1 = [
  { label: "Profile name*", icon: "/media/profile.svg", to: "/profile" },
  { label: "My Vocals", icon: "/media/vocals.svg", to: "/my-vocals" }
]

export const list2 = [
  { label: "Your Library", icon: "/media/library.svg", to: "/vocals" },
  { label: "Likes", icon: "/media/likes.svg", to: "/likes" },
  { label: "Downloads", icon: "/media/downloads.svg", to: "/downloads" },
  { label: "Become Artist", icon: "/media/volume.svg", to: "/upload-form" }
]

export const list4 = [
  { label: "Users & Artists", to: "/users" },
  { label: "Artists Requests", to: "/artist-requests" },
  { label: "Files", to: "/files" },
  { label: "Orders", to: "/orders" }
]
export const list6 = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Analytics", to: "/analytics" }
]
export const list5 = [
  { label: "Terms", icon: "/media/library.svg", to: "/terms" },
  { label: "Artist", icon: "/media/vocals.svg", to: "/artist" }
]

export const list3 = [{ label: "Logout", icon: "/media/logout.svg", to: "profile" }]

export const list7 = [
  {
    to: "/vocals",
    label: "My Vocals",
    icon: "/media/play.svg",
    activeIcon: "/media/active-vocal.svg"
  },
  {
    to: "/likes",
    label: "Likes",
    icon: "/media/like-vector.svg",
    activeIcon: "/media/active-like.svg"
  },
  {
    to: "/downloads",
    label: "Downloads",
    icon: "/media/download.svg",
    activeIcon: "/media/active-download.svg"
  }
]

export const list8 = [
  {
    to: "/my-vocals",
    label: "Your Library",
    icon: "/media/music-library.svg",
    activeIcon: "/media/music-library.svg"
  },
  {
    to: "/profile",
    label: "Profile name",
    icon: "/media/profile-vector.svg",
    activeIcon: "/media/profile-vector.svg"
  }
]

const drawerWidth = 240

export const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: "pointer",
    userSelect: "none"
  },
  listText: {
    fontWeight: "normal",
    color: "#ffffff ",
    fontSize: 17,
    marginLeft: "10px",
    fontStyle: "normal"
  },

  activeListText: {
    color: "#86DB78"
  },

  icon: {
    "&.MuiListItemIcon-root": {
      minWidth: 32
    }
  },
  closeIcon: {
    paddingLeft: 10,
    paddingRight: 30,
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  root: {
    display: "flex"
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    // overflowY: "auto",
    // overflowX: "hidden",
    // background:theme.palette.primary.main,
    background: "#202020 !important",
    [theme.breakpoints.down("sm")]: {
      width: 0
    }
  },
  drawerOpen: {
    background: "#202020 !important",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.down("sm")]: {
      width: 0
    }
  },
  drawerClose: {
    width: "55px"
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "space-between",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    marginBottom: 1
    // height: "100%"
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    backgroundColor: "#333333",
    minHeight: "120vh"
  },
  drawerContainer: {
    // overflowY: "auto",
    // overflowX: "hidden",

    backgroundColor: theme.palette.primary.main,
    width: 182,
    // marginLeft: "auto",
    marginRight: "auto",
    height: "140vh",
    display: "Flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  activeVocal: {
    width: "120%",
    color: "white",

    display: "flex",
    flexDirection: "column",
    paddingLeft: "20px",

    "& img": {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      objectPosition: "center"
    }
  },

  activeVocalFlex: { display: "flex", rowGap: "2rem" },
  activeVocalName: {
    display: "block",
    width: "80%",
    margin: "20px 0 0 0",
    fontSize: "13px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white"
  },
  heartStyle: {
    display: "block",
    fontSize: "30px !important",
    margin: "12px 0 0 20px"
  },
  btn: {
    color: theme.palette.primary.contrastText,
    height: 10,
    marginTop: "22px",
    "&:hover $cartIcon": {
      display: "block"
    }
  },
  divider: {
    width: 182,
    backgroundColor: "#666666",
    height: 2
  },
  topDivider: {
    backgroundColor: "#666666",
    height: 2
  },
  activeLink: {
    // backgroundColor: "#86DB78",
    color: "white",
    borderLeft: "3px solid #86DB78",
    borderRadius: 0
  },
  activeDashboard: {
    backgroundColor: "rgba(196, 196, 196, 0.3)",
    borderRadius: 10
  },
  hoverLink: {
    "&:hover": {
      color: "#ffffff",
      borderLeft: "1px solid white"
      // borderRadius: 5
    }
  },
  hoverDashboard: {
    "&:hover": {
      backgroundColor: "rgba(196, 196, 196, 0.3)",
      borderRadius: 10
    }
  },
  sliderClass: {
    width: 110
  }
}))
