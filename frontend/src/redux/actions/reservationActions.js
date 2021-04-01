import axios from 'axios';
import { API } from '../../components/Api';
import  Swal  from 'sweetalert2';


const reservationActions = {

    sendReservation: (pedido) => {
        const {reservation, token} = pedido
        return async (dispatch, getState) => {
            const response = await axios.post(`${API}/reservation`, reservation, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                        }      
            }
            )
            if(response.data.success){
                Swal.fire("Reserva enviada, recibirá un mail con la confirmación")
                dispatch({type: 'RESERVATION', payload: response.data.response})
                
            } else {
                Swal.fire("Lo siento, su reserva no se ha podido registrar")
            }
        }
    },
    getReservations: () => {
        return async (dispatch, getState) => {
            const response = await axios.get(`${API}/reservation`)
            dispatch({type:'GET_RESERVATIONS', payload: response.data.response })         
        }
    },
    editReservation: (dates) => {
        const { token, id , newDates } = dates
        return async (dispatch, getState) => {
            const response = await axios.put(`${API}/reservation`, {id, newDates},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                        }      
            })
            dispatch({type: 'EDIT_RESERVATION', payload: response.data.response})
        }
    },
    deleteReservation: dates => {
        const {id, token} = dates
        return async (dispatch, getState) => {
            const response = await axios.delete(`${API}/reservation/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                        }      
            })
            dispatch({type:'DELETE_RESERVATIONS', payload: response.data.response})
        }
    }
}

export default reservationActions