function addPost(req,res){
    const {content,url}=req.body
    const db = req.app.get("db")
    db.getIdUsername(req.session.user.username)
        .then(id=>{
            let userID =id[0].id
            db.addPost(userID, content,url)
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
   const {id} = req.params
   const db = req.app.get('db')
   db.deletePost(id)
   .then(()=>{
       db.getPastPost(req.session.user.username).then(posts=>{
           res.status(200).json(posts)

       })
   }) 
} 
function editPost(req,res){
  const {id} =req.params;
  console.log(id)
  const{content} = req.body;
  const db = req.app.get("db")  
  db.updatePost(content,id).then(()=>{
      db.getPastPost(req.session.user.username).then(post=>{
          res.status(200).json(post)
      })
  })
}
function getUsername(req,res){
    const db = req.app.get('db')
    db.getUsername().then(username=>{
        console.log(user[0])
        res.status(200).json(username)
    })
}
module.exports={
    addPost,
    getAllPost,
    getNonUserPost,
    deletePost,
    getPastPost,
    getUsername,
    editPost
}