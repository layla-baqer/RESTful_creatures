const express = require("express")
const router = express.Router()
const fs = require("fs")

// lists all creatures
router.get("/", (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
    console.log(creatureData);
    res.render("prehistoric_creatures/index", {myCreatures: creatureData})
});

router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new');
});

router.get("/:idx", (req, res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)
    console.log("This is the req params object: ", req.params)
    // params is the url parameters
    let creatureIndex = parseInt(req.params.idx)
    res.render("prehistoric_creatures/show", {myCreatures: creatureData[creatureIndex]})
})

router.post("/", (req, res)=>{
    // the new submits are stored in req.body
    console.log("This is the request body: ", req.body)

    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)

    // if we are using a different name of the object keys than the already defined ones in the database then we can use the following code to set the name & type to the other names we're using, but this is not efficient code, so it's better to just change the name in the form.
    // let newDino = {
    //     name: req.body.myDinosaurName,
    //     type: req.body.DinosaurTypeInput
    // }

    // add item to dinosaurs array
    creatureData.push(req.body)

    // converts the object to JSON format (puts them in quotes) & adds the new object to the JSON file that we're using as a database (dinosaurs.json)
    // the key names have to match the existing key/column names for it to push the data to that database
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))

    res.redirect("/prehistoric_creatures")
})

// /: means it will take a "number"/"variable" not index
// index we can replace it with whatever we want, this is where we declare it
router.delete("/:index", (req, res)=>{
    console.log("This is my req params object: ", req.params)

    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)
    // 1 is the number of items to be deleted
    creatureData.splice(req.params.index, 1)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    res.redirect("/prehistoric_creatures")
})

router.get("/edit/:index", (req, res)=>{
    // grab dino data
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)

    // display edit page
    res.render("prehistoric_creatures/edit", {
        creature: creatureData[req.params.index], 
        creatureId: req.params.index
    })
})

router.put("/:creatureId", (req, res)=>{
    // grab dino data
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    // parse JSON data into JS object VVV
    let creatureData = JSON.parse(creatures)

    // update dinosaurs with form data
    creatureData[req.params.creatureId].type = req.body.type
    creatureData[req.params.creatureId].img_url = req.body.img_url

    // update json file with new data
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))

    // redirect to home page, this will rerun everything for home page
    res.redirect("/prehistoric_creatures")
})

  module.exports = router