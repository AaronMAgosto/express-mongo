import {db} from "./dbConnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection("plants")

//crud - get
export async function getAllPlants(req,res) {
    const plants = await coll.find({}).toArray()
    res.send(plants)
}
  
// crud - post
export async function addPlant (req,res) {
    const newPlant = req.body    
    await coll.insertOne(newPlant)
    res.status(201).send({message: "new plant added"})
}

// crud - delete
export async function deletePlant(req,res){
const docId= {"_id": new ObjectId(req.params.docId)}

    await coll.deleteOne( docId)
    res.status(201).send({message: "plant has been deleted :((("})
}

// crud - update
export async function updatePlant (req, res) {
    const docId = { "_id" : new ObjectId(req.params.docId)}
    const updatePlant =  req.body
    const updateFilter =  {$set: {}}
    updateFilter["$set"] = updatePlant
    await coll.updateOne(
        {"_id" : docId},
       updateFilter
    )
    res.status(201).send({ message : "plant has been updated"})
}