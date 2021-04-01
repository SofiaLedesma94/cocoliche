import axios from 'axios'
import { API } from '../../components/Api'


const productActions = {
  getProducts: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(`${API}/products`)
        dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.response
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  addProduct: (product, file) => {
    try {
      const { name, description, category, subcategories, delay } = product
      const form = new FormData()
      form.append('name', name)
      form.append('description', description)
      form.append('category', category)
      form.append('subcategories', JSON.stringify(subcategories))
      form.append('delay', delay)
      form.append('file', file.result)
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/products`, form
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     'Content-Type': 'multipart/formdata',
          //   }
          // }
        )
        dispatch({
          type: 'RERENDER',
          payload: response.data.response
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  deleteProduct: (product) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.delete(`${API}/product/${product}`,
        )
        dispatch({ type: 'GET_PRODUCTS', payload: response.data.response })
      } catch (error) {
        console.log(error)
      }
    }
  },
  editProduct: (product, file) => {
    const { name, price, description, idCategory, delay, stock, id } = product
    const editedProduct = new FormData()
    editedProduct.append('name', name)
    editedProduct.append('price', price)
    editedProduct.append('description', description)
    editedProduct.append('idCategory', idCategory)
    editedProduct.append('delay', delay)
    editedProduct.append('stock', stock)
    file && editedProduct.append('file', file.result)
    editedProduct.append('id', id)
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(`${API}/products`, editedProduct)
        dispatch({ type: 'RERENDER', payload: response.data.response })

      } catch (error) {
        console.log(error)
      }
    }
  },
  createCategory: (category) => {
    return async (dispatch, getState) => {
      try {
        const response = axios.post(`${API}/category`, { category })
        dispatch({
          type: 'RERENDER',
          payload: response.data.response
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  getCategories: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(`${API}/category`)
        dispatch({
          type: 'ALL_CATEGORIES',
          payload: response.data.response
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  addSubcategories: (subcategories, productId) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`${API}/product/subcategory`, { subcategories, productId },

        )
        dispatch({
          type: 'ADD_SUBCATEGORY',
          payload: response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  deleteSubcategory: (productId, subcategoryId) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.delete(`${API}/product/subcategory/delete/${productId}/${subcategoryId}`)
        dispatch({
          type: "DELETE_SUB",
          payload: response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  editSubcategory: (editedSubcategory) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(`${API}/product/subcategory/`, editedSubcategory)
        dispatch({
          type: "EDIT_SUBCATEGORY",
          payload: response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  rateProduct: (rating, productId, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`${API}/rate/${productId}`, { rating },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
        dispatch({
          type: "RATE_PRODUCT",
          payload: response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default productActions