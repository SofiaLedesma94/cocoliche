
const initialState = {
    events: [],
    filter: []
  }
  
function eventReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_EVENT':
        return {
          ...state,
          events: state.events.concat(action.payload)
        }
      case 'GET_EVENTS':
        return {
          ...state,
          events: action.payload,
        }
      case 'SEARCH_EVENTS':
          return {
              ...state,
              filter: state.events.filter(event => event.title.toUpperCase().includes(action.payload.toUpperCase().trim())
            || event.artist.toUpperCase().includes(action.payload.toUpperCase().trim())  
              || event.user.categoty.toUpperCase().includes(action.payload.toUpperCase().trim()))
        }

      case 'DELETE_EVENT': 
        return {
          ...state,
          events: action.payload
        }
        default:
        return state
      }
  }
  
  export default eventReducer