update posts
set likes = likes + 1
where post_id = $2;
insert into post_likes
(user_id, post_id, liked)
values
($1, $2, true);
