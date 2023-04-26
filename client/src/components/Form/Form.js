import React, { useState, useEffect } from "react";

import { ThemeProvider } from "@mui/system";
import { theme } from './styles'
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from '../../actions/posts'



const Form = ({ currentId, setCurrentId }) => {
    const [key, setKey] = useState(0)
    const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null)
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFiles: ''})
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({title: '', message: '', tags: '', selectedFiles: ''})
        setKey(prevKey => prevKey + 1)
    }

    if(!user){
        return (
            <Paper sx={theme.paper}>
               <Typography variant="h6" align="center">
                    Please sign in to create your own Eatables
                </Typography> 
            </Paper>
        )
    }

    return ( 
        <ThemeProvider theme={theme}>
            <Paper sx={theme.paper}>
                <form
                    style={{...theme.form, flex: 1, minWidth: 0}}
                    autoComplete="off" 
                    noValidate 
                    onSubmit={handleSubmit} >
                    <Typography variant="h6" align="center">{`${currentId ? 'Fixing' : 'Add'}`} Something Eatable</Typography>                    
                    <TextField 
                        sx={theme.textField}
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth 
                        value={postData.title} 
                        onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
                    <TextField
                        sx={theme.textField} 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth 
                        value={postData.message} 
                        onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
                    <TextField
                        sx={theme.textField} 
                        name="tags" 
                        variant="outlined" 
                        label="Tags" 
                        fullWidth 
                        value={postData.tags} 
                        onChange={(e) => {
                            const inputString = e.target.value.replace(/,/g, ' '); 
                            setPostData({ ...postData, tags: inputString.split(' ')})
                        }}
                    />
                    <div style={{ width: '97%', margin: '20px 0', display: 'flex', minWidth: 0}}>
                        <FileBase
                            key={key} 
                            type="file" 
                            multiple={false} 
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                            />
                    </div>
                    <Button 
                        sx={theme.buttonSubmit}
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        type="submit" 
                        fullWidth
                        >Submit</Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="small" 
                        onClick={clear}
                        fullWidth
                        >Clear</Button>
                </form>
            </Paper>
         </ThemeProvider>
    );
}
 
export default Form;