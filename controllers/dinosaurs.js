const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/", (req, res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    res.render("dinosaurs/index", {myDinos: dinoData})
})

router.get('/new', (req, res) => {
    res.render('dinosaurs/new');
});

// anything with : in the route we have to put it in the bottom below all other get routes
router.get("/:idx", (req, res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    console.log("This is the req params object: ", req.params)
    // params is the url parameters
    let dinoIndex = parseInt(req.params.idx)
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]})
})

router.post("/", (req, res)=>{
    // the new submits are stored in req.body
    console.log("This is the request body: ", req.body)

    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    // if we are using a different name of the object keys than the already defined ones in the database then we can use the following code to set the name & type to the other names we're using, but this is not efficient code, so it's better to just change the name in the form.
    // let newDino = {
    //     name: req.body.myDinosaurName,
    //     type: req.body.DinosaurTypeInput
    // }

    // add item to dinosaurs array
    dinoData.push(req.body)

    // converts the object to JSON format (puts them in quotes) & adds the new object to the JSON file that we're using as a database (dinosaurs.json)
    // the key names have to match the existing key/column names for it to push the data to that database
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))

    res.redirect("/dinosaurs")
})

// /: means it will take a "number"/"variable" not index
// index we can replace it with whatever we want, this is where we declare it
router.delete("/:index", (req, res)=>{
    console.log("This is my req params object: ", req.params)

    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs)
    // 1 is the number of items to be deleted
    dinoData.splice(req.params.index, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect("/dinosaurs")
})

router.get("/edit/:index", (req, res)=>{
    // grab dino data
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    // display edit page
    res.render("dinosaurs/edit", {
        dino: dinoData[req.params.index], 
        dinoId: req.params.index
    })
})

router.put("/:dinoId", (req, res)=>{
    // grab dino data
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    // parse JSON data into JS object VVV
    let dinoData = JSON.parse(dinosaurs)

    // update dinosaurs with form data
    dinoData[req.params.dinoId].name = req.body.name
    dinoData[req.params.dinoId].type = req.body.type

    // update json file with new data
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))

    // redirect to home page, this will rerun everything for home page
    res.redirect("/dinosaurs")
})

module.exports = router