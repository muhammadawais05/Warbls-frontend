import * as Types from "./types"

export const actions = {
  /** create artist actions */
  createArtistRequest: (payload) => ({
    type: Types.CREATE_ARTIST_REQUEST,
    payload
  }),
  createArtistSuccess: (payload) => ({ type: Types.CREATE_ARTIST_SUCCESS, payload }),
  createArtistFailed: () => ({ type: Types.CREATE_ARTIST_FAILED }),

  /** create artist actions */
  getArtistsRequest: () => ({
    type: Types.GET_ARTIST_REQUEST
  }),
  getArtistSuccess: (payload) => ({ type: Types.GET_ARTIST_SUCCESS, payload }),
  getArtistFailed: () => ({ type: Types.GET_ARTIST_FAILED }),

  /** create artist actions */
  updateArtistsRequest: (payload, id) => ({
    type: Types.UPDATE_ARTIST_REQUEST,
    payload,
    id
  }),
  updateArtistSuccess: () => ({ type: Types.UPDATE_ARTIST_SUCCESS }),
  updateArtistFailed: () => ({ type: Types.UPDATE_ARTIST_FAILED }),

  /** get single artist actions */
  getSingleArtistRequest: () => ({ type: Types.GET_SINGLE_ARTIST_REQUEST }),
  getSingleArtistSuccess: (payload) => ({ type: Types.GET_SINGLE_ARTIST_SUCCESS, payload }),
  getSingleArtistFailed: () => ({ type: Types.GET_SINGLE_ARTIST_FAILED })
}
