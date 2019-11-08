update posts
set likes = likes + 1
where post_id = $2;
insert into post_likes
(user_id, post_id, liked)
values
($1, $2, true);

SELECT users.username,posts.content_of_post,posts.img_url,posts.likes,posts.post_id,users.avatar_img_url,posts.post_forum_id
from users 
INNER JOIN posts
ON users.id = posts.post_user_id
ORDER BY posts.post_id DESC;