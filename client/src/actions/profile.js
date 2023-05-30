import { SET_USER_PROFILE } from "../constants/actionTypes";

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    payload: profile
})