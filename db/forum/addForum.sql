INSERT INTO forum
(forum_name,forum_user_id)
values
($1,$2);
select forum_id from forum 
where forum_name = $1 
