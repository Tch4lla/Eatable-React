import PostMessage from "../models/postMessage.js"

/* ----------Get Post Logic----------- */

export const getPosts = async (req, res) => {
    try {
        const allPosts = await PostMessage.find()
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

/* ----------Create Post Logic----------- */

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

