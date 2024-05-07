import express from "express"
import {dbConnection} from "../db.js"
import { Donation } from "../scheme.js";
import { verifyToken } from "../middleware/verifyToken.js";
const db = dbConnection()
const router = express.Router()

router.get("/", verifyToken("any"), async (req,res,next)=>{
    try {
        const donations = await Donation.find({})
        
        res.send(donations)
    } catch (error) {
        next(error)
    }
})

router.post("/", verifyToken("any"), async (req,res,next)=>{
    try {
        const donationInfo = req.body
        
        const donation = new Donation(donationInfo)
        await donation.save()
        
        res.send("Donacija spremljena")
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

router.patch("/:id", verifyToken("admin"), async (req,res,next)=>{
    try {
        const donationId = req.params.id
        const donation = Donation.findByIdAndUpdate(donationId, req.body)
        if(!donation) throw new Error("Error while deleting donation")

        res.json(donation)
    } catch (error) {
        next(error)
    }
})

export default router