SELECT users.username,forum.forum_name
from users
INNER JOIN forum 
ON  users.id = forum.forum_user_id
WHERE username = $1