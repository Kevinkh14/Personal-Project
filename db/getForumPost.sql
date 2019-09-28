SELECT user.username,post.content_of_post,post.post_id,post.img_url, post.post_forum_id
from users
inner join posts
ON  users.id = posts.post_user_id
inner join forum
on post_forum_id = forum_id