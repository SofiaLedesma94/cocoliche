import axios from "axios"
import  Swal  from 'sweetalert2';
import { API } from './../../components/Api';

const eventsActions = {
  newEvent: (newEvent, file, token) => {
        return async (dispatch, getState) => {
          try{
            const form = new FormData()
            form.append('title',newEvent.title)
            form.append('description',newEvent.description)
            form.append('category',newEvent.category)
            form.append('dateEvent',newEvent.date)
            form.append('file', file.result)
            const respuesta = await axios.post(`${API}/events`, form, 
            {
                 headers:{
                     'Authorization': `Bearer ${token}`,
                     'Content-Type':'multipart/formdata'
             }}
             )
             if (!respuesta.data.success) {
                 return respuesta.data
             }
            dispatch({type: 'ADD_EVENT', payload: respuesta.data.response})
        }catch(error){
          Swal.fire(error)
        }       
    }
  }, 
  getEvents: () => {
    return async (dispatch, getState) => {
      try {
				const response = await axios.get(`${API}/events`)
				dispatch({type: 'GET_EVENTS', payload: response.data.response})
			}catch(error){
        Swal.fire(error)}
      }
  },
  editEvent:(newEvent)=>{      
    try {
      const {
        title, // ID del posteo
        description, // Texto modificado
        date,
        id,
        compressedFile // Foto
      } = newEvent
      const form = new FormData()
      form.append('title', title)
      form.append('description', description)
      form.append('id', id)
      form.append('date', date)
      compressedFile && form.append('file', compressedFile.result)
      return async (dispatch, getState) => {
        const response = await axios.put(`${API}/events`, form )
        dispatch({
          type: 'UPDATE_POST',
          payload: response.data.response
        })
      }
    } catch (error) {
      Swal.fire(error)
    } 
},
  deleteEvent:(id) => {
    return async (dispatch, getState) => {
      const response = await axios.delete(`${API}/events/delete/${id}` )
      dispatch({ type: 'DELETE_EVENT', payload: response.data.response })
     }
  },
}

export default eventsActions