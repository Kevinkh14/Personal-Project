insert into comments 
(user_id,post_id,comment)
values 
($1,$2,$3);

SELECT comments.comment, users.username, posts.post_id, users.id, comments.post_id
FROM users
inner join comments 
on users.id = comments.user_id
inner join posts
on posts.post_id = comments.post_id

