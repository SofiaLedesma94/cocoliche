const initialState = {
  allOrders: [],
  customer: {}
}

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        allOrders: action.payload
      }
    case 'CONFIRM_ORDER':
      return {
        ...state,
        allOrders: action.payload
      }
    default:
      return state
  }
}

