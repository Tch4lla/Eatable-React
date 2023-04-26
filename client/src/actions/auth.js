import * as api from '../api'
import { AUTH } from '../constants/actionTypes'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //log in user 
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //sign up a user 
        const { data } = await api.signUp(formData)
        console.log( "SignUp data: ", data )
        dispatch({ type: AUTH, data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}