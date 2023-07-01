
const { error } = require("console");
const express = require("express");
const LocalStorage = require('node-localstorage').LocalStorage
const bodyParser = require('body-parser')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const localStorage = new LocalStorage('./storage');


const users = [];
const userdetails =  localStorage.getItem('users');



app.get('/',(req,res)=>{
    res.send(userdetails)
})

app.post('/post',(req,res)=>{
    const user = {
        name :req.body.name,
        email:req.body.email
    }
    users.push(user)
    localStorage.setItem('users',JSON.stringify(users));
   
    res.send("inserted")
    console.log("inserted")
})
app.post('/login',(req,res)=>{

    const users = JSON.parse(userdetails)
    const{email} = req.body
const user = users.find(user => user.email === email);
if (user) {
  res.send('Logged in');
} else {
  res.send('Not logged in');
}
})

app.post('/remove',(req,res)=>{
 const users = JSON.parse(userdetails);
 const {name,email}= req.body;
 const filtering = users.filter(user=>user.name !== name && user.email !== email )

 localStorage.removeItem('users');
 localStorage.setItem('users',JSON.stringify(filtering))
 res.send("items removed")
})
    
app.listen(3000,()=>{console.log("Server Running")})