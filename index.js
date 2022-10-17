const express = require("express")
const app = express()
PORT = 3500

const ejsLayouts = require("express-ejs-layouts")
app.use(ejsLayouts)

// this is for the put
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// this is for the post
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs")

app.use((req, res, next)=>{
    console.log(`Request for ${req.method} at ${req.path}`)
    next()
})

// we can have multipules of the following line
app.use("/dinosaurs", require("./controllers/dinosaurs"))
app.use("/prehistoric_creatures", require("./controllers/prehistoric_creatures"))

// app.get("/", (req, res)=>{
//     res.redirect("/dinosaurs")
// })

app.get("/", (req, res)=>{
    res.render("home")
})

app.listen(PORT, ()=>{
    console.log("Listening ....")
})