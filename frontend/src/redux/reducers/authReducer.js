const initialState = {
    loggedUser: null,
    countries: []
}

function authReducer(state = initialState, action) {
    switch (action.type) {

        case 'LOG_USER':
            if (localStorage.getItem('cart')) {
                var savedCart = localStorage.getItem('cart')
            } else {
                var savedCart = "[]"
            }
            localStorage.setItem('firstname', action.payload.firstname)
            localStorage.setItem('urlPic', action.payload.urlPic)
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('role', action.payload.role)
            localStorage.setItem('_id', action.payload._id)
            localStorage.setItem('cart', savedCart)

            const purchases = JSON.stringify(action.payload.purchases)
            localStorage.setItem('purchases', purchases)
            return {
                ...state,
                loggedUser: action.payload
            }
        case 'LOG_OUT_USER':
            localStorage.removeItem('firstname')
            localStorage.removeItem('urlPic')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('_id')
            localStorage.removeItem('purchases')
            localStorage.setItem('cart', [])

            return {
                ...state,
                loggedUser: null
            }
        default:
            return state
    }
}

export default authReducer
