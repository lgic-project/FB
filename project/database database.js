import mongoose from "mongoose"

mongoose.connect("mongodb+srv://nabinpoudel788:whathell2000@api.fbhuoqq.mongodb.net/api?retryWrites=true&w=majority")
.then(()=>console.log("Database connection sucessfull"))
.catch((e)=>console.log(e))


