import express from 'express'
import { authUser, logoutUser, registerUser } from '../controllers/UserController.js'
const router = express.Router()


router.post('/authUser', authUser)

router.post('/registerUser' , registerUser)

router.post('/logoutUser', logoutUser)


export default router;