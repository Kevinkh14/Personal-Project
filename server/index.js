require('dotenv').config()
const express = require("express");
const massive = require('massive')
const session = require ('express-session')
const {registerUser,loginUser,logOut}=require('./controllers/authController')
const {addPost,getAllPost,getNonUserPost,deletePost,getPastPost,getUsername,editPost} = require('./controllers/postController')
const {addForum} = require ('./controllers/forumController')

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
app.get("/auth/logout",logOut)
app.get("/auth/user", (req, res) => {
    res.status(200).json(req.session.user);
})
app.post("/api/post",addPost)
app.get("/api/AllPost",getAllPost)
app.get("/api/user/post",getPastPost)
app.get("/api/getNonUserPost",getNonUserPost)
app.get("/api/username",getUsername)
app.put("/api/post/:id",editPost)
app.delete("/api/post/:id",deletePost)

app.post("/api/forum",addForum)


app.listen(SERVER_PORT,()=> console.log(`Listening on port ${SERVER_PORT}`))