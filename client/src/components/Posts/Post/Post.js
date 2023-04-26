import React from "react";
import { ThemeProvider } from "@mui/system";
import { theme } from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material'
import { ThumbUpAlt } from '@mui/icons-material'
import { Delete } from '@mui/icons-material'
import { MoreHoriz } from "@mui/icons-material";
import moment from 'moment'

import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
   
    const dispatch = useDispatch()
    return ( 
        <ThemeProvider theme={theme}>
            <Card sx={theme.card}>
                <CardMedia sx={theme.media} image={post.selectedFile} title={post.title}/> 
                <div style={{position: 'absolute',top: '20px',left: '20px',color: 'white'}}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div style={{position: 'absolute', top: theme.overlay.top, right: '20px', color: 'white',}}>
                    <Button 
                        style={{color: "white"}} 
                        size="small" 
                        onClick={() => setCurrentId(post._id)}
                        >
                            <MoreHoriz fontSize="default"/> 
                    </Button>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px',}}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography sx={theme.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions sx={theme.cardActions}>
                    <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                        <ThumbUpAlt fontSize="small" />
                        &nbsp;Like&nbsp;
                        {post.likeCount}
                    </Button>
                    <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                        <Delete fontSize="small" />
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}
 
export default Post;