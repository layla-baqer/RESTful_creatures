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

  module.exports = router