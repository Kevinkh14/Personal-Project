SELECT users.username,posts.content_of_post
from users 
INNER JOIN posts
ON users.id = posts.post_user_id