import * as Types from "./types"

export const actions = {
  /** create promo code actions */
  createPromoCodeRequest: (payload) => ({ type: Types.CREATE_PROMO_CODE_REQUEST, payload }),
  createPromoCodeSuccess: () => ({ type: Types.CREATE_PROMO_CODE_SUCCESS }),
  createPromoCodeFailed: () => ({ type: Types.CREATE_PROMO_CODE_FAILED }),

  /** GET promo code actions */
  getPromoCodeRequest: () => ({ type: Types.GET_PROMO_CODE_REQUEST }),
  getPromoCodeSuccess: (payload) => ({ type: Types.GET_PROMO_CODE_SUCCESS, payload }),
  getPromoCodeFailed: () => ({ type: Types.GET_PROMO_CODE_FAILED }),

  /** update promo code actions */
  updatePromoCodeRequest: (payload, id) => ({ type: Types.UPDATE_PROMO_CODE_REQUEST, payload, id }),
  updatePromoCodeSuccess: () => ({ type: Types.UPDATE_PROMO_CODE_SUCCESS }),
  updatePromoCodeFailed: () => ({ type: Types.UPDATE_PROMO_CODE_FAILED })
}
