const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require("express-session");



//middle ware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))


// use sessions for traacking changes
app.use(session({
    secret:"thesecret",
    resave: true,
    saveUnitialized:true
}));


// app.get("/", (req, res) => {
//     res.render("register", {title:"Register"});
//   });
  
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/driverValidation", 
{ useNewUrlParser: true },
()=>{
    console.log("connected successfully to databse")
});

// import routes
const registrationRoutes = require("./routes/driverregisterRoute");
app.use("/driverregister", registrationRoutes);

const loginRoutes = require("./routes/driverloginRoute");
app.use("/driverlogin", loginRoutes);


const searchRoutes = require("./routes/driversearchRoute");
app.use("/driversearch", searchRoutes);



// 
// app.get("/login",(req,res)=>{
//     res.render("login", {title:"Login"});
// });

// app.get("/driverView",(req,res)=>{
//     res.render("driverview", {title:"Drivers Search"});
// });


app.get("/driver",(req,res)=>{
    res.render("driver", {title:"Driver"});
});


app.get("/logins",(req,res)=>{
    res.render("logins", {title:"Logged  in"});
});
// //logout
// app.post('/logout', (req, res) => {
//     if (req.session) {
//         req.session.destroy(function (err) {
//             if (err) {
//                 // failed to destroy session
//             } else {
//                 return res.redirect('/login');
//             }
//         })
//     }
// })


app.get("/landing", (req, res) => {
    res.render("landing");
  });

app.listen(3000, ()=> {
    console.log('listening on 3000')
})