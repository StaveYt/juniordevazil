import express from "express"
import {dbConnection} from "../db.js"
import { Notification } from "../scheme.js";
import { verifyToken } from "../middleware/verifyToken.js";
const db = dbConnection()
const router = express.Router()

router.get("/", verifyToken("any"), async (req,res,next)=>{
    try {
        const notifications = await Notification.find({})
        res.json(notifications)
    } catch (error) {
        next(error)
    }
})

router.post("/", verifyToken("any"), async (req,res,next)=>{
    try {
        const notificationInfo = req.body
        const notification = new Notification(notificationInfo)
        await notification.save()
        
        res.send("Obavijest spremljena")
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", verifyToken("admin"), async (req,res,next)=>{
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id)
        if(!notification) throw new Error("Error while deleting notification")
        res.send("Obavijest izbrisana")
    } catch (error) {
        next(error)
    }
})

export default router