import express from 'express'
import { authUser, registerUser } from '../controllers/UserController.js'
const router = express.Router()

router.post('/authUser', authUser)
router.post('/registerUser' , registerUser)

export default router;