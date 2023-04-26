import { AUTH, LOGOUT, GOOGLEAUTH} from "../constants/actionTypes"

const initialState = {
    profile:null,
    authData:null
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case GOOGLEAUTH:
            return {
                ...state,
                profile: action.data,
            }
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}))
            return { ...state, authData: action?.data}
        case LOGOUT:
                localStorage.clear()
                return {
                    ...state,
                    profile: initialState
                }
        default:
            return state
    }   
}

export default reducer