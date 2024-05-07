import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import { dbConnection } from "./db.js";
import userRoutes from "./routes/userRoutes.js"
import animalsRoutes from "./routes/animalsRoutes.js"
import donationsRoutes from "./routes/donationsRoutes.js"
import notificationsRoutes from "./routes/notificationsRoutes.js"
import { handleError } from "./middleware/handleError.js";

export const PORT = process.env.PORT
export const SECRET_KEY = process.env.SECRET_KEY

const app = express()

app.use(cors())
app.use(express.json())

const db = dbConnection()

app.use("/user", userRoutes)
app.use("/animal", animalsRoutes)
app.use("/notification", notificationsRoutes)
app.use("/donation", donationsRoutes)

app.use(handleError)

app.listen(PORT, ()=>{
    console.log("Server slusa na portu 3000")
})


