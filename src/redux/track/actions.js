import * as Types from "./types"

export const actions = {
  /** login actions */
  uploadTrackRequest: (payload) => ({
    type: Types.UPLOAD_TRACK_REQUEST,
    payload
  }),
  uploadTrackSuccess: (payload) => ({ type: Types.UPLOAD_TRACK_SUCCESS, payload }),
  uploadTrackFailed: () => ({ type: Types.UPLOAD_TRACK_FAILED }),
  uploadTrackRequestSetUploadingBitFalse: () => ({ type: Types.UPLOAD_TRACK_DEFAULT }),

  /** all tracks */
  getAllTracksRequest: (payload) => ({ type: Types.ALL_TRACKS_REQUEST, payload }),
  getAllTracksSuccess: (payload) => ({ type: Types.ALL_TRACKS_SUCCESS, payload }),
  getAllTracksFailed: () => ({ type: Types.ALL_TRACKS_FAILED }),

  /** update  tracks */
  updateTracksRequest: (payload, id) => ({ type: Types.UPDATE_TRACKS_REQUEST, payload, id }),
  updateTracksSuccess: (payload) => ({ type: Types.UPDATE_TRACKS_SUCCESS, payload }),
  updateTracksFailed: () => ({ type: Types.UPDATE_TRACKS_FAILED }),

  /** all tracks with pending status*/
  getAllPendingTracksRequest: () => ({ type: Types.ALL_PENDING_TRACKS_REQUEST }),
  getAllPendingTracksSuccess: (payload) => ({ type: Types.ALL_PENDING_TRACKS_SUCCESS, payload }),
  getAllPendingTracksFailed: () => ({ type: Types.ALL_PENDING_TRACKS_FAILED }),

  /** liked tracks */
  likedTracksRequest: (payload) => ({ type: Types.LIKED_TRACKS_REQUEST, payload }),
  likedTracksSuccess: (payload) => ({ type: Types.LIKED_TRACKS_SUCCESS, payload }),
  likedTracksFailed: () => ({ type: Types.LIKED_TRACKS_FAILED }),

  /** downloaded tracks */
  downloadedTracksRequest: (payload) => ({ type: Types.DOWNLOADED_TRACKS_REQUEST, payload }),
  downloadedTracksSuccess: (payload) => ({ type: Types.DOWNLOADED_TRACKS_SUCCESS, payload }),
  downloadedTracksFailed: () => ({ type: Types.DOWNLOADED_TRACKS_FAILED }),

  /** increase volume */
  increaseVolumeRequest: () => ({ type: Types.INCREASE_VOLUME_REQUEST }),
  increaseVolumeSuccess: () => ({ type: Types.INCREASE_VOLUME_SUCCESS }),
  // increaseVolumeFailed: () => ({ type: Types.INCREASE_VOLUME_FAILED }),

  /** decrease volume */
  decreaseVolumeRequest: () => ({ type: Types.DECREASE_VOLUME_REQUEST }),
  decreaseVolumeSuccess: () => ({ type: Types.INCREASE_VOLUME_SUCCESS }),

  handleVolumeRequest: (payload) => ({ type: Types.HANDLE_VOLUME_REQUEST, payload }),
  handleVolumeSuccess: (payload) => ({ type: Types.HANDLE_VOLUME_SUCCESS, payload }),

  /** stop loaders */
  stopTrackLoaderSuccess: () => ({ type: Types.STOP_TRACK_LOADER }),

  /** track wise like actions */
  trackWiseLikeRequest: (payload) => ({ type: Types.TRACK_WISE_LIKE_REQUEST, payload }),
  trackWiseLikeSuccess: () => ({ type: Types.TRACK_WISE_LIKE_SUCCESS }),
  trackWiseLikeFailed: () => ({ type: Types.TRACK_WISE_LIKE_FAILED }),

  /** track wise unlike actions */
  trackWiseUnLikeRequest: (payload, id) => ({ type: Types.TRACK_WISE_UNLIKE_REQUEST, payload, id }),
  trackWiseUnLikeSuccess: () => ({ type: Types.TRACK_WISE_UNLIKE_SUCCESS }),
  trackWiseUnLikeFailed: () => ({ type: Types.TRACK_WISE_UNLIKE_FAILED }),

  /** track wise play actions */
  trackWisePlayRequest: (payload) => ({ type: Types.TRACK_WISE_PLAY_REQUEST, payload }),
  trackWisePlaySuccess: () => ({ type: Types.TRACK_WISE_PLAY_SUCCESS }),
  trackWisePlayFailed: () => ({ type: Types.TRACK_WISE_PLAY_FAILED }),

  /** track wise download actions */
  trackWiseDownloadRequest: (payload) => ({ type: Types.TRACK_WISE_DOWNLOAD_REQUEST, payload }),
  trackWiseDownloadSuccess: () => ({ type: Types.TRACK_WISE_DOWNLOAD_SUCCESS }),
  trackWisDownloadFailed: () => ({ type: Types.TRACK_WISE_DOWNLOAD_FAILED }),

  /** add to cart actions */
  addToCartRequest: (payload) => ({ type: Types.ADD_TO_CART_REQUEST, payload }),
  addToCartSuccess: (payload) => ({ type: Types.ADD_TO_CART_SUCCESS, payload }),
  addToCartFailed: () => ({ type: Types.ADD_TO_CART_FAILED }),

  /** add to cart actions */
  removeCartRequest: (payload) => ({ type: Types.REMOVE_CART_REQUEST, payload }),
  emptyCartRequest: () => ({ type: Types.EMPTY_CART_REQUEST }),

  getPlayingVocal: (payload) => ({ type: Types.GET_PLAYING_VOCAL, payload }),
  removePlayingVocal: () => ({ type: Types.REMOVE_PLAYING_VOCAL })
}
