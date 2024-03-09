const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors(
    {
        origin: ["https://todo-list-frontend-mocha.vercel.app"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://rathoreyash2003:batkagrip%40123@atlascluster.d0x5pb7.mongodb.net/test')

app.get('/get', (req,res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) =>{
    const{id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) =>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})
app.listen("https://todo-list-frontend-mocha.vercel.app", ()=>{
    console.log("Server is Running")
})