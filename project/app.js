import express from 'express';
import router from "./routes/user.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

export const app = express()


// using middleware for req.body
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))


// using routes
app.use("/users", router)

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>")
});

