
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// creating a database Schema
const registerSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: "Please enter first name"
    },
    lastname:{
        type: String,
        required: "Please enter last name"
    },
    // username:{
    //     type: String, unique:true,
    //     required: "Please enter Username"
    // },
    // number:{
    //     type: String,
    //     required: "Please enter phone number"
    // },
    regNo:{
        type:String, unique:true,
        required: "Please enter your Car Reg Number"
    }
    // password:{
    //     type: String,
    //     required: "Please enter password"
    // },
})

module.exports = mongoose.model("Drivers", registerSchema)