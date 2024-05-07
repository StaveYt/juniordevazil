import express from "express"
import {dbConnection} from "../db.js"
import bcrypt from "bcrypt"
import { User } from "../scheme.js";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../server.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router()
const db = dbConnection()
const saltRunde = 10
 
router.get("/", verifyToken("any"), (req,res,next)=>{
    try {
        res.json(req.user)
    } catch (error) {
        console.log("err")
        next(error)
    }
})

router.post("/register", async (req,res, next)=>{
    try {
        const regInfo = req.body
        const hashPass = await bcrypt.hash(regInfo.password, saltRunde)
        const user = new User({...regInfo, password:hashPass})
        await user.save()
        const token = jwt.sign({userId: user._id, role: user.role}, SECRET_KEY)
        res.json({ token })
    } catch (error) {
        next(error)
    }
})

router.post("/login", async (req,res,next)=>{
    try {
        const loginInfo = req.body
        console.log(req.body)
        const user = await User.findOne({email: loginInfo.email})
        if(user && await bcrypt.compare(loginInfo.password, user.password)){
            const token = jwt.sign({userId: user._id, role: user.role}, SECRET_KEY)
            res.json({ token })
        }
    } catch (error) {
        next(error)
    }
})
 

export default router