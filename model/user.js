import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,

    },

    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        default : "customer",
    },
    isBlocked : {
        type : String,
        required : true,
        default : false,
    },

    img : {
        type : String,
        required : true,
        default : "https://cdn.pixabay.com/photo/2020/12/01/20/28/avatar-1868728_1280.png",
    }



})


const User = mongoose.model("users", userSchema)
export default User;