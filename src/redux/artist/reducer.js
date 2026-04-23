import * as Types from "./types"

const initState = {
  loading: false,
  artists: [],
  singleArtist: {}
}

export const artistReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.CREATE_ARTIST_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.CREATE_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case Types.CREATE_ARTIST_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.GET_ARTIST_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.GET_ARTIST_SUCCESS:
      return {
        ...state,
        artists: action.payload,
        laoding: false
      }

    case Types.GET_ARTIST_FAILED:
      return {
        ...state,
        loading: false
      }
    case Types.GET_SINGLE_ARTIST_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.GET_SINGLE_ARTIST_SUCCESS:
      return {
        ...state,
        singleArtist: action.payload,
        laoding: false
      }

    case Types.GET_ARTIST_FAILED:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
