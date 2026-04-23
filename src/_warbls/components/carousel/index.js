import React, { useState, useEffect } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { settings } from "./settings"
import { makeStyles } from "@material-ui/core"
import { actions } from "../../../redux/auth/actions"
import { useDispatch } from "react-redux"
import axios from "axios"
import { APIs } from "../../../_helpers/apis"
import { useHistory } from "react-router"
import { useSelector } from "react-redux"

export default function ArtistCarousel() {
  const [usersSuccess, isUsersSuccess] = useState(false)
  const [popularArtists, setPopularArtists] = useState(null)
  const { auth } = useSelector((state) => state.auth)

  useEffect(() => {
    // dispatch(actions.usersRequest())
    if (auth) {
      axios.get(APIs.popularArtist).then(({ data }) => {
        setPopularArtists(data)
      })
    }
  }, [])

  const { artistHeading, carouselWrapper } = useStyles()
  if (auth)
    return (
      <div className={carouselWrapper}>
        <h6 className={artistHeading}>Popular Artist</h6>
        <Slider {...settings}>
          {popularArtists?.map((item) => (
            <CarouselItem data={item} key={item} />
          ))}
        </Slider>
      </div>
    )
  return <div></div>
}

function CarouselItem({ data }) {
  const { artistName, artistImage } = useStyles()
  const history = useHistory()
  return (
    <div
      onClick={() =>
        history.push({
          pathname: "/artist",
          state: {
            data: data
          }
        })
      }
    >
      <img className={artistImage} src={data?.cover_image} />
      <h6 className={artistName}>{data?.full_name}</h6>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  artistHeading: {
    margin: "0 0 2rem 0",
    fontSize: "1.3rem"
  },
  carouselWrapper: {
    margin: "4rem auto",
    width: "60% !important",
    maxHeight: "200px",
    maxWidth: "60vw !important",
    overflow: "hidden",
    "@media (max-width: 1260px) and (min-width:959px)": {
      width: "70%"
    }
  },
  artistImage: {
    width: "100px",
    height: "100px",
    marginInline: "auto",
    background: "#C4C4C4",
    borderRadius: "2px",
    color: "white"
  },
  artistName: {
    margin: "20px  0 0 0 ",
    color: "gray",
    fontSize: "13px",
    textAlign: "center"
  }
}))
