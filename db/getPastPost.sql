SELECT users.username, posts.content_of_post, posts.post_id
from users
INNER JOIN posts 
ON  users.id = posts.post_user_id
WHERE username = $1