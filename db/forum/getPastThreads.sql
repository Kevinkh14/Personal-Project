SELECT users.username,forum.forum_name,forum.forum_id
from users
INNER JOIN forum 
ON  users.id = forum.forum_user_id
WHERE username = $1
ORDER BY forum_id DESC