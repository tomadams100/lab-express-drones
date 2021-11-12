const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model')
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({extended: true}))

// require the Drone model here
router.route('/drones')
.get(async(req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  try {
    let allDrones = await Drone.find()
    res.render("drones/list",allDrones)
  } catch(err) {
    console.log(err)
  } 
})

router.route('/drones/create')
.get((req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form")
})
.post(async(req,res)=> {
  try {
    const {name,propellers,maxSpeed} = req.body
    let createDrones = await Drone.create({name,propellers,maxSpeed})
    let allDrones = await Drone.find()
    res.render("drones/list",allDrones)
  } catch { 
    res.render("drones/create-form")
  }
})

router.get('/drones/:id/edit', async(req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const {id} = req.params
    let thisDrone = await Drone.findById(id)
    res.render("drones/update-form",{name: thisDrone.name,propellers: thisDrone.propellers,maxSpeed: thisDrone.maxSpeed,id:id})
  } catch (err) {
    console.log(err)
  }
});

router.post('/drones/:id/edit', async(req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const {id} = req.params
    const {name,propellers,maxSpeed} = req.body
    let updateDrone = await Drone.findByIdAndUpdate(id,{name: name,propellers: propellers, maxSpeed:maxSpeed})
    let allDrones = await Drone.find()
    res.render("drones/list",allDrones)
  } catch {
    const {id} = req.params
    res.render(`/drones/${id}/edit`)
  }
  
});

router.post('/drones/:id/delete', async(req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    const {id} = req.params
    let deleteDrone = await Drone.findByIdAndDelete(id)
    let allDrones = await Drone.find()
    res.render("drones/list",allDrones)
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
