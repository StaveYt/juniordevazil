import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
const DB_ADDRESS = process.env.DB_ADDRESS
export const dbConnection = ()=>{
    
    mongoose.connect(DB_ADDRESS || "mongodb://127.0.0.1:27017/azil")

    const db = mongoose.connection

    db.on("error", err=>{
        console.error("Error while connecting to the database:", err)
    })
    db.once("open", err=>{
        console.log("Connected to the database")
    })

    return db
}