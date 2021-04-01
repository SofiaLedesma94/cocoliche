
import axios from 'axios'
import { API } from '../../components/Api'


const orderActions = {
  getOrders: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(`${API}/purchases`)
        dispatch({
          type: 'GET_ORDERS',
          payload: response.data.response
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  confirmOrder: (ids) => {
    return async (dispatch, getState) => {
      const { customerId, orderId } = ids
      try {
        const response = await axios.put(`${API}/purchases/confirm/${orderId}/${customerId}`)
        dispatch({
          type: 'CONFIRM_ORDER',
          payload: response.data.updated
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  cancelOrder: (orderId) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(`${API}/purchases/cancel/${orderId}`)
        dispatch({
          type: 'CONFIRM_ORDER',
          payload: response.data.updated
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  completeOrder: (orderId) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(`${API}/purchases/complete/${orderId}`)
        dispatch({
          type: 'CONFIRM_ORDER',
          payload: response.data.updated
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
}

export default orderActions