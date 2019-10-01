function addForum (req,res){
    console.log('add Forum body ')
    console.log(req.body)
    const {forum,followers,img} = req.body
    const db =req.app.get("db")
        db.addForum(forum,followers,img)
        // .then(()=>{
        //     req.session.forum ={
        //         forum
        //     }
            res.status(200).json('good')
        // })
}
function getforumPost(req,res){
    const db = req.app.get('db')
    db.getForumPost().then(posts =>{
        res.status(200).json(posts)
    })
}
function getPastThreads (req,res){
    const db = req.app.get('db')
    db.getPastThreads(req.session.user.username).then(posts =>{
        res.status(200).json(posts)
    })
}

module.exports={
    addForum,
    getforumPost,
    getPastThreads
}