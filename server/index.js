require('dotenv').config()
const express = require("express");
const massive = require('massive')
const session = require ('express-session')
const {registerUser,loginUser}=require('./controllers/authController')

const app = express()

app.use(express.json())

const {SERVER_PORT,CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(dbInstance =>{
   app.set('db',dbInstance)
   console.log('Database Connected') 
})
.catch(err=>{console.log(err)})


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}))

app.post("/auth/register", registerUser)
app.post("/auth/login", loginUser)
app.get("/auth/user", (req, res) => {
    res.status(200).json(req.session.user);
})



app.listen(SERVER_PORT,()=> console.log(`Listening on port ${SERVER_PORT}`))