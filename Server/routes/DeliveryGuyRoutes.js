import express, { Router } from 'express'

import { SubmitRequest } from '../controllers/DeliveryGuyController.js'

const router = express.Router()

router.post('/SubmitRequest', SubmitRequest)



export default router;
