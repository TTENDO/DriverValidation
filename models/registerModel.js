
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

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
    username:{
        type: String, unique:true,
        required: "Please enter Username"
    },
    // number:{
    //     type: String,
    //     required: "Please enter phone number"
    // },
    regNo:{
        type:String, unique:true,
        required: "Please enter your Car Reg Number"
    },
    password:{
        type: String,
        required: "Please enter password"
    }
})


//hashing a password before saving it to the database pre-save hook---------
/* hashing and salting(encrypting).....salt is the no. e.g 10..changes it 10 times
your password is saved as a string not your actual password i.e encrypts it */
registerSchema.pre('save', function (next) {
    this.password = bcryptjs.hashSync(this.password, 8);
    next()
  });
  
  // authenticate input against database
  registerSchema.statics.authenticate = async function (username, password) {
    const driver = await this.findOne({ username: username });
    if (!driver) {
      throw new Error("User not found.");
    }
    const match = await bcryptjs.compare(password, driver.password);
    if (match) {
      return driver;
    }
  };

module.exports = mongoose.model("Drivers", registerSchema)