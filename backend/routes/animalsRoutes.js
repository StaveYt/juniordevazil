import express from "express"
import {dbConnection} from "../db.js"
import { Animal } from "../scheme.js";
import { verifyToken } from "../middleware/verifyToken.js";
const db = dbConnection()
const router = express.Router()

router.get("/", verifyToken("any"), async (req,res,next)=>{
    try {
        const animals = await Animal.find({})
        res.json(animals)
    } catch (error) {
        next(error)
    }
})

router.post("/", verifyToken("admin"), async (req,res,next)=>{
    try {
        const animalInfo = req.body
        const animal = new Animal(animalInfo)
        await animal.save()
        
        res.send("Zivotinja spremljena")
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", verifyToken("admin"), async (req,res,next)=>{
    try {
        const animalId = req.params.id
        const animal = Animal.findByIdAndDelete(animalId)
        if(!animal) throw new Error("Animal does not exist")
        res.send("Animal deleted!")

    } catch (error) {
        next(error)
    }
})

router.put("/:id", verifyToken("admin"), async (req,res,next)=>{
    try {
        const animalId = req.params.id
        const animalInfo = req.body
        const animal = await Animal.findByIdAndUpdate(animalId, animalInfo, {new:true})
        if(!animal) throw new Error("Error while updating animal")
        res.json(animal)
    } catch (error) {
        next(error)
    }
})

router.patch("/:id", verifyToken("admin"), async (req,res,next)=>{
    try {
        const animalId = req.params.id
        const animalInfo = req.body
        const animal = await Animal.findByIdAndUpdate(animalId, animalInfo)
        if(!animal) throw new Error("Error while updating animal")
        res.json(animal)
    } catch (error) {
        next(error)
    }
})

export default router