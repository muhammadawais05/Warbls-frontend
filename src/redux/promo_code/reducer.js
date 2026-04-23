import * as Types from "./types"

const initState = {
  loading: false,
  promoCodes: []
}

export const promoReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.CREATE_PROMO_CODE_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.CREATE_PROMO_CODE_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case Types.CREATE_PROMO_CODE_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.GET_PROMO_CODE_SUCCESS:
      return {
        ...state,
        promoCodes: actions.payload
      }

    case Types.UPDATE_PROMO_CODE_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.CREATE_PROMO_CODE_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case Types.UPDATE_PROMO_CODE_FAILED:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
