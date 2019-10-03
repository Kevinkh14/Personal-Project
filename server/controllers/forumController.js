function addForum (req,res){
    console.log('add Forum body ')
    console.log(req.body)
    const {forum} = req.body
    const db =req.app.get("db")
    db.getIdUsername(req.session.user.username)
    .then(id =>{
        let userid = id[0].id
        db.forum.addForum(forum,userid).then(()=>{
            console.log(userid)
            res.status(200).json('good')
        })
    })
       
}
function postOnForum(req,res){
    const {content,url}=req.body
    const db = req.app.get("db")
    db.getIdForum()
        .then(id=>{
            let forumID =id[0].forum_id
                db.forum.postOnForum(forumID, content, url)
                    .then(()=>{
                        res.sendStatus(200)
                })
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
    getPastThreads,
    postOnForum
}