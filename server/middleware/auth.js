import jwt from 'jsonwebtoken'
const decode = jwt.decode
import dotenv from 'dotenv'
dotenv.config()

const auth = async( req, res, next ) => {
    try {
        //checks if user's token is valid in order to like and delete posts 
        const authHeader = req.headers.authorization
        console.log(authHeader)
        if (!authHeader) {
            throw new Error('Authorization header is missing')
        }
        
        const token = authHeader.split(' ')[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.userID = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userID = decodedData?.id
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth