import User from "../models/user.js"
import jwt from "jsonwebtoken"

const secretKey = "siwan"

export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return res.status(404).json({
        sucess: false,
        message: "Login Failed"
    })

    const decoded = jwt.verify(token, secretKey)
    req.user = await User.findById(decoded._id)
    next();


}
