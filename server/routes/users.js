import express from "express";

import { signin, signup, googleAuth, profile  } from "../controllers/user.js";

const router = express.Router()

router.get('/profile', profile)
router.post('/signin', signin)
router.post('/signup', signup)
router.post('/google-auth', googleAuth)
export default router