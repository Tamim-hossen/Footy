import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User.js'
dotenv.config()
export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(404).json({ message: "No Headers Found" })
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const user = await User.findById(verify.userId).select("-password")
        if (!user) {
            return res.status(401).json({ message: 'User not found!' })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}