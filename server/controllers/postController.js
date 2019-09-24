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
    db.getAllPost(req.session.user.username).then(posts =>{
        res.status(200).json(posts)
    })
}
function getNonUserPost(req,res){
    const db = req.app.get('db')
    db.getNonUserPost(req.session).then(post=>{
        res.status(200).json(post)
    })
}
module.exports={
    addPost,
    getAllPost,
    getNonUserPost
}