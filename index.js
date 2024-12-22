import express from "express"
import cors from "cors"
import { connectToDatabase } from "./connection/mongodb.js"
import { ObjectId } from "mongodb";

const app=express()
app.use(cors())
app.use(express.json())

// url - myapi
app.get("/myapi", async(req,res)=>{
    try {
        let {db}=await connectToDatabase()
        let data = await db.collection("tasks").find({}).toArray()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message":"error occurred"
        })
    }
});

//port number
app.listen(5000,()=>{
    console.log("app is running")
});

app.post("/getTask",async(req,res)=>{
    let data
    try{
        let {db}=await connectToDatabase()
        data=await db.collection("tasks").find().toArray()
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Server Error"})
    }
});
app.post("/createTask",async(req,res)=>{
    let data 
     try{
       let {db}=await connectToDatabase()
       data=await db.collection("tasks").insertOne(req.body)
       res.status(200).json(data)
     }
     catch(err){
       console.log(err)
       res.status(500).json(data)
     }
 });

app.post("/deleteTask",async(req,res)=>{
    console.log(req.body.id)
   let data 
    try{
      let {db}=await connectToDatabase()
      data=await db.collection("tasks").deleteOne({_id: new ObjectId(req.body.id)})
      res.status(200).json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({message:"Unable to Delete"})
    }
});