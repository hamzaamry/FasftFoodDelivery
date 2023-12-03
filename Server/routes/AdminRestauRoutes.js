import express from 'express'
import {SubmitRequest, AddFood} from '../controllers/AdminRestauController.js'

const router = express.Router()

router.post('/SubmitRequest', SubmitRequest)
router.post('/AddFood', AddFood)

export default router;