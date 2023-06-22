import { getallusers, Register, LogIn, myprofile, logOut, } from "../controllers/user.js"

// import { isAuthenticated } from "../middlewares/auth.js";
import express from 'express';
const router = express()

router.post("/login", LogIn)

router.get("/logout", logOut)

router.post("/register", Register)



export default router;

