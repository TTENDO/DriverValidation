const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb://localhost:27017/driverValidation",
  { useNewUrlParser: true },
  () => {
    console.log("connected successfully to databse");
  }
);

//middle ware
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

//use sessions for traacking changes
// app.use(session({
//     secret:"thesecret",
//     resave: true,
//     saveUnitialized:false
// }));

// import routes
const registrationRoutes = require("./routes/registerRoute");
app.use("/register", registrationRoutes);
app.use(express.static(path.join(__dirname, "public")));

// const loginRoutes = require("./routes/loginRoute");
// app.use("/login", loginRoutes);

app.get("/", (req, res) => {
  res.render("register", { title: "Smart parking System" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/landing", (req, res) => {
  res.render("landing");
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

app.listen(3000, () => {
  console.log("listening on 3000");
});
