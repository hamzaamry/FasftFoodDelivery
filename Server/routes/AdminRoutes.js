import express from 'express'
import { authAdmin, registerAdmin, checkAdminToken, RestauRequestHandler, DeleteRestau, DeliveryGuyRequestHandler, DeliveryGuyDelete, GetAllRestauRequests  } from '../controllers/AdminController.js'

const router = express.Router()


router.post('/authAdmin', authAdmin)
router.post('/registerAdmin' , registerAdmin)
router.get('/checkAdminToken' , checkAdminToken)

router.get('/GetAllRestauRequests', GetAllRestauRequests)

router.delete('/DeleteRestau', DeleteRestau)
router.delete('/DeliveryGuyDelete', DeliveryGuyDelete)





export default router;