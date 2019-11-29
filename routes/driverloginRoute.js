const express = require("express");
const router = express.Router();
const Drivers = require("../models/registerModel");

//Routes
router.get("/", (req,res)=> {
    res.render("driverLogin", {title:"Login"});
})

// submits a login page information
router.post('/', async(req, res) => {
    try{
        const driver = await Drivers.authenticate(req.body.username, req.body.password);
        req.session.driver=driver;
        res.render('driverSearch')
       // res.send("hey " + user.firstname + " " + user.lastname)
    }catch{
        res.render('driverLogin', {error: "Login Failed"})
    //    res.redi('register')
    }
})
 


module.exports = router;