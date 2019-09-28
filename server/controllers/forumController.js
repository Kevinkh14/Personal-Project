function addForum (req,res){
    const {forum,followers,img} =req.body
    const db =req.app.get("db")
    db.getIdUsername(req.session.user.username)
    .then(id=>{
        let userId = id[0].id
        db.addForum(forum,followers,img)
        .then(()=>{
            res.sendStatus(200)
        })
    })
}
module.exports={
    addForum
}