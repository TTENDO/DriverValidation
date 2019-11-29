const express = require("express");
const router = express.Router();
const Drivers = require("../models/registerModel");

//Routes
router.get("/", (req,res)=> {
    res.render("driverRegister", {title:"Register"});
})


//extracts all data for the database and displays it
router.post("/", async (req, res) => {
  console.log(req.body)
    const register = new Drivers(req.body); //create an instance of the Register model for data entered(req.body==got from the user)
    
    // if (req.session.driver) {
    //   const items = await Drivers.find();
    //   res.redirect("list", { drivers: items, currentDriver: req.session.driver });
    // }
  
    // else {
    //   res.redirect('/login')
  
    // }
    //res.redirect('login')
    //await register.save();
    //console.log("Item has been saved");
    try{
      await register.save();
      console.log("item has been saved");
      const items = await Drivers.find();
       res.render("driverLogin",{drivers:items});

    }
    catch(err){
      console.log(err)
      // res.status(500).send("unable to save to the database");
       res.render("driverRegister")
    }
  
  
  });

 /*  router.get('/driver', async (req, res) => {
    if (req.session.driver) {
        const items = await Drivers.find()
        res.render('driverSearch', { drivers: items, currentDriver: req.session.driver})
    } else {
        res.redirect('/driverlogin')
    }
  }) */



module.exports = router;