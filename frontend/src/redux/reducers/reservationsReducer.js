const initialState = {
    reservations: []
}

function reservationsReducer (state = initialState, action) {
    switch (action.type) {
        
        case 'GET_RESERVATIONS':
            return {
                ...state,
                reservations: action.payload
            }
        case 'RESERVATION':
            return {
                ...state,
                reservations: state.reservations.concat(action.payload)
            }
        case 'EDIT_RESERVATION':
            return {
                ...state,
                reservations: state.reservations.map(reservation => reservation._id === action.payload._id ? action.payload : reservation)
            }
        case 'DELETE_RESERVATIONS':
            return {
                ...state,
                reservations: action.payload
            }
        default:
            return state
    }
}

export default reservationsReducer