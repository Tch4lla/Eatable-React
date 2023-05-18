import express from "express";

import { signin, signup, googleAuth  } from "../controllers/user.js";

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/google-auth', googleAuth)
export default router