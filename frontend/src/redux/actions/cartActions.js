import axios from "axios";
import { API } from './../../components/Api';

const productActions = {
  addToCart: (product) => {
    return async (dispatch, getState) => {
      try {

        var copyCart = getState().cartReducer.cart.slice()
        var otherCart = getState().cartReducer.cart.slice()

        let comparator = copyCart.findIndex((item) => {
          return item.subcategory.subcategoryId === product.subcategory.subcategoryId
        })

        if (comparator !== -1) {
          otherCart = copyCart.map(item => {
            if (item.subcategory.subcategoryId === product.subcategory.subcategoryId) {
              return item = product
            } else {
              return item
            }
          })
        } else {
          otherCart.push(product)
        }


        dispatch({
          type: 'ADD_TO_CART',
          payload: otherCart
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  localStorageCart: (cart) => {
    return async (dispatch, getState) => {
      try {
        dispatch({
          type: 'ADD_FROM_LS',
          payload: cart
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  removeProduct: (id) => {
    return async (dispatch, getState) => {
      try {
        const removeItem = getState().cartReducer.cart.filter(cartItem => cartItem.subcategory.subcategoryId !== id)
        dispatch({ type: 'REMOVE_FROM_CART', payload: removeItem })
      } catch (error) {
        console.log(error)
      }
    }
  },
  modifyQuantity: (cant, idSubItem) => {
    return (dispatch, getState) => {
      const copyCart = getState().cartReducer.cart.slice()
      let modifyItem = copyCart.find(cartItem => cartItem.subcategory.subcategoryId === idSubItem);
      modifyItem.subcategory.qty = cant
      let indiMod = copyCart.findIndex((item) => {
        return item.subcategory.subcategoryId === idSubItem
      })
      copyCart.splice(indiMod, 1, modifyItem)
      dispatch({ type: 'MODIFY_QTY', payload: copyCart })
    }
  },
  confirmPurchase: (newCart) => {
    return async (dispatch, getState) => {
      const token = newCart.data.token
      const response = await axios.post(`${API}/purchases`, newCart,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      console.log(response)
      dispatch({
        type: "CONFIRM_PURCHASE",
        payload: ""
      })
    }
  },
  getCart: () => {
    return async (dispatch, getState) => {
      dispatch({
        type: "GET_CART",
        payload: ""
      })
    }
  }
}

export default productActions