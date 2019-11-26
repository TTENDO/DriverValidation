const express = require("express");
const router = express.Router();
const Drivers = require("../models/registerModel");

//Routes
router.get("/", (req,res)=> {
    res.render("register");
})

router.post("/", (req,res)=> {
    const register = new Drivers(req.body);
    register.save()
    .then(item=> {
        Drivers.find().then(
            items=>{
                res.render("list", {drivers:items});
            })
    })
    .catch(err => {
        res.status(500).send("unable to save to database")
    })
})

module.exports = router;