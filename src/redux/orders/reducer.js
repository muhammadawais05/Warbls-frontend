import * as Types from "./types"

const initState = {
  loading: false,
  orders: []
}

export const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      }

    case Types.CREATE_ORDER_FAILED:
      return {
        ...state,
        loading: false
      }

    case Types.GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case Types.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      }

    case Types.GET_ALL_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
