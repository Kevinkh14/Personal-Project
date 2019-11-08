DELETE FROM post_likes
WHERE user_id = $1 AND post_id = $2;

UPDATE posts
SET likes = likes - 1
WHERE post_id = $2;

SELECT users.username,posts.content_of_post,posts.img_url,posts.likes,posts.post_id,users.avatar_img_url,posts.post_forum_id
from users 
INNER JOIN posts
ON users.id = posts.post_user_id
ORDER BY posts.post_id DESC;