import { GOOGLEAUTH } from "../constants/actionTypes";

export const setProfileAction = (profile) => ({
    type: GOOGLEAUTH,
    payload: profile
})