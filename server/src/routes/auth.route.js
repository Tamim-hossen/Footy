import express from 'express'
import { login,signup,authUser,logout,changePassword,changeInformation,bookignInfo } from '../controllers/auth.controller.js'
import { protectedRoute } from '../middleware/protectedRoute.js'
import { authUserControl } from '../middleware/authcontrol.js'

const router=express.Router()

router.post("/login", login)
router.post("/signup",signup)
router.post("/logout",logout)
router.post('/changepassword',authUserControl,changePassword)
router.post('/changeinformation',authUserControl,changeInformation)

router.get('/user',protectedRoute,authUser)
router.get('/bookigninfo',protectedRoute,bookignInfo)

export default router