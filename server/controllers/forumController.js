function addForum (req,res){
    const db =req.app.get("db")
    console.log('add Forum body ')
    console.log(req.body)
    const {forum} = req.body
    const userid = req.session.user.id
    db.forum.addForum(forum,userid).then((forum)=>{
        console.log(userid)
        console.log(forum)
        res.status(200).json(forum)
    }) 
}
function postOnForum(req,res){
    const db = req.app.get("db")
    const {content,url,likes}=req.body
    const userid = req.session.user.id
    const forumId = +req.params.forumid
    db.forum.postOnForum(forumId, content, url, userid, likes)
        .then(()=>{
        res.sendStatus(200)
    })
}

function getforumPost(req,res){
    const db = req.app.get('db')
    const forumid = +req.params.forumid
    db.forum.getForumPost(forumid).then(posts =>{
        res.status(200).json(posts)
        console.log(posts)
    })
}
function getPastThreads (req,res){
    const db = req.app.get('db')
    db.forum.getPastThreads(req.session.user.username).then(posts =>{
        res.status(200).json(posts)
    })
}
function getAllThreads (req,res){
    const db = req.app.get ('db')
    db.forum.getAllThreads().then(post=>{
        res.status(200).json(post)
    })
}

module.exports={
    addForum,
    getforumPost,
    getPastThreads,
    postOnForum,
    getAllThreads
}