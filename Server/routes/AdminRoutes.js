import express from 'express'
import { authAdmin, registerAdmin } from '../controllers/AdminController.js'

const router = express.Router()


router.post('/authAdmin', authAdmin)
router.post('/registerAdmin' , registerAdmin)




export default router;