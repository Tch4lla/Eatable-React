import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import { ThemeProvider } from "@mui/system";
import { theme } from './styles'
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({ setCurrentId }) => {
    
    const posts = useSelector((state) => state.posts)
    console.log(posts)

    return ( 
        !posts.length ? <CircularProgress /> : (
            <ThemeProvider theme={theme}>
                <Grid 
                    sx={theme.container}
                    container
                    alignItems="stretch"
                    spacing={3}
                    >
                        {posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={6}>
                                <Post post={post} setCurrentId={setCurrentId}/>
                            </Grid>
                        ))}
                </Grid>
            </ThemeProvider>

        )
    );
}
 
export default Posts;