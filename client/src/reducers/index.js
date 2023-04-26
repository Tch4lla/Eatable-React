import { combineReducers } from "redux";
import posts from './posts'
import profileReducer from './auth'

export default combineReducers({ posts, profile: profileReducer })