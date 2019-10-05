SELECT users.username,posts.content_of_post,posts.img_url,posts.likes,users.avatar_img_url
from users 
INNER JOIN posts
ON users.id = posts.post_user_id
ORDER BY posts.post_id ASC