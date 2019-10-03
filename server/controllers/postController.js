function addPost(req,res){
    const {content,url,likes}=req.body
    const db = req.app.get("db")
    db.getIdUsername(req.session.user.username)
        .then(id=>{
            let userID =id[0].id
                db.addPost(userID, content, url,likes)
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
function addProfPic(req,res){
    const {url}=req.body
    const db = req.app.get("db")
    db.getIdUsername(req.session.user.username)
    .then(id=>{
        let userId =id[0].id
        db.addProfilePic(url,userId)
        .then((res)=>{
            res.sendStatus(200)
        }) 
    })
}
function getProfPic(req,res){
    const db = req.app.get('db')
    db.getProfPic(req.session.user.username).then(posts =>{
        res.status(200).json(posts)
    })
}
function addLike(req,res){
    const {postId} =req.params
    const db =req.app.get('db')
    db.getIdUsername(req.session.user.username)
    .then(id=>{
        let userId =id[0].id
    db.addLike(userId,postId).then(()=>{
        res.sendStatus(200)
    })
})
}
function deleteLike(req,res){
    const {postId}=req.params
    const db =req.app.get('db')
    db.getIdUsername(req.session.user.username)
    .then(id=>{
        let userId =id[0].id
    db.unlike(userId,post_id).then(()=>{
        res.sendStatus(200)
    })
 })
}


module.exports={
    addPost,
    getAllPost,
    getNonUserPost,
    deletePost,
    getPastPost,
    editPost,
    addProfPic,
    getProfPic,
    addLike,
    deleteLike
}