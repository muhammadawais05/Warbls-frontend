import * as Types from "./types"

export const actions = {
  /** create order actions */
  createOrder: () => ({ type: Types.CREATE_ORDER_REQUEST }),
  createOrderSuccess: (payload) => ({ type: Types.CREATE_ORDER_SUCCESS, payload }),
  createOrderFailed: () => ({ type: Types.CREATE_ORDER_FAILED }),

  /** GET order actions */
  getOrders: () => ({ type: Types.GET_ALL_ORDERS_REQUEST }),
  getOrderSuccess: (payload) => ({ type: Types.GET_ALL_ORDERS_SUCCESS, payload }),
  getOrderFailed: () => ({ type: Types.GET_ALL_ORDERS_FAILED })
}
