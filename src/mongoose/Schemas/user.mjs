import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    id : { type : Number , required : true , unique : true } ,
    username : { type : String , required : true , unique : true } ,
    insta : { type : String , required : true } ,
    password : { type : String , required : true } ,
} , { timestamps : true } );

export const User = mongoose.model( "User" , userSchema );