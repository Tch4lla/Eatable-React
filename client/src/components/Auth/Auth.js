import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { styles } from './styles'
import { LockOutlined } from '@mui/icons-material'
import Input from './Input'
import Icon from './icon'
import Homepage from '../Homepage/Homepage'

import { fetchProfile } from '../../utils/fetchProfile'
import { useGoogleLogin } from '@react-oauth/google'
import { setProfileAction } from '../../actions/profile'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ showPassword, setShowPassword] = useState(false)
    const [ isSignup, setIsSignup] = useState(false)
    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null)
    const [ formData, setFormData] = useState(initialState)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup) {
            dispatch(signup(formData, navigate))
            
        } else {
            dispatch(signin(formData, navigate))

        }
        console.log('Form Data:', formData)
        console.log('Profile:', profile)
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const googleSuccess = async ( codeResponse ) => {
        try {
            const user = await fetchProfile(codeResponse)
            setUser(user)
            console.log("User: ", user)
            dispatch(setProfileAction(user))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const login = useGoogleLogin({
        onSuccess: googleSuccess,
        onError: (error) => console.log('Login Failed:', error)
    });

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const switchMode = () => {setIsSignup((prevIsSignup) => !prevIsSignup)}


    useEffect(()=>{
        fetchProfile(user, setProfile)
    }, [user])
    
    return(
        profile ? (

            <Homepage />
            
        ) : (

        <ThemeProvider theme={styles}>
                <Container component="main" maxWidth="xs">
                    <Paper sx={styles.paper} elevation={3}>
                        <Avatar sx={styles.avatar}>
                            <LockOutlined />
                        </Avatar>
                        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Login'}</Typography>
                        <form style={{...styles.form}} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {
                                    isSignup && (
                                        <>
                                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                            <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                        </>
                                    )
                                }
                                <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                            </Grid>
                            <Button type="submit" fullWidth variant='contained' color='primary' sx={styles.submit}>
                                { isSignup ? "Sign Up" : "Login"}
                            </Button>                            
                            <Button sx={styles.googleButton} color='secondary' fullWidth startIcon={<Icon />} variant='contained' onClick={()=> login()}>
                                Sign in with Google!
                            </Button>
                            <Grid container justifyContent={"flex-end"}>
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        { isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
        </ThemeProvider>
        )
    )
        
}

export default Auth