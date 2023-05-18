import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
import User from '../models/user.js'
import axios from 'axios'
import googleUser from '../models/googleUser.js'

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare( password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials"})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: "12h"})
        res.status(200).json({result: existingUser, token})

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong on our end'})
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if(existingUser) return res.status(400).json({ message: "User already exists"})

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match"})

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})
        const token = jwt.sign({ email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: "12h"})

        res.status(200).json({result, token})

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong on our end'})

    }
}

export const googleAuth = async (req, res) => {
    const {email, googleId} = req.body

    try {
        const user = await googleUser.findOne({ email })

        if(user) {
            const token = jwt.sign({ email: user.email}, process.env.JWT_SECRET)
            res.cookie('token', token, { httpOnly: true})
            res.json({success:true})
        } else {
            const newUser = new googleUser({ email, googleId })
            await newUser.save()
            const token = jwt.sign({ email: newUser.email}, process.env.JWT_SECRET)
            res.cookie('token', token, { httpOnly: true})
            res.json({ success: true})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

// export const googleAuth = async (req, res) => {
//     const { codeResponse } = req.body
//     try {
//         const user = await fetchProfile(codeResponse)
//         const userExists = await User.findOne({ email: user.email})
//         if(!userExists) {
//             const newUser = new User({
//                 name: user.name,
//                 email: user.email
//             })
//             await newUser.save()
//         }

//         const token = jwt.sign({ email:user.email}, process.env.JWT_SECRET)
//         res.cookie('token', token, {httpOnly: true})
//         res.json({success: true})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({success:false, message: 'Server Error'})
//     }
// }

// const fetchProfile = async (user) => {
//     try {
//       const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//         headers: {
//           Authorization: `Bearer ${user.access_token}`,
//           Accept: 'application/json',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       throw new Error('Failed to fetch user profile from Google');
//     }
//   };

// export const loginWithGoogle = async (req, res) => {
//     try {
//         const { code } = req.body

//         const { data: { access_token } } = await axios.post('https://oauth2.googleapis.com/token', {
//             code,
//             client_id: process.env.GOOGLE_CLIENT_ID,
//             client_secret: process.env.GOOGLE_CLIENT_SECRET,
//             redirect_uri: 'http://localhost:3000/',
//             grant_type: 'authorization_code',
//         })

//         const { data: { sub: googleId, name, email } } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);

//         let user = await User.findById({ googleId })

//         if(!user) {
//             user = await User.create({ googleId, name, email })
//         }
        
//         const payload = {
//             sub: user.googleId,
//             name: user.name,
//             email: user.email
//         }

//         const googleToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "12h"})
//     } catch (error) {
        
//     }
// }