import * as Types from "./types"

const initState = {
  tracks: [],
  loading: false,
  error: "",
  volume: 1,
  cart: [],
  likedTracks: [],
  dowloadedTracks: [],
  allTracks: [],
  currentPlayingTrack: []
}

export const tracksReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.ALL_TRACKS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.ALL_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
        loading: false
      }

    case Types.ALL_TRACKS_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.ALL_PENDING_TRACKS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.ALL_PENDING_TRACKS_SUCCESS:
      return {
        ...state,
        allTracks: action.payload,
        loading: false
      }

    case Types.ALL_PENDING_TRACKS_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.UPDATE_TRACKS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.UPDATE_TRACKS_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case Types.UPDATE_TRACKS_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.INCREASE_VOLUME_SUCCESS:
      return {
        ...state,
        volume: state.volume < 1 ? state.volume + 0.1 : state.volume
      }

    case Types.DECREASE_VOLUME_SUCCESS:
      return {
        ...state,
        volume: state.volume > 0.1 ? state.volume - 0.1 : state.volume
      }

    case Types.HANDLE_VOLUME_SUCCESS:
      return {
        ...state,
        volume: action.payload
      }

    case Types.UPLOAD_TRACK_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.UPLOAD_TRACK_SUCCESS:
      return {
        ...state,
        loading: false,
        tracks: [action.payload, ...state.tracks]
      }

    case Types.UPLOAD_TRACK_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.UPLOAD_TRACK_DEFAULT:
      return {
        ...state,
        loading: false
      }

    case Types.STOP_TRACK_LOADER:
      return {
        ...state,
        loading: false
      }

    case Types.ADD_TO_CART_SUCCESS:
      const cart = state.cart || []
      return {
        ...state,
        cart: [...cart, action.payload]
      }

    case Types.REMOVE_CART_REQUEST:
      return {
        ...state,
        cart: [...state.cart.filter((c) => c.track_id !== action.payload)]
      }
    case Types.EMPTY_CART_REQUEST:
      return {
        ...state,
        cart: []
      }

    case Types.LIKED_TRACKS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.LIKED_TRACKS_SUCCESS:
      return {
        ...state,
        likedTracks: action.payload,
        loading: false
      }
    case Types.LIKED_TRACKS_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.DOWNLOADED_TRACKS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Types.DOWNLOADED_TRACKS_SUCCESS:
      return {
        ...state,
        dowloadedTracks: action.payload,
        loading: false
      }
    case Types.DOWNLOADED_TRACKS_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.GET_PLAYING_VOCAL:
      return {
        ...state,
        currentPlayingTrack: action.payload,
        loading: false
      }

    case Types.REMOVE_PLAYING_VOCAL:
      return {
        ...state,
        currentPlayingTrack: [],
        loading: false
      }

    case Types.DOWNLOADED_TRACKS_FAILED:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
