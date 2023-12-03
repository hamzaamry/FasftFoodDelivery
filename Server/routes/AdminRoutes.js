import express from 'express'
import { authAdmin, registerAdmin, checkAdminToken, RestauRequestHandler, DeleteRestau, DeliveryGuyRequestHandler, DeliveryGuyDelete, GetAllRestauRequests, getDeliveryGuysRequests  } from '../controllers/AdminController.js'

const router = express.Router()


router.post('/authAdmin', authAdmin)
router.post('/registerAdmin' , registerAdmin)
router.get('/checkAdminToken' , checkAdminToken)

router.get('/GetAllRestauRequests', GetAllRestauRequests)
router.get('/getDeliveryGuysRequests', getDeliveryGuysRequests)
 

router.post('/RestauRequestHandler' , RestauRequestHandler);
router.post('/DeliveryGuyRequestHandler' , DeliveryGuyRequestHandler);



router.delete('/DeleteRestau', DeleteRestau)
router.delete('/DeliveryGuyDelete', DeliveryGuyDelete)





export default router;