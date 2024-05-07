import dbConnection from "mongoose"
import { Schema, model } from "mongoose"

const userSchema = new Schema({
    username:{type: String, unique:true},
    email:{type:String, unique: true},
    password:String,
    dob:String,
    role:String
})

const notificationSchema = new Schema({
    title:String,
    date:String,
    text:String,
    important:String
})

const donationSchema = new Schema({
    category:String,
    type:String,
    value:Number,
    desc:String
})

const animalSchema = new Schema({
    name:String,
    type:String,
    cip:String,
    age:Number,
    desc:String,
    appoint:String,
    adopted:Boolean,
    img:String
})

export const User = model("User", userSchema)

export const Notification = model("Notification", notificationSchema)

export const Donation = model("Donation", donationSchema)

export const Animal = model("Animal", animalSchema)