import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client"
import App from "./App"
import './index.css'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// Provider keeps track of the global state. 
import { Provider } from "react-redux";
import reducers from './reducers'
import { GoogleOAuthProvider } from "@react-oauth/google";
const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    </GoogleOAuthProvider>
);
