import { makeStyles, Typography } from "@material-ui/core"
import * as React from "react"

export const Table = ({ tracks }) => {
  const { tabelRoot, textWhite, nothingTextWrap, trackNameText } = useStyles()

  return tracks.length > 0 ? (
    <table className={tabelRoot}>
      <thead>
        <tr>
          <th align="left">Name</th>
          <th align="left">Plays</th>
          <th align="left">Likes</th>
          <th align="left">Downloads</th>
          <th align="left">Earnings</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((row, index) => (
          <tr className={textWhite} key={index}>
            <td>
              <Typography className={[textWhite, trackNameText].join(" ")}>
                {row.track_name}
              </Typography>
            </td>
            <td>
              <Typography className={textWhite}>{row.plays}</Typography>
            </td>
            <td>
              <Typography className={textWhite}>{row.likes}</Typography>
            </td>
            <td>
              <Typography className={textWhite}>{row.downloads}</Typography>
            </td>
            <td>
              <Typography className={textWhite}>{row.earnings}$</Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <span className={nothingTextWrap}>You dont have any Vocals</span>
  )
}

const useStyles = makeStyles(() => ({
  textWhite: {
    color: "#ffffff !important"
  },
  trackNameText: {
    width: "400px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  nothingTextWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  },
  tabelRoot: {
    width: "100%",
    paddingTop: 20,
    color: "#fff",
    "& thead tr th": {
      fontSize: 14,
      fontWeight: 400
    },
    "& tbody tr td": {
      color: "#fff",
      paddingTop: "10px",
      paddingBottom: "10px"
    }
  }
}))
