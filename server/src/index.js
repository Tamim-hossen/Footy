import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './utils/db.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import bookingRoutes from './routes/boooing.route.js'

dotenv.config()

const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

const app= express()

app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173','https://footsy.up.railway.app'],
    credentials:true
    }))
app.use(express.json({limit:"10mb"}))

app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/booking',bookingRoutes)

app.listen(PORT,(req,res)=>{
    console.log("Connected to Server")
    connectDB()
})
app.get("/",(_,res)=>{
    return res.status(200).json({
        status:"Healthy!"
    })
})