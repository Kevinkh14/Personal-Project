SELECT users.username, posts.content_of_post, posts.post_id,posts.img_url
from users
INNER JOIN posts 
ON  users.id = posts.post_user_id
WHERE username = $1
ORDER BY posts.post_id DESC