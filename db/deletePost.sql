DELETE FROM post_likes WHERE post_id =$1;
DELETE FROM posts WHERE post_id = $1;


-- SELECT p.post_id, p.post_user_id, p.content_of_post,u.username FROM posts p
-- INNER JOIN users u
-- ON u.id = p.post_user_id
-- WHERE u.id = $2;
