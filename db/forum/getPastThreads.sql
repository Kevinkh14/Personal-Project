SELECT users.username,forum.forum_name
from users
INNER JOIN forum 
ON  users.id = forum.forum_id
WHERE username = $1