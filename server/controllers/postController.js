function addPost(req,res){
    const {content}=req.body
    const db = req.app.get("db")
    db.getIdUsername(req.session.user.username)
        .then(id=>{
            let userID =id[0].id

            db.addPost(userID, content)
                .then(()=>{
                    res.sendStatus(200)
                })
        })
}
function getAllPost(req,res){
    const db = req.app.get('db')
    db.getAllPost().then(posts =>{
        res.status(200).json(posts)
    })
}
function getNonUserPost(req,res){
    const db = req.app.get('db')
    db.getNonUserPost(req.session).then(post=>{
        res.status(200).json(post)
    })
}
function getPastPost(req,res){
    const db = req.app.get('db')
    db.getPastPost(req.session.user.username).then(posts =>{
        res.status(200).json(posts)
    })
}
function deletePost(req,res){
   const {postId} =req.params
   const db = req.app.get('db')
   db.deletePost(postId)
   .then(()=>{
       db.getAllPost(req.session.user.username).then(posts=>{
           res.send(200).json(posts)

       })
   }) 
  
} 
module.exports={
    addPost,
    getAllPost,
    getNonUserPost,
    deletePost,
    getPastPost
}