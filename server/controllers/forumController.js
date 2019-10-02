function addForum (req,res){
    console.log('add Forum body ')
    console.log(req.body)
    const {forum,userid} = req.body
    const db =req.app.get("db")
        db.forum.addForum(forum,userid).then(()=>{
            console.log(userid)
            res.status(200).json('good')
        })
       
}
function getforumPost(req,res){
    const db = req.app.get('db')
    db.forum.getForumPost().then(posts =>{
        res.status(200).json(posts)
    })
}
function getPastThreads (req,res){
    const db = req.app.get('db')
    db.forum.getPastThreads(req.session.user.username).then(posts =>{
        res.status(200).json(posts)
    })
}

module.exports={
    addForum,
    getforumPost,
    getPastThreads
}