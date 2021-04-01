const initialState = {
  allProducts: [],
  allCategories: []
}

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload
      }
    case 'RERENDER':
      return {
        ...state,
        allProducts: state.allProducts.map(product => product._id === action.payload._id ? action.payload : product)
      }
    case 'ALL_CATEGORIES':
      return {
        ...state,
        allCategories: action.payload
      }
    case 'EDIT_SUBCATEGORY':
      console.log(action.payload)
      return {
        ...state,
        allProducts: state.allProducts.map(product => product._id === action.payload.response._id ? action.payload.response : product)
      }
    case 'DELETE_SUB':
      return {
        ...state,
        allProducts: state.allProducts.map(product => product._id === action.payload.response._id ? action.payload.response : product)
      }
    case 'ADD_SUBCATEGORY':
      return {
        ...state,
        allProducts: state.allProducts.map(product => product._id === action.payload.response._id ? action.payload.response : product)
      }
    default:
      return state
  }
}