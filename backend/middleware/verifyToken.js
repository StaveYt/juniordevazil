import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../server.js";

export const verifyToken = (role)=>(req,res,next)=>{
    const authHeader = req.headers["authorization"]
    if(!authHeader) {return res.status(403).send("Authorization header missing!")}

    const token = authHeader.split(" ")[1]
    if(!token) return res.status(403).send("Bearer token was not found")

    try {
        const decodedToken = jwt.decode(token, SECRET_KEY)
        if(decodedToken.role!=role && role!="any") return res.status(403).send("Invalid role")
        req.user = decodedToken
    } catch (error) {
        res.status(401).send("Invalid token")
    }
    next()
}