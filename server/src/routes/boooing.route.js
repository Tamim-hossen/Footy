import express from 'express'
import {book,getTurfInfo} from '../controllers/booking.controller.js'
import {authbooking} from '../middleware/bookingControl.js'
const router = express.Router()

router.post('/book',authbooking,book)
router.get('/getInfo',getTurfInfo)

export default router