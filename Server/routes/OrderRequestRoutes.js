import express from 'express'

import { SubmitOrder } from '../controllers/OrderRequestController.js'

const router = express.Router()

router.post('/SubmitOrder', SubmitOrder)



export default router;