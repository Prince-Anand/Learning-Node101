const mongoose = require("mongoose");
const validator = require("validator")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLenght: 50
    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if (!["male","female","others"].includes(value)){
                throw new Error("Not a valid gender (male,female,others)");
            }
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Wrong email format")
            }
        }
    },
    password: {
        type: String,
        minLength: 8
    },
    photoUrl:{
        type: String,
        trim: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s",
        validate(value){
            if (!validator.isURL(value)){
                throw new Error("Wrong URL")
            }
        }
    },
    about:{
        type: String,
        default: "This is a bio"
    },
    skills: {
        type: Array
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User",userSchema);