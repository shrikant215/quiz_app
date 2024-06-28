const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// const authMiddleware = require('../middleware/auth');


const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

const url = process.env.MONGODB_URL;


const PORT = process.env.PORT || 5000;

//schema
const schemaData = mongoose.Schema({
    username : String,
    password : String,
    
},{
    strict: true, timestamps: true, versionKey: false 
})
const userModel = mongoose.model("users",schemaData);

const schemaUserData = mongoose.Schema({
    name : String,
    date : String,
    time : String,
    score : String,
    loginId: String,

},{
    strict: true, timestamps: true, versionKey: false 
})
const userDataModel = mongoose.model("userdata",schemaUserData);

//Get users
app.get('/get/userdata', async (req, res) => {
    try{
        const userdata = await userDataModel.find();
        res.json(userdata);
    }catch(err){
        console.err('Error on fetching user data:', err);
        res.status(500).json({err: 'Internal server error'})
    }
})

app.post('/create', async (req, res) => {
    const { name, date, time, score, loginId } = req.body;
    try {
        const newScores = new userDataModel({  name, date, time, score, loginId });
        await newScores.save();
        res.status(201).json({ message: 'Post Successful' });
        console.log(newScores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Sign-up endpoint
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await userModel.findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: 'Username already exists' });
      } else {
        const newUser = new userModel({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Sign-up successful' });
        console.log(newUser)
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //Login endpoints
app.post('/api/login', async(req, res)=> {
    const{ username,password} = req.body;
    try{
        const user = await userModel.findOne({username, password});
        if(user){

            res.status(200).json({message: 'Login Successful', userId: user._id })
            console.log(user._id)
        }else{
            res.status(401).json({message: 'Invalid credentials'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

// DbConnection
mongoose.connect(url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('connected')
    app.listen(PORT,()=> console.log('Server is running'))
})
.catch((err)=>{
    console.log(err)
})
