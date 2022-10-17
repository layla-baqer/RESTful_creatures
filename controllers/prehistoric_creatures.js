const express = require("express")
const app = express()
const fs = require("fs")

// lists all creatures
app.get('/prehistoric_creatures', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
    console.log(creatureData);
    res.render("prehistoric_creatures/index", {myCreatures: creatureData})
  });