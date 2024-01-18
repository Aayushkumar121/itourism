const place = require('../models/place')
const {verifyToken , verifyTokenAdmin}=require('../middlewares/verifyToken')
const placeController = require('express').Router()

// Get All
placeController.get('/',verifyToken,async(req,res)=>
{
    try 
    {
        const type= req.query.type
        let places
        if(type)
        {
            places= await place.find({type: type}).limit(10)
        }
        else{
            places= await place.find({}).limit(10) 
        }
        return res.status(200).json(places)
    }
    catch(error)
    {
        console.error(error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
})


//// Get One

placeController.get("/find/:id",verifyToken,async(req,res)=>
{
    try 
    {
        const id= req.params.id
        const Place = await place.findById(id)
        return res.status(200).json(Place)
    }
    catch(error)
    {
        console.error(error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
})

//// Book
placeController.put("/bookPlace/:id",verifyToken,async(req,res)=>
{
    try 
    {
        const {unavailableDate}= req.body
        const Place = await place.findById(req.params.id)
        Place.unavailableDate = Place.unavailableDate.concat(unavailableDate);

        await Place.save()
        return res.status(200).json(Place)
    }
    catch(error)
    {
        console.error(error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
})

//Create 
placeController.post('/',verifyTokenAdmin,async(req,res)=>
{
    try 
    {
        const createdplace = await place.create(req.body)        
        return res.status(201).json(createdplace)
    }
    catch(error)
    {
        console.error(error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
})

// update 
placeController.put("/:id",verifyTokenAdmin,async(req,res)=>
{
    try 
    {
        const updatedplace=  await place.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        return res.status(200).json(updatedplace)
    }
    catch(error)
    {
        console.error(error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
})

//// delete
placeController.delete("/:id",verifyTokenAdmin,async(req,res)=>
{
    try 
    {
        await place.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: "Successfully deleted"})
    }
    catch(error)
    {
        console.error(error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
})


module.exports = placeController