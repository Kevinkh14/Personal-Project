SELECT users.username,posts.content_of_post,posts.img_url,posts.likes,posts.post_id
from users 
INNER JOIN posts
ON users.id = posts.post_user_id
ORDER BY posts.post_id DESC