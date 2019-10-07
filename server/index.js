require('dotenv').config()
const path = require('path')
const express = require("express");
const massive = require('massive')
const session = require ('express-session')
const {registerUser,loginUser,logOut}=require('./controllers/authController')
const {addPost,getAllPost,getNonUserPost,deletePost,getPastPost,editPost,addProfPic,getProfPic,addLike,deleteLike,ifLiked} = require('./controllers/postController')
const {addForum,getforumPost,getPastThreads,postOnForum,getAllThreads} = require ('./controllers/forumController')

const app = express()

app.use( express.static( `${__dirname}/../build` ) );
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
app.put("/api/post/:id",editPost)
app.delete("/api/post/:id",deletePost)

app.post("/api/like/:postid",addLike)
app.put("/api/like/:postid",deleteLike)
app.get("/api/like",ifLiked)

app.post('/api/profile',addProfPic)
app.get('/api/profile',getProfPic)

app.get("/api/pastThreads",getPastThreads)
app.get("/api/allThreads",getAllThreads )
app.post("/api/forum/",addForum)
app.get("/api/forumPost/:forumid",getforumPost)
app.post("/api/forumPost/:forumid",postOnForum)


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.listen(SERVER_PORT,()=> console.log(`Listening on port ${SERVER_PORT}`))