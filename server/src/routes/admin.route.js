import express from 'express'
import {getUsers,banUser,unbanUser,addAdmin,getboookings,removeAdmin,individualDetails} from '../controllers/admin.controller.js'
import {authAdmin} from '../middleware/adminControl.js'
const router = express.Router()

router.get('/users',authAdmin,getUsers)
router.get('/getbookings',authAdmin,getboookings)
router.get('/getindividualdetails',authAdmin,individualDetails)
router.post('/banuser',authAdmin,banUser)
router.post('/unbanuser',authAdmin,unbanUser)
router.post('/addadmin',authAdmin,addAdmin)
router.post('/removeadmin',authAdmin,removeAdmin)




export default router