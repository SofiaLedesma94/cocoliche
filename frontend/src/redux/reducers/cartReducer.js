const initialState = {
  cart: [],
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const cartLocal = JSON.stringify(action.payload)
      // let prodCart = []
      // prodCart.push(action.payload)
      // const cartLocal = JSON.stringify(prodCart)
      // localStorage.setItem('cart', cartLocal)
      // console.log(localStorage.getItem('cart'))
      // var cartLocal = [JSON.stringify(action.payload)]
      // var stringifiedCartItem = JSON.stringify(action.payload)
      // cartLocal.push(stringifiedCartItem)
      localStorage.setItem('cart', cartLocal)
      return {
        ...state,
        cart: action.payload
      }
    case 'REMOVE_FROM_CART':
      const stringifiedNewCart = JSON.stringify(action.payload);
      localStorage.setItem('cart', stringifiedNewCart)
      return {
        ...state,
        cart: action.payload
      }
    case 'CLEAR_CART':
      return {
        ...state,
      }
    case 'ADD_FROM_LS':
      return {
        ...state,
        cart: action.payload
      }
    case 'MODIFY_QTY':
      const stringifiedModCart = JSON.stringify(action.payload);
      localStorage.setItem('cart', stringifiedModCart)
      return {
        ...state,
        cart: action.payload
      }
    case 'CONFIRM_PURCHASE':
      localStorage.setItem('cart', "[]")
      return {
        ...state,
        cart: []
      }
    case 'GET_CART':
      return {
        ...state,
        // cart: [...state.cart]
      }
    default:
      return state
  }
}

export default cartReducer
