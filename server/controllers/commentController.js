
async function getComments (req, res){
    const db = req.app.get('db')
    const post_id = req.params.postid
    const comments = await db.comments.getComments(post_id)
    res.status(200).json(comments)
       
}


async function addComment (req, res){
    const db = req.app.get('db')
    const postId = +req.params.postid
    const userId = req.session.user.id
    const {content} = req.body
    const comments = await db.comments.addComment(userId, postId, content)
    console.log(comments)
    res.status(200).json(comments)
    
}

module.exports ={
    addComment,
    getComments
}