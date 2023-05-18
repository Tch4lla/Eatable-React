import mongoose from 'mongoose'

const googleUserSchema = mongoose.Schema({
    email: { type: String, required: true},
    googleId: { type: String, required: true }
})

export default mongoose.model("GoogleUser", googleUserSchema)