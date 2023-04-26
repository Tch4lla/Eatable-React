import React, { useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { ThemeProvider } from '@mui/system'
import { theme } from './styles'
import logo from '../../images/Eatable_logo.png'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'

import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        navigate('/')
        setProfile(null)
    }

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('profile'));
    //     // if (storedProfile !== profile) {
    //     //     setProfile(storedProfile);
    //     // }

        // const id = storedProfile?.id
        setProfile(storedProfile)
    },[location])

    return (
        <ThemeProvider theme={theme}>
            <AppBar sx={theme.appBar} color="inherit">
                <div style={{...theme.brandContainer}}>
                    <Link to="/">
                        <img src={logo} alt="EatableLogo" height="60"/>
                    </Link>
                </div>
                <Toolbar sx={theme.toolbar}>
                    { profile && profile.family_name ? (
                        <div style={{...theme.profile}}>
                            <Avatar sx={theme.purple} alt="profile name" src={profile.picture}>{profile.name.charAt(0)}</Avatar>
                            <Typography sx={theme.profileName} variant='h6'>Welcome back {profile.given_name}!</Typography>
                            <Button variant='contained' sx={theme.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : profile && profile.result ? (
                        <div style={{...theme.profile}}>
                            <Avatar sx={theme.purple} alt="profile name" src={profile.picture}>{profile.result.name.charAt(0)}</Avatar>
                            <Typography sx={theme.profileName} variant='h6'>Welcome back {profile.result.name.split(' ')[0]}!</Typography>
                            <Button variant='contained' sx={theme.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant='contained' color='primary'>Get Started</Button>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
    
export default Navbar