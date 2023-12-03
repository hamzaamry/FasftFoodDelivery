import express from 'express'

import { SubmitRequest, AuthDeliveryGuy, GetClientOrders } from '../controllers/DeliveryGuyController.js'

const router = express.Router()

router.get('/GetClientOrders', GetClientOrders)

router.post('/SubmitRequest', SubmitRequest)
router.post('/AuthDeliveryGuy', AuthDeliveryGuy)



export default router;
