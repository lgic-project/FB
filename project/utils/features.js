import jwt from "jsonwebtoken"

const secretKey = "siwan"

export const sendcookies = (user,res,message,statusCode=200)=>{
    const token = jwt.sign({_id:user._id}, secretKey)

    res
    .status(statusCode)
    .cookie("token", token,{
        httpOnly: true,
        maxAge:15 *60*1000,
    })
    .json({
        sucess: true,
        message
    })
}