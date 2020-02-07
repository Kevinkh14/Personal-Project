SELECT comments.comment, users.username, posts.post_id, users.id, comments.post_id, users.avatar_img_url
FROM users
inner join comments 
on users.id = comments.user_id
inner join posts
on posts.post_id = comments.post_id
where posts.post_id = $1