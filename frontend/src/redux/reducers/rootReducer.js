import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import { productReducer } from './productReducer'
import eventReducer from './eventReducer'
import cartReducer from './cartReducer'
import { orderReducer } from './orderReducer'
import reservationsReducer from './reservationsReducer'

const reducer = combineReducers({
  eventReducer,
  authReducer,
  cartReducer,
  orderReducer,
  productR: productReducer,
  eventR: eventReducer,
  reservationsR: reservationsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store