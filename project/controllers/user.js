import User from "../models/user.js"
import bcrypt from "bcrypt"
import { sendcookies } from "../utils/features.js"


export const getallusers = async (req, res) => {

}

export const LogIn = async (req, res, next) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password");
    
    
        if (!user) return res.status(404).json({
            sucess: false,
            message: "User not found",
        })
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) return res.status(404).json({
            sucess: false,
            message: "User not found",
        })
    
        sendcookies(user, res, `Welcome Back,${user.name}`, 200)

    } catch (error) {
        next(error)
        
    }
}

export const Register = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
    
        if (user) return res.status(404).json({
            sucess: false,
            message: "User Already created",
        })
    
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword })
    
        sendcookies(user, res, "register sucessfully", 201)

    } catch (error) {
        next(error)
        
    }
}

export const myprofile = (req, res) => {
    res.status(200).json({
        sucess: true,
        user: req.user,
    })
}

export const logOut = (req, res) => {
    res
    .status(200)
    .cookie("token", "", { 
        expires: new Date(Date.now()),  
    })
        .json({
            sucess: true,
            message: "LogOut Sucessfully",
            user: req.user,
        })
}
