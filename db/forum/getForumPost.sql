SELECT users.username, posts.content_of_post, posts.img_url, posts.post_forum_id,forum.forum_name,posts.likes,posts.post_id,users.avatar_img_url
from users
inner join posts
ON  users.id = posts.post_user_id
inner join forum
on posts.post_forum_id = forum.forum_id
where forum.forum_id = $1