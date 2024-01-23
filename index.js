const express = require("express");
const cors = require("cors");
const app = express();


//app.use(cors());
const corsOptions = {
 
  origin:"https://login-client.netlify.app",
   credentials: true,
   optionSuccessStatus: 200,
 }
 app.use(cors(corsOptions))
app.use(express.json());
const port = process.env.PORT || 5001;


const {MongoClient,ServerApiVersion, ObjectId}=require('mongodb')
const uri=`mongodb+srv://sowad1999:job_task@cluster0.1kwmu9j.mongodb.net/?retryWrites=true&w=majority`
const client=new MongoClient(uri,{
    serverApi:{
    version: ServerApiVersion.v1,
    strict:true,
    deprecationErrors:true
    }
})
async function run(){
    try{
      
       const database=  client.db("login_task")
       const userCollections=database.collection("user")

 // Save or modify user email, status in DB
 app.get("/use",async(req,res)=>{
  const result=await userCollections.find().toArray()
  res.send(result)
 })
 app.put('/users/:email', async (req, res) => {
  const email = req.params.email
  const user = req.body
  console.log("this is user .....",user)
  console.log("this is email .....",email)
  const query = { email: email }
  const options = { upsert: true }
  const isExist = await userCollections.findOne(query)
  console.log('User found?--dddddddd--->', isExist)
  if (isExist) {
   
      return res.send(isExist)
    
  }else{
    const result = userCollections.insertOne(user)
    return res.send(result)
  }

 
})
    

    

 

console.log("succesfully connected to mongo database")
        
    }finally{
     //   await client.close()
    }
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("Crud is running .....");
  });
app.listen(port, () => {
    console.log(`app is running in http://localhost:${port}/`)
  });