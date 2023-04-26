import React from "react"
import { ThemeProvider } from "@mui/system";
import { theme } from './styles'
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Auth from "./components/Auth/Auth";


const App = () => {

    return (
        
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Container maxWidth='lg'>
                        <Navbar />
                        <Routes>
                            <Route path="/" exact element={<Homepage />}/>
                            <Route path="/auth" element={<Auth />}/>
                        </Routes>
                    </Container>
                </ThemeProvider>
            </BrowserRouter>

        
        
    );
}
 
export default App;